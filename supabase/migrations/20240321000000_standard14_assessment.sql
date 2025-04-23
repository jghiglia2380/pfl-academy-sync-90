-- Create enum types
CREATE TYPE scaffolding_level AS ENUM ('clean', 'guided', 'complete');
CREATE TYPE hint_visibility AS ENUM ('hidden', 'visible', 'conditional');
CREATE TYPE assessment_status AS ENUM ('draft', 'submitted', 'graded', 'returned');

-- Create tables
CREATE TABLE standard14_assessments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES auth.users(id) NOT NULL,
    teacher_id UUID REFERENCES auth.users(id),
    status assessment_status DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE,
    graded_at TIMESTAMP WITH TIME ZONE,
    score INTEGER,
    feedback TEXT,
    personal_reflection JSONB,
    organization_comparison JSONB,
    giving_plan JSONB,
    impact_analysis JSONB
);

CREATE TABLE standard14_teacher_config (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    teacher_id UUID REFERENCES auth.users(id) NOT NULL,
    class_id UUID NOT NULL,
    student_id UUID REFERENCES auth.users(id),
    scaffolding_level scaffolding_level DEFAULT 'guided',
    hints_enabled BOOLEAN DEFAULT true,
    sample_answers_enabled BOOLEAN DEFAULT false,
    high_contrast_enabled BOOLEAN DEFAULT false,
    text_size_multiplier DECIMAL DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(teacher_id, class_id, student_id)
);

CREATE TABLE standard14_hints (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    teacher_id UUID REFERENCES auth.users(id) NOT NULL,
    section_id TEXT NOT NULL,
    hint_text TEXT NOT NULL,
    visibility hint_visibility DEFAULT 'conditional',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE standard14_sample_answers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    teacher_id UUID REFERENCES auth.users(id) NOT NULL,
    section_id TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    visibility hint_visibility DEFAULT 'hidden',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE standard14_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    assessment_id UUID REFERENCES standard14_assessments(id) NOT NULL,
    section_id TEXT NOT NULL,
    status TEXT NOT NULL,
    time_spent INTEGER DEFAULT 0,
    last_interaction TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(assessment_id, section_id)
);

CREATE TABLE standard14_versions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    assessment_id UUID REFERENCES standard14_assessments(id) NOT NULL,
    version_number INTEGER NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_standard14_assessments_student ON standard14_assessments(student_id);
CREATE INDEX idx_standard14_assessments_teacher ON standard14_assessments(teacher_id);
CREATE INDEX idx_standard14_teacher_config_teacher ON standard14_teacher_config(teacher_id);
CREATE INDEX idx_standard14_teacher_config_student ON standard14_teacher_config(student_id);
CREATE INDEX idx_standard14_progress_assessment ON standard14_progress(assessment_id);
CREATE INDEX idx_standard14_versions_assessment ON standard14_versions(assessment_id);

-- Create RLS policies
ALTER TABLE standard14_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard14_teacher_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard14_hints ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard14_sample_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard14_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard14_versions ENABLE ROW LEVEL SECURITY;

-- Student policies
CREATE POLICY "Students can view their own assessments"
    ON standard14_assessments FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Students can update their own assessments"
    ON standard14_assessments FOR UPDATE
    USING (auth.uid() = student_id);

CREATE POLICY "Students can view their own progress"
    ON standard14_progress FOR SELECT
    USING (auth.uid() = (SELECT student_id FROM standard14_assessments WHERE id = assessment_id));

CREATE POLICY "Students can update their own progress"
    ON standard14_progress FOR UPDATE
    USING (auth.uid() = (SELECT student_id FROM standard14_assessments WHERE id = assessment_id));

-- Teacher policies
CREATE POLICY "Teachers can view all assessments"
    ON standard14_assessments FOR SELECT
    USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can update all assessments"
    ON standard14_assessments FOR UPDATE
    USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can manage their own config"
    ON standard14_teacher_config FOR ALL
    USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can manage their own hints"
    ON standard14_hints FOR ALL
    USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can manage their own sample answers"
    ON standard14_sample_answers FOR ALL
    USING (auth.uid() = teacher_id);

-- Create functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_standard14_assessments_updated_at
    BEFORE UPDATE ON standard14_assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_standard14_teacher_config_updated_at
    BEFORE UPDATE ON standard14_teacher_config
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_standard14_hints_updated_at
    BEFORE UPDATE ON standard14_hints
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_standard14_sample_answers_updated_at
    BEFORE UPDATE ON standard14_sample_answers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_standard14_progress_updated_at
    BEFORE UPDATE ON standard14_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 