-- Create enum types
CREATE TYPE scaffolding_level AS ENUM ('clean', 'guided', 'complete');
CREATE TYPE hint_visibility AS ENUM ('hidden', 'visible');
CREATE TYPE assessment_status AS ENUM ('draft', 'submitted', 'graded', 'returned');

-- Create tables
CREATE TABLE standard10_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content JSONB NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE,
    previous_submission_id UUID REFERENCES standard10_submissions(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    teacher_config JSONB NOT NULL DEFAULT '{"scaffoldingLevel": "clean", "hintsEnabled": false, "sampleAnswersEnabled": false, "accessibilitySettings": {"highContrast": false, "fontSize": 16}}',
    progress JSONB NOT NULL DEFAULT '{"evaluationCriteria": {"completed": false, "timeSpent": 0, "lastUpdated": null}, "assessmentMethods": {"completed": false, "timeSpent": 0, "lastUpdated": null}, "feedbackMechanisms": {"completed": false, "timeSpent": 0, "lastUpdated": null}}',
    version INTEGER DEFAULT 1,
    status assessment_status DEFAULT 'draft'
);

CREATE TABLE standard10_drafts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content JSONB NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    teacher_config JSONB NOT NULL DEFAULT '{"scaffoldingLevel": "clean", "hintsEnabled": false, "sampleAnswersEnabled": false, "accessibilitySettings": {"highContrast": false, "fontSize": 16}}',
    progress JSONB NOT NULL DEFAULT '{"evaluationCriteria": {"completed": false, "timeSpent": 0, "lastUpdated": null}, "assessmentMethods": {"completed": false, "timeSpent": 0, "lastUpdated": null}, "feedbackMechanisms": {"completed": false, "timeSpent": 0, "lastUpdated": null}}',
    auto_saved BOOLEAN DEFAULT false,
    last_auto_save TIMESTAMP WITH TIME ZONE
);

CREATE TABLE standard10_grades (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    submission_id UUID REFERENCES standard10_submissions(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    rubric_scores JSONB NOT NULL,
    graded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    teacher_config JSONB NOT NULL DEFAULT '{"scaffoldingLevel": "clean", "hintsEnabled": false, "sampleAnswersEnabled": false, "accessibilitySettings": {"highContrast": false, "fontSize": 16}}'
);

CREATE TABLE standard10_feedback (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    submission_id UUID REFERENCES standard10_submissions(id) ON DELETE CASCADE,
    instructor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    teacher_config JSONB NOT NULL DEFAULT '{"scaffoldingLevel": "clean", "hintsEnabled": false, "sampleAnswersEnabled": false, "accessibilitySettings": {"highContrast": false, "fontSize": 16}}'
);

CREATE TABLE standard10_hints (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    section TEXT NOT NULL,
    content TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    visibility hint_visibility DEFAULT 'hidden',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard10_sample_answers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    section TEXT NOT NULL,
    content JSONB NOT NULL,
    visibility hint_visibility DEFAULT 'hidden',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard10_versions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    submission_id UUID REFERENCES standard10_submissions(id) ON DELETE CASCADE,
    content JSONB NOT NULL,
    version_number INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_standard10_submissions_student_id ON standard10_submissions(student_id);
CREATE INDEX idx_standard10_submissions_status ON standard10_submissions(status);
CREATE INDEX idx_standard10_drafts_student_id ON standard10_drafts(student_id);
CREATE INDEX idx_standard10_grades_submission_id ON standard10_grades(submission_id);
CREATE INDEX idx_standard10_feedback_submission_id ON standard10_feedback(submission_id);
CREATE INDEX idx_standard10_versions_submission_id ON standard10_versions(submission_id);

-- Enable Row Level Security
ALTER TABLE standard10_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard10_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard10_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard10_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard10_hints ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard10_sample_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard10_versions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Students can view their own submissions"
    ON standard10_submissions FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Students can create submissions"
    ON standard10_submissions FOR INSERT
    WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own submissions"
    ON standard10_submissions FOR UPDATE
    USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view all submissions"
    ON standard10_submissions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND role = 'teacher'
    ));

CREATE POLICY "Students can view their own drafts"
    ON standard10_drafts FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Students can create drafts"
    ON standard10_drafts FOR INSERT
    WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own drafts"
    ON standard10_drafts FOR UPDATE
    USING (auth.uid() = student_id);

CREATE POLICY "Students can view their own grades"
    ON standard10_grades FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM standard10_submissions
        WHERE id = submission_id AND student_id = auth.uid()
    ));

CREATE POLICY "Teachers can manage grades"
    ON standard10_grades FOR ALL
    USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND role = 'teacher'
    ));

CREATE POLICY "Students can view their own feedback"
    ON standard10_feedback FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM standard10_submissions
        WHERE id = submission_id AND student_id = auth.uid()
    ));

CREATE POLICY "Teachers can manage feedback"
    ON standard10_feedback FOR ALL
    USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND role = 'teacher'
    ));

CREATE POLICY "Students can view visible hints"
    ON standard10_hints FOR SELECT
    USING (visibility = 'visible');

CREATE POLICY "Teachers can manage hints"
    ON standard10_hints FOR ALL
    USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND role = 'teacher'
    ));

CREATE POLICY "Students can view visible sample answers"
    ON standard10_sample_answers FOR SELECT
    USING (visibility = 'visible');

CREATE POLICY "Teachers can manage sample answers"
    ON standard10_sample_answers FOR ALL
    USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND role = 'teacher'
    ));

CREATE POLICY "Students can view their own versions"
    ON standard10_versions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM standard10_submissions
        WHERE id = submission_id AND student_id = auth.uid()
    ));

CREATE POLICY "Teachers can view all versions"
    ON standard10_versions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid() AND role = 'teacher'
    ));

-- Create function to update feedback count
CREATE OR REPLACE FUNCTION update_feedback_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE standard10_submissions
    SET feedback_count = (
        SELECT COUNT(*)
        FROM standard10_feedback
        WHERE submission_id = NEW.submission_id
    )
    WHERE id = NEW.submission_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for feedback count
CREATE TRIGGER update_feedback_count_trigger
    AFTER INSERT OR DELETE ON standard10_feedback
    FOR EACH ROW
    EXECUTE FUNCTION update_feedback_count(); 