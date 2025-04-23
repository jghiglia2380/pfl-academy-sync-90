-- Create enum types
CREATE TYPE scaffolding_level AS ENUM ('clean', 'guided', 'complete');

-- Create tables
CREATE TABLE standard1_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES auth.users(id) NOT NULL,
    content JSONB NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    previous_submission_id UUID REFERENCES standard1_submissions(id),
    version_history JSONB[] DEFAULT '{}',
    progress JSONB NOT NULL DEFAULT '{
        "financialGoals": {"completed": false, "timeSpent": 0, "lastUpdated": null},
        "budgetAnalysis": {"completed": false, "timeSpent": 0, "lastUpdated": null},
        "recommendations": {"completed": false, "timeSpent": 0, "lastUpdated": null}
    }',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard1_drafts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES auth.users(id) NOT NULL,
    content JSONB NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    auto_save_status JSONB NOT NULL DEFAULT '{
        "lastSaved": null,
        "isSaving": false,
        "error": null
    }',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard1_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID REFERENCES standard1_submissions(id) NOT NULL,
    instructor_id UUID REFERENCES auth.users(id) NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    scaffolding_level scaffolding_level NOT NULL DEFAULT 'clean'
);

CREATE TABLE standard1_grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID REFERENCES standard1_submissions(id) NOT NULL,
    instructor_id UUID REFERENCES auth.users(id) NOT NULL,
    score INTEGER NOT NULL,
    rubric_scores JSONB NOT NULL,
    graded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    teacher_config JSONB NOT NULL DEFAULT '{
        "scaffoldingLevel": "clean",
        "hints": {
            "financialGoals": false,
            "budgetAnalysis": false,
            "recommendations": false
        },
        "sampleAnswers": {
            "financialGoals": false,
            "budgetAnalysis": false,
            "recommendations": false
        }
    }'
);

CREATE TABLE standard1_hints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section TEXT NOT NULL CHECK (section IN ('financialGoals', 'budgetAnalysis', 'recommendations')),
    content TEXT NOT NULL,
    visibility BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard1_sample_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section TEXT NOT NULL CHECK (section IN ('financialGoals', 'budgetAnalysis', 'recommendations')),
    content JSONB NOT NULL,
    visibility BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_standard1_submissions_student_id ON standard1_submissions(student_id);
CREATE INDEX idx_standard1_drafts_student_id ON standard1_drafts(student_id);
CREATE INDEX idx_standard1_feedback_submission_id ON standard1_feedback(submission_id);
CREATE INDEX idx_standard1_grades_submission_id ON standard1_grades(submission_id);
CREATE INDEX idx_standard1_hints_section ON standard1_hints(section);
CREATE INDEX idx_standard1_sample_answers_section ON standard1_sample_answers(section);

-- Create RLS policies
ALTER TABLE standard1_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard1_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard1_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard1_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard1_hints ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard1_sample_answers ENABLE ROW LEVEL SECURITY;

-- Submissions policies
CREATE POLICY "Students can view their own submissions"
    ON standard1_submissions FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Students can create submissions"
    ON standard1_submissions FOR INSERT
    WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own submissions"
    ON standard1_submissions FOR UPDATE
    USING (auth.uid() = student_id);

-- Drafts policies
CREATE POLICY "Students can view their own drafts"
    ON standard1_drafts FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Students can create drafts"
    ON standard1_drafts FOR INSERT
    WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own drafts"
    ON standard1_drafts FOR UPDATE
    USING (auth.uid() = student_id);

-- Feedback policies
CREATE POLICY "Students can view feedback on their submissions"
    ON standard1_feedback FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM standard1_submissions
        WHERE standard1_submissions.id = standard1_feedback.submission_id
        AND standard1_submissions.student_id = auth.uid()
    ));

CREATE POLICY "Instructors can create and update feedback"
    ON standard1_feedback FOR ALL
    USING (auth.uid() = instructor_id);

-- Grades policies
CREATE POLICY "Students can view their own grades"
    ON standard1_grades FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM standard1_submissions
        WHERE standard1_submissions.id = standard1_grades.submission_id
        AND standard1_submissions.student_id = auth.uid()
    ));

CREATE POLICY "Instructors can create and update grades"
    ON standard1_grades FOR ALL
    USING (auth.uid() = instructor_id);

-- Hints policies
CREATE POLICY "Everyone can view visible hints"
    ON standard1_hints FOR SELECT
    USING (visibility = true);

CREATE POLICY "Instructors can manage all hints"
    ON standard1_hints FOR ALL
    USING (auth.uid() IN (SELECT id FROM auth.users WHERE role = 'instructor'));

-- Sample answers policies
CREATE POLICY "Everyone can view visible sample answers"
    ON standard1_sample_answers FOR SELECT
    USING (visibility = true);

CREATE POLICY "Instructors can manage all sample answers"
    ON standard1_sample_answers FOR ALL
    USING (auth.uid() IN (SELECT id FROM auth.users WHERE role = 'instructor'));

-- Create function to update feedback count
CREATE OR REPLACE FUNCTION update_standard1_feedback_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE standard1_submissions
        SET feedback_count = COALESCE(feedback_count, 0) + 1
        WHERE id = NEW.submission_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE standard1_submissions
        SET feedback_count = GREATEST(COALESCE(feedback_count, 0) - 1, 0)
        WHERE id = OLD.submission_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for feedback count
CREATE TRIGGER standard1_feedback_count_trigger
AFTER INSERT OR DELETE ON standard1_feedback
FOR EACH ROW EXECUTE FUNCTION update_standard1_feedback_count(); 