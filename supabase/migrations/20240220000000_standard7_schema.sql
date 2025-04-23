-- Create enum types
CREATE TYPE scaffolding_level AS ENUM ('clean', 'guided', 'complete');
CREATE TYPE hint_visibility AS ENUM ('hidden', 'visible');
CREATE TYPE assessment_status AS ENUM ('draft', 'submitted', 'graded', 'returned');

-- Create Standard 7 submissions table
CREATE TABLE standard7_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES auth.users(id),
    content JSONB NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE NOT NULL,
    previous_submission_id UUID REFERENCES standard7_submissions(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    teacher_config JSONB NOT NULL DEFAULT '{
        "scaffoldingLevel": "clean",
        "hintsEnabled": true,
        "sampleAnswersEnabled": true,
        "accessibilitySettings": {
            "highContrast": false,
            "fontSize": 16
        }
    }',
    progress JSONB NOT NULL DEFAULT '{
        "creditAnalysis": {
            "completed": false,
            "timeSpent": 0,
            "lastUpdated": null
        },
        "borrowingStrategy": {
            "completed": false,
            "timeSpent": 0,
            "lastUpdated": null
        },
        "creditScore": {
            "completed": false,
            "timeSpent": 0,
            "lastUpdated": null
        }
    }',
    version INTEGER NOT NULL DEFAULT 1,
    status assessment_status NOT NULL DEFAULT 'draft'
);

-- Create Standard 7 drafts table
CREATE TABLE standard7_drafts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES auth.users(id),
    content JSONB NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    teacher_config JSONB NOT NULL DEFAULT '{
        "scaffoldingLevel": "clean",
        "hintsEnabled": true,
        "sampleAnswersEnabled": true,
        "accessibilitySettings": {
            "highContrast": false,
            "fontSize": 16
        }
    }',
    progress JSONB NOT NULL DEFAULT '{
        "creditAnalysis": {
            "completed": false,
            "timeSpent": 0,
            "lastUpdated": null
        },
        "borrowingStrategy": {
            "completed": false,
            "timeSpent": 0,
            "lastUpdated": null
        },
        "creditScore": {
            "completed": false,
            "timeSpent": 0,
            "lastUpdated": null
        }
    }',
    auto_saved BOOLEAN NOT NULL DEFAULT false,
    last_auto_save TIMESTAMP WITH TIME ZONE
);

-- Create Standard 7 grades table
CREATE TABLE standard7_grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES standard7_submissions(id),
    instructor_id UUID NOT NULL REFERENCES auth.users(id),
    score NUMERIC(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
    rubric_scores JSONB NOT NULL,
    graded_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    teacher_config JSONB NOT NULL DEFAULT '{
        "scaffoldingLevel": "clean",
        "hintsEnabled": true,
        "sampleAnswersEnabled": true,
        "accessibilitySettings": {
            "highContrast": false,
            "fontSize": 16
        }
    }'
);

-- Create Standard 7 feedback table
CREATE TABLE standard7_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES standard7_submissions(id),
    instructor_id UUID NOT NULL REFERENCES auth.users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    teacher_config JSONB NOT NULL DEFAULT '{
        "scaffoldingLevel": "clean",
        "hintsEnabled": true,
        "sampleAnswersEnabled": true,
        "accessibilitySettings": {
            "highContrast": false,
            "fontSize": 16
        }
    }'
);

-- Create Standard 7 hints table
CREATE TABLE standard7_hints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section TEXT NOT NULL CHECK (section IN ('creditAnalysis', 'borrowingStrategy', 'creditScore')),
    content TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    visibility hint_visibility NOT NULL DEFAULT 'hidden',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Standard 7 sample answers table
CREATE TABLE standard7_sample_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section TEXT NOT NULL CHECK (section IN ('creditAnalysis', 'borrowingStrategy', 'creditScore')),
    content JSONB NOT NULL,
    visibility hint_visibility NOT NULL DEFAULT 'hidden',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Standard 7 versions table
CREATE TABLE standard7_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES standard7_submissions(id),
    content JSONB NOT NULL,
    version_number INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Standard 7 assessments table
CREATE TABLE standard7_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES auth.users(id),
    submission_id UUID REFERENCES standard7_submissions(id),
    draft_id UUID REFERENCES standard7_drafts(id),
    status TEXT NOT NULL CHECK (status IN ('draft', 'submitted', 'graded', 'resubmit_requested', 'resubmitted')),
    current_score NUMERIC(5,2) CHECK (current_score >= 0 AND current_score <= 100),
    max_score NUMERIC(5,2) NOT NULL DEFAULT 100,
    submitted_at TIMESTAMP WITH TIME ZONE,
    graded_at TIMESTAMP WITH TIME ZONE,
    instructor_id UUID REFERENCES auth.users(id),
    feedback_count INTEGER NOT NULL DEFAULT 0,
    attempt_number INTEGER NOT NULL DEFAULT 1,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_standard7_submissions_student ON standard7_submissions(student_id);
CREATE INDEX idx_standard7_submissions_status ON standard7_submissions(status);
CREATE INDEX idx_standard7_drafts_student ON standard7_drafts(student_id);
CREATE INDEX idx_standard7_grades_submission ON standard7_grades(submission_id);
CREATE INDEX idx_standard7_feedback_submission ON standard7_feedback(submission_id);
CREATE INDEX idx_standard7_hints_section ON standard7_hints(section);
CREATE INDEX idx_standard7_sample_answers_section ON standard7_sample_answers(section);
CREATE INDEX idx_standard7_versions_submission ON standard7_versions(submission_id);
CREATE INDEX idx_standard7_assessments_student ON standard7_assessments(student_id);
CREATE INDEX idx_standard7_assessments_status ON standard7_assessments(status);

-- Create RLS policies
ALTER TABLE standard7_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard7_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard7_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard7_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard7_hints ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard7_sample_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard7_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard7_assessments ENABLE ROW LEVEL SECURITY;

-- Submissions policies
CREATE POLICY "Students can view their own submissions"
    ON standard7_submissions FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);

CREATE POLICY "Instructors can view all submissions"
    ON standard7_submissions FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = 'instructor'
    ));

CREATE POLICY "Students can create their own submissions"
    ON standard7_submissions FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = student_id);

-- Drafts policies
CREATE POLICY "Students can manage their own drafts"
    ON standard7_drafts FOR ALL
    TO authenticated
    USING (auth.uid() = student_id)
    WITH CHECK (auth.uid() = student_id);

-- Grades policies
CREATE POLICY "Students can view their own grades"
    ON standard7_grades FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM standard7_submissions
        WHERE standard7_submissions.id = submission_id
        AND standard7_submissions.student_id = auth.uid()
    ));

CREATE POLICY "Instructors can manage grades"
    ON standard7_grades FOR ALL
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = 'instructor'
    ));

-- Feedback policies
CREATE POLICY "Students can view feedback on their submissions"
    ON standard7_feedback FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM standard7_submissions
        WHERE standard7_submissions.id = submission_id
        AND standard7_submissions.student_id = auth.uid()
    ));

CREATE POLICY "Instructors can manage feedback"
    ON standard7_feedback FOR ALL
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = 'instructor'
    ));

-- Hints policies
CREATE POLICY "Everyone can view visible hints"
    ON standard7_hints FOR SELECT
    TO authenticated
    USING (visibility = 'visible');

CREATE POLICY "Instructors can manage hints"
    ON standard7_hints FOR ALL
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = 'instructor'
    ));

-- Sample answers policies
CREATE POLICY "Everyone can view visible sample answers"
    ON standard7_sample_answers FOR SELECT
    TO authenticated
    USING (visibility = 'visible');

CREATE POLICY "Instructors can manage sample answers"
    ON standard7_sample_answers FOR ALL
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = 'instructor'
    ));

-- Version history policies
CREATE POLICY "Students can view their own versions"
    ON standard7_versions FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM standard7_submissions
        WHERE id = standard7_versions.submission_id
        AND student_id = auth.uid()
    ));

CREATE POLICY "Instructors can view all versions"
    ON standard7_versions FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = 'instructor'
    ));

-- Assessments policies
CREATE POLICY "Students can view their own assessments"
    ON standard7_assessments FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id);

CREATE POLICY "Instructors can view all assessments"
    ON standard7_assessments FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = 'instructor'
    ));

CREATE POLICY "Instructors can update assessments"
    ON standard7_assessments FOR UPDATE
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = 'instructor'
    ));

-- Create functions to manage feedback count
CREATE OR REPLACE FUNCTION update_feedback_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE standard7_assessments
    SET feedback_count = (
        SELECT COUNT(*)
        FROM standard7_feedback
        WHERE submission_id = NEW.submission_id
    )
    WHERE submission_id = NEW.submission_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER standard7_feedback_count_trigger
AFTER INSERT OR DELETE ON standard7_feedback
FOR EACH ROW
EXECUTE FUNCTION update_feedback_count(); 