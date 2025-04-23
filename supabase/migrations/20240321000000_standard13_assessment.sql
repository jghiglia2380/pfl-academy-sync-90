-- Create enum types
CREATE TYPE assessment_status AS ENUM ('draft', 'submitted', 'graded');
CREATE TYPE scaffolding_level AS ENUM ('clean', 'guided', 'complete');

-- Create the main assessment table
CREATE TABLE standard13_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    status assessment_status DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    graded_at TIMESTAMPTZ,
    graded_by UUID REFERENCES auth.users(id),
    score NUMERIC(5,2),
    feedback TEXT[],
    
    -- Scenario data stored as JSONB for flexibility
    scenario1 JSONB NOT NULL DEFAULT '{}'::JSONB,
    scenario2 JSONB NOT NULL DEFAULT '{}'::JSONB,
    scenario3 JSONB NOT NULL DEFAULT '{}'::JSONB,

    CONSTRAINT valid_score CHECK (score IS NULL OR (score >= 0 AND score <= 100))
);

-- Create progress tracking table
CREATE TABLE standard13_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID REFERENCES standard13_assessments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    completed_sections TEXT[] DEFAULT ARRAY[]::TEXT[],
    current_section TEXT,
    saved_responses JSONB DEFAULT '{}'::JSONB,
    last_saved TIMESTAMPTZ DEFAULT NOW(),
    time_spent INTEGER DEFAULT 0,
    
    CONSTRAINT unique_assessment_progress UNIQUE (assessment_id, user_id)
);

-- Create teacher support configuration table
CREATE TABLE teacher_support_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES auth.users(id) NOT NULL,
    standard_id TEXT NOT NULL,
    class_id UUID REFERENCES classes(id),
    student_id UUID REFERENCES auth.users(id),
    display_mode scaffolding_level DEFAULT 'clean',
    show_hints BOOLEAN DEFAULT false,
    show_sample_answers BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT valid_standard_id CHECK (standard_id ~ '^standard\d+$'),
    CONSTRAINT unique_teacher_config UNIQUE (teacher_id, standard_id, COALESCE(class_id, '00000000-0000-0000-0000-000000000000'), COALESCE(student_id, '00000000-0000-0000-0000-000000000000'))
);

-- Create indexes for performance
CREATE INDEX idx_standard13_assessments_user ON standard13_assessments(user_id);
CREATE INDEX idx_standard13_assessments_status ON standard13_assessments(status);
CREATE INDEX idx_standard13_progress_user ON standard13_progress(user_id);
CREATE INDEX idx_teacher_support_config_teacher ON teacher_support_config(teacher_id);
CREATE INDEX idx_teacher_support_config_class ON teacher_support_config(class_id) WHERE class_id IS NOT NULL;
CREATE INDEX idx_teacher_support_config_student ON teacher_support_config(student_id) WHERE student_id IS NOT NULL;

-- Add RLS policies
ALTER TABLE standard13_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard13_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_support_config ENABLE ROW LEVEL SECURITY;

-- Assessment policies
CREATE POLICY "Users can view their own assessments"
    ON standard13_assessments
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assessments"
    ON standard13_assessments
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own draft assessments"
    ON standard13_assessments
    FOR UPDATE
    USING (auth.uid() = user_id AND status = 'draft')
    WITH CHECK (auth.uid() = user_id AND status = 'draft');

CREATE POLICY "Teachers can view and grade assessments"
    ON standard13_assessments
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_id = auth.uid()
            AND role = 'teacher'
        )
    );

-- Progress policies
CREATE POLICY "Users can manage their own progress"
    ON standard13_progress
    FOR ALL
    USING (auth.uid() = user_id);

-- Teacher support config policies
CREATE POLICY "Teachers can manage their own configurations"
    ON teacher_support_config
    FOR ALL
    USING (
        auth.uid() = teacher_id
        AND EXISTS (
            SELECT 1 FROM user_roles
            WHERE user_id = auth.uid()
            AND role = 'teacher'
        )
    );

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_standard13_assessments_updated_at
    BEFORE UPDATE ON standard13_assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teacher_support_config_updated_at
    BEFORE UPDATE ON teacher_support_config
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 