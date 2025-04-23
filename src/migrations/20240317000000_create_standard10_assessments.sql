-- Create Standard 10 assessments table
CREATE TABLE standard10_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    graded_at TIMESTAMPTZ,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'graded')),
    is_draft BOOLEAN DEFAULT true,
    
    -- Scenario 1: Young Professional Analysis
    scenario1_market_analysis JSONB,
    scenario1_financial_calculations JSONB,
    scenario1_decision_analysis JSONB,
    scenario1_recommendation TEXT,
    
    -- Scenario 2: Growing Family Analysis
    scenario2_market_analysis JSONB,
    scenario2_financial_calculations JSONB,
    scenario2_decision_analysis JSONB,
    scenario2_recommendation TEXT,
    
    -- Grading and Feedback
    calculations_score INTEGER CHECK (calculations_score BETWEEN 0 AND 40),
    analysis_score INTEGER CHECK (analysis_score BETWEEN 0 AND 35),
    recommendations_score INTEGER CHECK (recommendations_score BETWEEN 0 AND 25),
    instructor_feedback TEXT,
    
    -- Progress Tracking
    market_analysis_complete BOOLEAN DEFAULT false,
    financial_analysis_complete BOOLEAN DEFAULT false,
    decision_analysis_complete BOOLEAN DEFAULT false
);

-- Create trigger for updated_at
CREATE TRIGGER update_standard10_assessments_updated_at
    BEFORE UPDATE ON standard10_assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security Policies
ALTER TABLE standard10_assessments ENABLE ROW LEVEL SECURITY;

-- Students can view and edit their own assessments
CREATE POLICY "Students can view own assessments"
    ON standard10_assessments
    FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own assessments"
    ON standard10_assessments
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own draft assessments"
    ON standard10_assessments
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = student_id AND is_draft = true)
    WITH CHECK (auth.uid() = student_id AND is_draft = true);

-- Instructors can view and grade assigned assessments
CREATE POLICY "Instructors can view assigned assessments"
    ON standard10_assessments
    FOR SELECT
    TO authenticated
    USING (auth.uid() = instructor_id);

CREATE POLICY "Instructors can update grades and feedback"
    ON standard10_assessments
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = instructor_id)
    WITH CHECK (auth.uid() = instructor_id);

-- Create index for performance
CREATE INDEX idx_standard10_assessments_student_id ON standard10_assessments(student_id);
CREATE INDEX idx_standard10_assessments_instructor_id ON standard10_assessments(instructor_id);
CREATE INDEX idx_standard10_assessments_status ON standard10_assessments(status); 