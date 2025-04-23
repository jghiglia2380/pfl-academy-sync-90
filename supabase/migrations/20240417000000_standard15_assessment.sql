-- Create enum types
CREATE TYPE assessment_status AS ENUM ('draft', 'submitted', 'graded');
CREATE TYPE scaffolding_level AS ENUM ('clean', 'guided', 'complete');

-- Create the main assessment table
CREATE TABLE standard15_assessments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES auth.users(id) NOT NULL,
    status assessment_status DEFAULT 'draft',
    financial_analysis JSONB DEFAULT '[]'::JSONB,
    brand_strategy JSONB DEFAULT '[]'::JSONB,
    career_progression JSONB DEFAULT '[]'::JSONB,
    feedback TEXT,
    grade NUMERIC(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    graded_at TIMESTAMPTZ,
    graded_by UUID REFERENCES auth.users(id),
    version INTEGER DEFAULT 1
);

-- Create the scaffolding configuration table
CREATE TABLE standard15_scaffolding (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    teacher_id UUID REFERENCES auth.users(id) NOT NULL,
    class_id UUID NOT NULL,
    student_id UUID REFERENCES auth.users(id),
    scaffolding_level scaffolding_level DEFAULT 'guided',
    show_hints BOOLEAN DEFAULT true,
    show_examples BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (teacher_id, class_id, student_id)
);

-- Create the hints table
CREATE TABLE standard15_hints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    teacher_id UUID REFERENCES auth.users(id) NOT NULL,
    section VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the sample answers table
CREATE TABLE standard15_sample_answers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    teacher_id UUID REFERENCES auth.users(id) NOT NULL,
    section VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_standard15_assessments_student ON standard15_assessments(student_id);
CREATE INDEX idx_standard15_scaffolding_teacher ON standard15_scaffolding(teacher_id);
CREATE INDEX idx_standard15_scaffolding_class ON standard15_scaffolding(class_id);
CREATE INDEX idx_standard15_hints_teacher ON standard15_hints(teacher_id);
CREATE INDEX idx_standard15_sample_answers_teacher ON standard15_sample_answers(teacher_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_standard15_assessments_updated_at
    BEFORE UPDATE ON standard15_assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_standard15_scaffolding_updated_at
    BEFORE UPDATE ON standard15_scaffolding
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_standard15_hints_updated_at
    BEFORE UPDATE ON standard15_hints
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_standard15_sample_answers_updated_at
    BEFORE UPDATE ON standard15_sample_answers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies

-- Enable RLS
ALTER TABLE standard15_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard15_scaffolding ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard15_hints ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard15_sample_answers ENABLE ROW LEVEL SECURITY;

-- Assessment policies
CREATE POLICY "Students can view their own assessments"
    ON standard15_assessments FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);

CREATE POLICY "Students can insert their own assessments"
    ON standard15_assessments FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own draft assessments"
    ON standard15_assessments FOR UPDATE
    TO authenticated
    USING (auth.uid() = student_id AND status = 'draft')
    WITH CHECK (auth.uid() = student_id AND status = 'draft');

CREATE POLICY "Teachers can view their students' assessments"
    ON standard15_assessments FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM standard15_scaffolding
        WHERE teacher_id = auth.uid()
        AND (student_id = standard15_assessments.student_id OR student_id IS NULL)
    ));

CREATE POLICY "Teachers can update grades and feedback"
    ON standard15_assessments FOR UPDATE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM standard15_scaffolding
        WHERE teacher_id = auth.uid()
        AND (student_id = standard15_assessments.student_id OR student_id IS NULL)
    ))
    WITH CHECK (EXISTS (
        SELECT 1 FROM standard15_scaffolding
        WHERE teacher_id = auth.uid()
        AND (student_id = standard15_assessments.student_id OR student_id IS NULL)
    ));

-- Scaffolding policies
CREATE POLICY "Teachers can manage scaffolding"
    ON standard15_scaffolding FOR ALL
    TO authenticated
    USING (teacher_id = auth.uid())
    WITH CHECK (teacher_id = auth.uid());

CREATE POLICY "Students can view their scaffolding"
    ON standard15_scaffolding FOR SELECT
    TO authenticated
    USING (student_id = auth.uid() OR student_id IS NULL);

-- Hints policies
CREATE POLICY "Teachers can manage hints"
    ON standard15_hints FOR ALL
    TO authenticated
    USING (teacher_id = auth.uid())
    WITH CHECK (teacher_id = auth.uid());

CREATE POLICY "Everyone can view hints"
    ON standard15_hints FOR SELECT
    TO authenticated
    USING (true);

-- Sample answers policies
CREATE POLICY "Teachers can manage sample answers"
    ON standard15_sample_answers FOR ALL
    TO authenticated
    USING (teacher_id = auth.uid())
    WITH CHECK (teacher_id = auth.uid());

CREATE POLICY "Everyone can view sample answers"
    ON standard15_sample_answers FOR SELECT
    TO authenticated
    USING (true); 