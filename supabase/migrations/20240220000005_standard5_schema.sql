-- Create enum types
CREATE TYPE scaffolding_level AS ENUM ('clean', 'guided', 'complete');
CREATE TYPE hint_visibility AS ENUM ('hidden', 'visible');
CREATE TYPE assessment_status AS ENUM ('draft', 'submitted', 'graded', 'returned');

-- Create tables
CREATE TABLE standard5_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES auth.users(id),
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  submitted_at TIMESTAMP WITH TIME ZONE,
  previous_submission_id UUID REFERENCES standard5_submissions(id),
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
    "riskAssessment": {
      "completed": false,
      "timeSpent": 0,
      "lastUpdated": null
    },
    "riskMitigation": {
      "completed": false,
      "timeSpent": 0,
      "lastUpdated": null
    },
    "riskMonitoring": {
      "completed": false,
      "timeSpent": 0,
      "lastUpdated": null
    }
  }',
  version INTEGER NOT NULL DEFAULT 1,
  status assessment_status NOT NULL DEFAULT 'draft'
);

CREATE TABLE standard5_drafts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES auth.users(id),
  content JSONB NOT NULL,
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
    "riskAssessment": {
      "completed": false,
      "timeSpent": 0,
      "lastUpdated": null
    },
    "riskMitigation": {
      "completed": false,
      "timeSpent": 0,
      "lastUpdated": null
    },
    "riskMonitoring": {
      "completed": false,
      "timeSpent": 0,
      "lastUpdated": null
    }
  }',
  auto_saved BOOLEAN NOT NULL DEFAULT false,
  last_auto_save TIMESTAMP WITH TIME ZONE
);

CREATE TABLE standard5_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES standard5_submissions(id),
  instructor_id UUID NOT NULL REFERENCES auth.users(id),
  content JSONB NOT NULL,
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

CREATE TABLE standard5_grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES standard5_submissions(id),
  instructor_id UUID NOT NULL REFERENCES auth.users(id),
  score INTEGER NOT NULL,
  rubric_scores JSONB NOT NULL,
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

CREATE TABLE standard5_hints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section TEXT NOT NULL CHECK (section IN ('riskAssessment', 'riskMitigation', 'riskMonitoring')),
  content TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  visibility hint_visibility NOT NULL DEFAULT 'hidden',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard5_sample_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section TEXT NOT NULL CHECK (section IN ('riskAssessment', 'riskMitigation', 'riskMonitoring')),
  content JSONB NOT NULL,
  visibility hint_visibility NOT NULL DEFAULT 'hidden',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE standard5_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES standard5_submissions(id),
  content JSONB NOT NULL,
  version_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_standard5_submissions_student_id ON standard5_submissions(student_id);
CREATE INDEX idx_standard5_submissions_status ON standard5_submissions(status);
CREATE INDEX idx_standard5_drafts_student_id ON standard5_drafts(student_id);
CREATE INDEX idx_standard5_feedback_submission_id ON standard5_feedback(submission_id);
CREATE INDEX idx_standard5_grades_submission_id ON standard5_grades(submission_id);
CREATE INDEX idx_standard5_hints_section ON standard5_hints(section);
CREATE INDEX idx_standard5_sample_answers_section ON standard5_sample_answers(section);
CREATE INDEX idx_standard5_versions_submission_id ON standard5_versions(submission_id);

-- Enable Row Level Security
ALTER TABLE standard5_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard5_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard5_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard5_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard5_hints ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard5_sample_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE standard5_versions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Students can only access their own submissions and drafts
CREATE POLICY "Students can view their own submissions"
  ON standard5_submissions FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert their own submissions"
  ON standard5_submissions FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own submissions"
  ON standard5_submissions FOR UPDATE
  USING (auth.uid() = student_id);

CREATE POLICY "Students can view their own drafts"
  ON standard5_drafts FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert their own drafts"
  ON standard5_drafts FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own drafts"
  ON standard5_drafts FOR UPDATE
  USING (auth.uid() = student_id);

-- Teachers can access all submissions and drafts
CREATE POLICY "Teachers can view all submissions"
  ON standard5_submissions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'teacher'
  ));

CREATE POLICY "Teachers can update all submissions"
  ON standard5_submissions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'teacher'
  ));

CREATE POLICY "Teachers can view all drafts"
  ON standard5_drafts FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'teacher'
  ));

-- Feedback and grades policies
CREATE POLICY "Students can view their own feedback"
  ON standard5_feedback FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM standard5_submissions
    WHERE id = standard5_feedback.submission_id AND student_id = auth.uid()
  ));

CREATE POLICY "Teachers can manage feedback"
  ON standard5_feedback FOR ALL
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'teacher'
  ));

CREATE POLICY "Students can view their own grades"
  ON standard5_grades FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM standard5_submissions
    WHERE id = standard5_grades.submission_id AND student_id = auth.uid()
  ));

CREATE POLICY "Teachers can manage grades"
  ON standard5_grades FOR ALL
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'teacher'
  ));

-- Hints and sample answers policies
CREATE POLICY "Everyone can view visible hints"
  ON standard5_hints FOR SELECT
  USING (visibility = 'visible');

CREATE POLICY "Teachers can manage hints"
  ON standard5_hints FOR ALL
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'teacher'
  ));

CREATE POLICY "Everyone can view visible sample answers"
  ON standard5_sample_answers FOR SELECT
  USING (visibility = 'visible');

CREATE POLICY "Teachers can manage sample answers"
  ON standard5_sample_answers FOR ALL
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'teacher'
  ));

-- Version history policies
CREATE POLICY "Students can view their own versions"
  ON standard5_versions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM standard5_submissions
    WHERE id = standard5_versions.submission_id AND student_id = auth.uid()
  ));

CREATE POLICY "Teachers can view all versions"
  ON standard5_versions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'teacher'
  ));

-- Create function to update feedback count
CREATE OR REPLACE FUNCTION update_standard5_feedback_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE standard5_grades
    SET feedback_count = feedback_count + 1
    WHERE submission_id = NEW.submission_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE standard5_grades
    SET feedback_count = feedback_count - 1
    WHERE submission_id = OLD.submission_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for feedback count
CREATE TRIGGER update_standard5_feedback_count_trigger
AFTER INSERT OR DELETE ON standard5_feedback
FOR EACH ROW
EXECUTE FUNCTION update_standard5_feedback_count(); 