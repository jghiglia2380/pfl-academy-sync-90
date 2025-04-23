-- Create Standard 9 Assessments Table
CREATE TABLE IF NOT EXISTS standard9_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT CHECK (status IN ('draft', 'submitted', 'graded')) NOT NULL DEFAULT 'draft',
  
  -- Fraud Analysis
  fraud_analysis JSONB NOT NULL DEFAULT '{
    "emailRedFlags": "",
    "psychologicalTriggers": "",
    "verificationSteps": "",
    "socialMediaRedFlags": ""
  }',
  
  -- Investment Analysis
  investment_analysis JSONB NOT NULL DEFAULT '{
    "ponziCharacteristics": "",
    "potentialLosses": "",
    "evaluationFramework": ""
  }',
  
  -- Identity Protection
  identity_protection JSONB NOT NULL DEFAULT '{
    "immediateActions": "",
    "monitoringPlan": "",
    "documentationTemplate": ""
  }',
  
  -- Feedback
  feedback JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  submitted_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE standard9_assessments ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Users can view their own assessments"
  ON standard9_assessments
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assessments"
  ON standard9_assessments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own draft assessments"
  ON standard9_assessments
  FOR UPDATE
  USING (auth.uid() = user_id AND status = 'draft');

CREATE POLICY "Instructors can view all assessments"
  ON standard9_assessments
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'instructor'
  ));

CREATE POLICY "Instructors can grade assessments"
  ON standard9_assessments
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid()
    AND role = 'instructor'
  ));

-- Create Indexes
CREATE INDEX standard9_assessments_user_id_idx ON standard9_assessments(user_id);
CREATE INDEX standard9_assessments_status_idx ON standard9_assessments(status);
CREATE INDEX standard9_assessments_created_at_idx ON standard9_assessments(created_at);

-- Create Function to Update Updated At
CREATE OR REPLACE FUNCTION update_standard9_assessment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create Trigger
CREATE TRIGGER update_standard9_assessment_updated_at
  BEFORE UPDATE ON standard9_assessments
  FOR EACH ROW
  EXECUTE FUNCTION update_standard9_assessment_updated_at(); 