-- Create Standard 11 Assessments Table
CREATE TABLE standard11_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('draft', 'submitted')) DEFAULT 'draft',
  scenario1_response JSONB NOT NULL DEFAULT '{
    "riskAssessment": {
      "identifiedRisks": []
    },
    "insuranceAnalysis": {
      "recommendedCoverage": [],
      "monthlyBudget": {
        "income": 0,
        "expenses": 0,
        "insuranceAllocation": 0,
        "calculations": ""
      }
    },
    "protectionPlan": {
      "steps": []
    }
  }',
  scenario2_response JSONB NOT NULL DEFAULT '{
    "riskAssessment": {
      "identifiedRisks": []
    },
    "insuranceAnalysis": {
      "recommendedCoverage": [],
      "monthlyBudget": {
        "income": 0,
        "expenses": 0,
        "insuranceAllocation": 0,
        "calculations": ""
      }
    },
    "protectionPlan": {
      "steps": []
    }
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  grade JSONB DEFAULT NULL,
  feedback JSONB DEFAULT NULL
);

-- Create Index for Faster Queries
CREATE INDEX idx_standard11_assessments_student_id ON standard11_assessments(student_id);
CREATE INDEX idx_standard11_assessments_status ON standard11_assessments(status);

-- Create Updated At Trigger
CREATE TRIGGER update_standard11_assessments_updated_at
  BEFORE UPDATE ON standard11_assessments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE standard11_assessments ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can view own assessments"
  ON standard11_assessments FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Users can insert own assessments"
  ON standard11_assessments FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Users can update own assessments"
  ON standard11_assessments FOR UPDATE
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id); 