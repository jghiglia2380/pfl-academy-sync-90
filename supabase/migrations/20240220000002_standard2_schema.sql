-- Create enum types
CREATE TYPE scaffolding_level AS ENUM ('clean', 'guided', 'complete');
CREATE TYPE hint_visibility AS ENUM ('hidden', 'available', 'shown');
CREATE TYPE assessment_status AS ENUM ('not_started', 'in_progress', 'submitted', 'graded');

-- Create tables
CREATE TABLE standard2_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES auth.users(id),
    content JSONB NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    previous_submission_id UUID REFERENCES standard2_submissions(id),
    teacher_config JSONB,
    progress JSONB NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    status assessment_status NOT NULL DEFAULT 'not_started',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard2_drafts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES auth.users(id),
    content JSONB NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress JSONB NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard2_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES standard2_submissions(id),
    instructor_id UUID NOT NULL REFERENCES auth.users(id),
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard2_grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES standard2_submissions(id),
    instructor_id UUID NOT NULL REFERENCES auth.users(id),
    score INTEGER NOT NULL,
    rubric_scores JSONB NOT NULL,
    graded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard2_hints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section TEXT NOT NULL,
    content TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    visibility hint_visibility NOT NULL DEFAULT 'hidden',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard2_sample_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section TEXT NOT NULL,
    content JSONB NOT NULL,
    is_visible BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard2_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES standard2_submissions(id),
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    version_number INTEGER NOT NULL
);

-- Create indexes
CREATE INDEX standard2_submissions_student_id_idx ON standard2_submissions(student_id);
CREATE INDEX standard2_submissions_status_idx ON standard2_submissions(status);
CREATE INDEX standard2_drafts_student_id_idx ON standard2_drafts(student_id);
CREATE INDEX standard2_feedback_submission_id_idx ON standard2_feedback(submission_id);
CREATE INDEX standard2_grades_submission_id_idx ON standard2_grades(submission_id);
CREATE INDEX standard2_hints_section_idx ON standard2_hints(section);
CREATE INDEX standard2_sample_answers_section_idx ON standard2_sample_answers(section);
CREATE INDEX standard2_versions_submission_id_idx ON standard2_versions(submission_id);

-- Create RLS policies
ALTER TABLE standard2_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard2_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard2_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard2_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard2_hints ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard2_sample_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard2_versions ENABLE ROW LEVEL SECURITY;

-- Student policies
CREATE POLICY "Students can view their own submissions"
    ON standard2_submissions FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Students can create submissions"
    ON standard2_submissions FOR INSERT
    WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own submissions"
    ON standard2_submissions FOR UPDATE
    USING (auth.uid() = student_id);

CREATE POLICY "Students can view their own drafts"
    ON standard2_drafts FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Students can create drafts"
    ON standard2_drafts FOR INSERT
    WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own drafts"
    ON standard2_drafts FOR UPDATE
    USING (auth.uid() = student_id);

CREATE POLICY "Students can view their own feedback"
    ON standard2_feedback FOR SELECT
    USING (auth.uid() = (SELECT student_id FROM standard2_submissions WHERE id = submission_id));

CREATE POLICY "Students can view their own grades"
    ON standard2_grades FOR SELECT
    USING (auth.uid() = (SELECT student_id FROM standard2_submissions WHERE id = submission_id));

CREATE POLICY "Students can view hints"
    ON standard2_hints FOR SELECT
    USING (true);

CREATE POLICY "Students can view sample answers"
    ON standard2_sample_answers FOR SELECT
    USING (is_visible = true);

CREATE POLICY "Students can view their own versions"
    ON standard2_versions FOR SELECT
    USING (auth.uid() = (SELECT student_id FROM standard2_submissions WHERE id = submission_id));

-- Teacher policies
CREATE POLICY "Teachers can view all submissions"
    ON standard2_submissions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'teacher'
    ));

CREATE POLICY "Teachers can update submissions"
    ON standard2_submissions FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'teacher'
    ));

CREATE POLICY "Teachers can view all drafts"
    ON standard2_drafts FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'teacher'
    ));

CREATE POLICY "Teachers can manage feedback"
    ON standard2_feedback FOR ALL
    USING (EXISTS (
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'teacher'
    ));

CREATE POLICY "Teachers can manage grades"
    ON standard2_grades FOR ALL
    USING (EXISTS (
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'teacher'
    ));

CREATE POLICY "Teachers can manage hints"
    ON standard2_hints FOR ALL
    USING (EXISTS (
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'teacher'
    ));

CREATE POLICY "Teachers can manage sample answers"
    ON standard2_sample_answers FOR ALL
    USING (EXISTS (
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'teacher'
    ));

CREATE POLICY "Teachers can view all versions"
    ON standard2_versions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'teacher'
    ));

-- Create function to update feedback count
CREATE OR REPLACE FUNCTION update_standard2_feedback_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE standard2_submissions
        SET feedback_count = COALESCE(feedback_count, 0) + 1
        WHERE id = NEW.submission_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE standard2_submissions
        SET feedback_count = GREATEST(COALESCE(feedback_count, 0) - 1, 0)
        WHERE id = OLD.submission_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for feedback count
CREATE TRIGGER standard2_feedback_count_trigger
AFTER INSERT OR DELETE ON standard2_feedback
FOR EACH ROW EXECUTE FUNCTION update_standard2_feedback_count(); 