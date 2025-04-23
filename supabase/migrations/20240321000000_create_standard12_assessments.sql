-- Create Standard 12 assessments table
CREATE TABLE standard12_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('draft', 'submitted', 'graded')),
    scenario1 JSONB NOT NULL,
    scenario2 JSONB NOT NULL,
    scenario3 JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE,
    feedback TEXT[] DEFAULT ARRAY[]::TEXT[],
    grade NUMERIC CHECK (grade >= 0 AND grade <= 100)
);

-- Create updated_at trigger
CREATE TRIGGER set_standard12_assessments_updated_at
    BEFORE UPDATE ON standard12_assessments
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

-- Enable Row Level Security
ALTER TABLE standard12_assessments ENABLE ROW LEVEL SECURITY;

-- Create policies for students
CREATE POLICY "Students can view their own assessments"
    ON standard12_assessments
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Students can create their own assessments"
    ON standard12_assessments
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can update their own draft assessments"
    ON standard12_assessments
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id AND status = 'draft')
    WITH CHECK (auth.uid() = user_id AND status = 'draft');

-- Create policies for instructors
CREATE POLICY "Instructors can view all assessments"
    ON standard12_assessments
    FOR SELECT
    TO instructor
    USING (true);

CREATE POLICY "Instructors can update submitted assessments"
    ON standard12_assessments
    FOR UPDATE
    TO instructor
    USING (status = 'submitted')
    WITH CHECK (
        status = 'graded' AND
        OLD.status = 'submitted' AND
        OLD.scenario1 = NEW.scenario1 AND
        OLD.scenario2 = NEW.scenario2 AND
        OLD.scenario3 = NEW.scenario3
    );

-- Create indexes for better query performance
CREATE INDEX standard12_assessments_user_id_idx ON standard12_assessments(user_id);
CREATE INDEX standard12_assessments_status_idx ON standard12_assessments(status);
CREATE INDEX standard12_assessments_submitted_at_idx ON standard12_assessments(submitted_at);

-- Comments for documentation
COMMENT ON TABLE standard12_assessments IS 'Stores Standard 12 capstone assessments for gambling risk analysis';
COMMENT ON COLUMN standard12_assessments.scenario1 IS 'Probability analysis for basic games (dice, coin flip, number guessing)';
COMMENT ON COLUMN standard12_assessments.scenario2 IS 'State lottery analysis with prize structure and opportunity cost';
COMMENT ON COLUMN standard12_assessments.scenario3 IS 'Personal financial planning and responsible gambling strategy'; 