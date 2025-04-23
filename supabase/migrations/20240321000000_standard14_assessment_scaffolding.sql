-- Create enum types for scaffolding levels and hint types
CREATE TYPE scaffolding_level AS ENUM ('clean', 'guided', 'complete');
CREATE TYPE hint_visibility AS ENUM ('hidden', 'available', 'shown');

-- Create table for teacher scaffolding configuration
CREATE TABLE teacher_scaffolding_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES auth.users(id),
    class_id UUID NOT NULL,
    standard_id INTEGER NOT NULL CHECK (standard_id = 14),
    student_id UUID REFERENCES auth.users(id),
    scaffolding_level scaffolding_level NOT NULL DEFAULT 'guided',
    show_hints BOOLEAN NOT NULL DEFAULT true,
    show_sample_answers BOOLEAN NOT NULL DEFAULT false,
    high_contrast_mode BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (teacher_id, class_id, standard_id, student_id)
);

-- Create table for custom hints
CREATE TABLE assessment_hints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES auth.users(id),
    standard_id INTEGER NOT NULL CHECK (standard_id = 14),
    section_id TEXT NOT NULL,
    hint_text TEXT NOT NULL,
    visibility hint_visibility NOT NULL DEFAULT 'available',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create table for sample answers
CREATE TABLE assessment_sample_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES auth.users(id),
    standard_id INTEGER NOT NULL CHECK (standard_id = 14),
    section_id TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    visibility hint_visibility NOT NULL DEFAULT 'hidden',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create table for student progress tracking
CREATE TABLE student_assessment_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES auth.users(id),
    assessment_id UUID NOT NULL,
    standard_id INTEGER NOT NULL CHECK (standard_id = 14),
    section_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'not_started',
    time_spent INTEGER DEFAULT 0,
    last_interaction TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (student_id, assessment_id, section_id)
);

-- Create table for assessment version history
CREATE TABLE assessment_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID NOT NULL,
    student_id UUID NOT NULL REFERENCES auth.users(id),
    version_number INTEGER NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (assessment_id, student_id, version_number)
);

-- Create table for auto-save status
CREATE TABLE assessment_autosave (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES auth.users(id),
    assessment_id UUID NOT NULL,
    section_id TEXT NOT NULL,
    content JSONB NOT NULL,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (student_id, assessment_id, section_id)
);

-- Add RLS policies
ALTER TABLE teacher_scaffolding_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY teacher_config_access ON teacher_scaffolding_config
    USING (teacher_id = auth.uid() OR student_id = auth.uid());

ALTER TABLE assessment_hints ENABLE ROW LEVEL SECURITY;
CREATE POLICY hints_access ON assessment_hints
    USING (teacher_id = auth.uid() OR 
           EXISTS (
               SELECT 1 FROM teacher_scaffolding_config 
               WHERE student_id = auth.uid() 
               AND show_hints = true
           ));

ALTER TABLE assessment_sample_answers ENABLE ROW LEVEL SECURITY;
CREATE POLICY sample_answers_access ON assessment_sample_answers
    USING (teacher_id = auth.uid() OR 
           EXISTS (
               SELECT 1 FROM teacher_scaffolding_config 
               WHERE student_id = auth.uid() 
               AND show_sample_answers = true
           ));

ALTER TABLE student_assessment_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY progress_access ON student_assessment_progress
    USING (student_id = auth.uid() OR 
           EXISTS (
               SELECT 1 FROM teacher_scaffolding_config 
               WHERE teacher_id = auth.uid()
           ));

ALTER TABLE assessment_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY versions_access ON assessment_versions
    USING (student_id = auth.uid() OR 
           EXISTS (
               SELECT 1 FROM teacher_scaffolding_config 
               WHERE teacher_id = auth.uid()
           ));

ALTER TABLE assessment_autosave ENABLE ROW LEVEL SECURITY;
CREATE POLICY autosave_access ON assessment_autosave
    USING (student_id = auth.uid());

-- Create functions for auto-updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_teacher_scaffolding_config_updated_at
    BEFORE UPDATE ON teacher_scaffolding_config
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessment_hints_updated_at
    BEFORE UPDATE ON assessment_hints
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessment_sample_answers_updated_at
    BEFORE UPDATE ON assessment_sample_answers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_assessment_progress_updated_at
    BEFORE UPDATE ON student_assessment_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 