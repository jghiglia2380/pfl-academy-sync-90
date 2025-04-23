import { z } from 'zod';
import { BaseSubmission, BaseDraft, BaseFeedback, BaseGrade } from './capstone';
import { standard11Schema } from "../schemas/standard11";

// Risk Assessment Types
export interface RiskAssessmentResponse {
  identifiedRisks: {
    description: string;
    likelihood: number;
    impact: number;
    estimatedCost: number;
    explanation: string;
  }[];
}

// Insurance Analysis Types
export interface InsuranceAnalysisResponse {
  recommendedCoverage: {
    type: string;
    reason: string;
  }[];
  monthlyBudget: {
    income: number;
    expenses: number;
    insuranceAllocation: number;
    calculations: string;
  };
}

// Protection Plan Types
export interface ProtectionPlanResponse {
  steps: {
    timeframe: 'immediate' | 'short-term' | 'medium-term';
    action: string;
    details: string;
  }[];
}

// Scenario Response Types
export interface ScenarioResponse {
  riskAssessment: RiskAssessmentResponse;
  insuranceAnalysis: InsuranceAnalysisResponse;
  protectionPlan: ProtectionPlanResponse;
}

// Main Submission Type
export interface Standard11Submission extends BaseSubmission {
  scenario1Response: ScenarioResponse;
  scenario2Response: ScenarioResponse;
}

// Draft Type
export interface Standard11Draft extends BaseDraft {
  content: Partial<Standard11Submission>;
}

// Feedback Type
export interface Standard11Feedback extends BaseFeedback {
  content: {
    riskAssessment: string;
    insuranceAnalysis: string;
    protectionPlan: string;
  };
}

// Grade Type
export interface Standard11Grade extends BaseGrade {
  rubricScores: {
    riskAssessment: number;
    insuranceAnalysis: number;
    protectionPlan: number;
  };
}

// Zod Schema for Validation
export const riskAssessmentSchema = z.object({
  identifiedRisks: z.array(z.object({
    description: z.string().min(1, "Risk description is required"),
    likelihood: z.number().min(1).max(3),
    impact: z.number().min(1).max(3),
    estimatedCost: z.number().min(0),
    explanation: z.string().min(1, "Explanation is required")
  })).min(1, "At least one risk must be identified")
});

export const insuranceAnalysisSchema = z.object({
  recommendedCoverage: z.array(z.object({
    type: z.string().min(1, "Insurance type is required"),
    reason: z.string().min(1, "Reason is required")
  })).min(1, "At least one insurance recommendation is required"),
  monthlyBudget: z.object({
    income: z.number().min(0),
    expenses: z.number().min(0),
    insuranceAllocation: z.number().min(0),
    calculations: z.string().min(1, "Budget calculations are required")
  })
});

export const protectionPlanSchema = z.object({
  steps: z.array(z.object({
    timeframe: z.enum(['immediate', 'short-term', 'medium-term']),
    action: z.string().min(1, "Action is required"),
    details: z.string().min(1, "Details are required")
  })).min(3, "At least three steps are required")
});

export const scenarioResponseSchema = z.object({
  riskAssessment: riskAssessmentSchema,
  insuranceAnalysis: insuranceAnalysisSchema,
  protectionPlan: protectionPlanSchema
});

export const standard11SubmissionSchema = z.object({
  scenario1Response: scenarioResponseSchema,
  scenario2Response: scenarioResponseSchema
});

export type Risk = {
  type: string;
  description: string;
  impact: number;
  probability: number;
  mitigationStrategy: string;
};

export type InsuranceCoverage = {
  type: string;
  provider: string;
  coverage: number;
  premium: number;
  deductible: number;
  justification: string;
};

export type MonthlyBudget = {
  income: number;
  expenses: number;
  insuranceAllocation: number;
  calculations: string;
};

export type ProtectionStep = {
  action: string;
  timeline: string;
  cost: number;
  expectedOutcome: string;
  priority: "high" | "medium" | "low";
};

export type ScenarioResponse = {
  riskAssessment: {
    identifiedRisks: Risk[];
  };
  insuranceAnalysis: {
    recommendedCoverage: InsuranceCoverage[];
    monthlyBudget: MonthlyBudget;
  };
  protectionPlan: {
    steps: ProtectionStep[];
  };
};

export type Standard11Draft = {
  scenario1_response: ScenarioResponse;
  scenario2_response: ScenarioResponse;
};

export type Standard11Submission = z.infer<typeof standard11Schema>;

export enum ScaffoldingLevel {
    Clean = 'clean',
    Guided = 'guided',
    Complete = 'complete'
}

export enum HintVisibility {
    Hidden = 'hidden',
    Visible = 'visible'
}

export enum AssessmentStatus {
    Draft = 'draft',
    Submitted = 'submitted',
    Graded = 'graded',
    Returned = 'returned'
}

export interface TeacherConfig {
    scaffoldingLevel: ScaffoldingLevel;
    hintsEnabled: boolean;
    sampleAnswersEnabled: boolean;
    accessibilitySettings: {
        highContrast: boolean;
        fontSize: number;
    };
}

export interface Hint {
    id: string;
    section: 'evaluationCriteria' | 'assessmentMethods' | 'feedbackMechanisms';
    content: string;
    order: number;
    visibility: HintVisibility;
    created_at: string;
    updated_at: string;
}

export interface SampleAnswer {
    id: string;
    section: 'evaluationCriteria' | 'assessmentMethods' | 'feedbackMechanisms';
    content: any;
    visibility: HintVisibility;
    created_at: string;
    updated_at: string;
}

export interface ProgressTracking {
    evaluationCriteria: {
        completed: boolean;
        timeSpent: number;
        lastUpdated: string | null;
    };
    assessmentMethods: {
        completed: boolean;
        timeSpent: number;
        lastUpdated: string | null;
    };
    feedbackMechanisms: {
        completed: boolean;
        timeSpent: number;
        lastUpdated: string | null;
    };
}

export interface Version {
    id: string;
    submission_id: string;
    content: any;
    version_number: number;
    created_at: string;
}

export interface Standard11Submission {
    id: string;
    student_id: string;
    content: {
        evaluationCriteria: {
            criteria: {
                name: string;
                description: string;
                weight: number;
            }[];
            alignment: string;
            justification: string;
        };
        assessmentMethods: {
            methods: {
                name: string;
                description: string;
                criteria: string[];
            }[];
            implementation: string;
            timeline: string;
        };
        feedbackMechanisms: {
            mechanisms: {
                type: string;
                frequency: string;
                format: string;
            }[];
            improvement: string;
            documentation: string;
        };
    };
    submitted_at: string;
    previous_submission_id?: string;
    created_at: string;
    updated_at: string;
    teacher_config: TeacherConfig;
    progress: ProgressTracking;
    version: number;
    status: AssessmentStatus;
}

export interface Standard11Draft {
    id: string;
    student_id: string;
    content: Standard11Submission['content'];
    last_updated: string;
    created_at: string;
    teacher_config: TeacherConfig;
    progress: ProgressTracking;
    auto_saved: boolean;
    last_auto_save?: string;
}

export interface Standard11Feedback {
    id: string;
    submission_id: string;
    instructor_id: string;
    content: string;
    created_at: string;
    updated_at: string;
    teacher_config: TeacherConfig;
}

export interface Standard11Grade {
    id: string;
    submission_id: string;
    instructor_id: string;
    score: number;
    rubric_scores: {
        evaluationCriteria: number;
        assessmentMethods: number;
        feedbackMechanisms: number;
    };
    graded_at: string;
    created_at: string;
    updated_at: string;
    teacher_config: TeacherConfig;
}

export const standard11SubmissionSchema = z.object({
    content: z.object({
        evaluationCriteria: z.object({
            criteria: z.array(z.object({
                name: z.string(),
                description: z.string(),
                weight: z.number()
            })),
            alignment: z.string(),
            justification: z.string()
        }),
        assessmentMethods: z.object({
            methods: z.array(z.object({
                name: z.string(),
                description: z.string(),
                criteria: z.array(z.string())
            })),
            implementation: z.string(),
            timeline: z.string()
        }),
        feedbackMechanisms: z.object({
            mechanisms: z.array(z.object({
                type: z.string(),
                frequency: z.string(),
                format: z.string()
            })),
            improvement: z.string(),
            documentation: z.string()
        })
    }),
    progress: z.object({
        evaluationCriteria: z.object({
            completed: z.boolean(),
            timeSpent: z.number(),
            lastUpdated: z.string().nullable()
        }),
        assessmentMethods: z.object({
            completed: z.boolean(),
            timeSpent: z.number(),
            lastUpdated: z.string().nullable()
        }),
        feedbackMechanisms: z.object({
            completed: z.boolean(),
            timeSpent: z.number(),
            lastUpdated: z.string().nullable()
        })
    })
}); 