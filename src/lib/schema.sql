CREATE TABLE standard9_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id),
  status TEXT NOT NULL CHECK (status IN ('draft', 'submitted')),
  investment_analysis JSONB NOT NULL DEFAULT '{
    "cryptoScenario": {
      "redFlagsAnalysis": "",
      "potentialLosses": "",
      "evaluationFramework": ""
    },
    "phishingScenario": {
      "redFlagsAnalysis": "",
      "psychologicalTriggers": "",
      "verificationSteps": ""
    },
    "dataBreachScenario": {
      "immediateActions": "",
      "monitoringPlan": "",
      "documentationTemplate": ""
    }
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  grade JSONB DEFAULT NULL
);

-- Standard 11 Assessment Table
CREATE TABLE IF NOT EXISTS standard11_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('draft', 'submitted')) DEFAULT 'draft',
    scenario1_response JSONB DEFAULT jsonb_build_object(
        'riskAssessment', jsonb_build_object(
            'identifiedRisks', ARRAY[]::jsonb[]
        ),
        'insuranceAnalysis', jsonb_build_object(
            'recommendedCoverage', ARRAY[]::jsonb[],
            'monthlyBudget', jsonb_build_object(
                'income', 0,
                'expenses', 0,
                'insuranceAllocation', 0,
                'calculations', ''
            )
        ),
        'protectionPlan', jsonb_build_object(
            'steps', ARRAY[]::jsonb[]
        )
    ),
    scenario2_response JSONB DEFAULT jsonb_build_object(
        'riskAssessment', jsonb_build_object(
            'identifiedRisks', ARRAY[]::jsonb[]
        ),
        'insuranceAnalysis', jsonb_build_object(
            'recommendedCoverage', ARRAY[]::jsonb[],
            'monthlyBudget', jsonb_build_object(
                'income', 0,
                'expenses', 0,
                'insuranceAllocation', 0,
                'calculations', ''
            )
        ),
        'protectionPlan', jsonb_build_object(
            'steps', ARRAY[]::jsonb[]
        )
    ),
    grade JSONB DEFAULT NULL,
    feedback JSONB DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to update the updated_at timestamp
CREATE TRIGGER update_standard11_assessments_updated_at
    BEFORE UPDATE ON standard11_assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies for standard11_assessments
ALTER TABLE standard11_assessments ENABLE ROW LEVEL SECURITY;

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