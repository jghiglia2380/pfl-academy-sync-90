import { z } from "zod";
import { BaseAssessment, BaseDraft, BaseFeedback, BaseGrade, BaseSubmission } from "./base";

// Loan Analysis types
export interface LoanOption {
  loanType: string;
  principal: number;
  apr: number;
  termMonths: number;
  monthlyPayment: number;
  totalInterest: number;
  additionalFees: number;
}

export interface CreditSourceAnalysis {
  sourceType: string;
  interestRateRange: string;
  creditScoreRequired: string;
  applicationProcess: string;
  additionalRequirements: string;
}

export interface BorrowingFramework {
  loanNecessityCriteria: string;
  comparisonChecklist: string;
  riskAssessment: string;
  implementationPlan: string;
}

// Main submission content type
export interface BorrowingSubmission {
  loanAnalysis: {
    option1: LoanOption;
    option2: LoanOption;
    option3: LoanOption;
    analysisExplanation: string;
  };
  creditSources: {
    source1: CreditSourceAnalysis;
    source2: CreditSourceAnalysis;
    source3: CreditSourceAnalysis;
    sourceAnalysis: string;
  };
  framework: BorrowingFramework;
}

// Zod schemas for validation
const loanOptionSchema = z.object({
  loanType: z.string().min(1, "Loan type is required"),
  principal: z.number().min(0, "Principal must be positive"),
  apr: z.number().min(0, "APR must be positive"),
  termMonths: z.number().int().min(1, "Term must be at least 1 month"),
  monthlyPayment: z.number().min(0, "Monthly payment must be positive"),
  totalInterest: z.number().min(0, "Total interest must be positive"),
  additionalFees: z.number().min(0, "Additional fees must be positive")
});

const creditSourceAnalysisSchema = z.object({
  sourceType: z.string().min(1, "Source type is required"),
  interestRateRange: z.string().min(1, "Interest rate range is required"),
  creditScoreRequired: z.string().min(1, "Credit score requirement is required"),
  applicationProcess: z.string().min(1, "Application process is required"),
  additionalRequirements: z.string().min(1, "Additional requirements are required")
});

const borrowingFrameworkSchema = z.object({
  loanNecessityCriteria: z.string().min(1, "Loan necessity criteria is required"),
  comparisonChecklist: z.string().min(1, "Comparison checklist is required"),
  riskAssessment: z.string().min(1, "Risk assessment is required"),
  implementationPlan: z.string().min(1, "Implementation plan is required")
});

export const borrowingSubmissionSchema = z.object({
  loanAnalysis: z.object({
    option1: loanOptionSchema,
    option2: loanOptionSchema,
    option3: loanOptionSchema,
    analysisExplanation: z.string().min(1, "Analysis explanation is required")
  }),
  creditSources: z.object({
    source1: creditSourceAnalysisSchema,
    source2: creditSourceAnalysisSchema,
    source3: creditSourceAnalysisSchema,
    sourceAnalysis: z.string().min(1, "Source analysis is required")
  }),
  framework: borrowingFrameworkSchema
});

// Database types extending base types
export interface Standard7Submission extends BaseSubmission {
  content: BorrowingSubmission;
}

export interface Standard7Draft extends BaseDraft {
  content: Partial<BorrowingSubmission>;
}

export interface Standard7Feedback extends BaseFeedback {
  content: string;
}

export interface Standard7Grade extends BaseGrade {
  rubric: {
    costAnalysis: number;
    sourceEvaluation: number;
    decisionFramework: number;
  };
}

export interface Standard7Assessment extends BaseAssessment {
  submission?: Standard7Submission;
  draft?: Standard7Draft;
  grade?: Standard7Grade;
  feedback: Standard7Feedback[];
}

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
    section: 'creditAnalysis' | 'borrowingStrategy' | 'creditScore';
    content: string;
    order: number;
    visibility: HintVisibility;
    created_at: string;
    updated_at: string;
}

export interface SampleAnswer {
    id: string;
    section: 'creditAnalysis' | 'borrowingStrategy' | 'creditScore';
    content: any;
    visibility: HintVisibility;
    created_at: string;
    updated_at: string;
}

export interface ProgressTracking {
    creditAnalysis: {
        completed: boolean;
        timeSpent: number;
        lastUpdated: string | null;
    };
    borrowingStrategy: {
        completed: boolean;
        timeSpent: number;
        lastUpdated: string | null;
    };
    creditScore: {
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

export interface Standard7Submission {
    id: string;
    student_id: string;
    content: {
        creditAnalysis: {
            provider: string;
            services: string[];
            fees: number[];
            benefits: string[];
        };
        borrowingStrategy: {
            currentDebt: number;
            paymentPlan: string;
            interestRates: number[];
            payoffStrategy: string;
        };
        creditScore: {
            currentScore: number;
            factors: string[];
            improvementPlan: string;
            timeline: string;
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

export interface Standard7Draft {
    id: string;
    student_id: string;
    content: Standard7Submission['content'];
    last_updated: string;
    created_at: string;
    teacher_config: TeacherConfig;
    progress: ProgressTracking;
    auto_saved: boolean;
    last_auto_save?: string;
}

export interface Standard7Feedback {
    id: string;
    submission_id: string;
    instructor_id: string;
    content: string;
    created_at: string;
    updated_at: string;
    teacher_config: TeacherConfig;
}

export interface Standard7Grade {
    id: string;
    submission_id: string;
    instructor_id: string;
    score: number;
    rubric_scores: {
        creditAnalysis: number;
        borrowingStrategy: number;
        creditScore: number;
    };
    graded_at: string;
    created_at: string;
    updated_at: string;
    teacher_config: TeacherConfig;
}

export const standard7SubmissionSchema = z.object({
    content: z.object({
        creditAnalysis: z.object({
            provider: z.string(),
            services: z.array(z.string()),
            fees: z.array(z.number()),
            benefits: z.array(z.string())
        }),
        borrowingStrategy: z.object({
            currentDebt: z.number(),
            paymentPlan: z.string(),
            interestRates: z.array(z.number()),
            payoffStrategy: z.string()
        }),
        creditScore: z.object({
            currentScore: z.number(),
            factors: z.array(z.string()),
            improvementPlan: z.string(),
            timeline: z.string()
        })
    }),
    progress: z.object({
        creditAnalysis: z.object({
            completed: z.boolean(),
            timeSpent: z.number(),
            lastUpdated: z.string().nullable()
        }),
        borrowingStrategy: z.object({
            completed: z.boolean(),
            timeSpent: z.number(),
            lastUpdated: z.string().nullable()
        }),
        creditScore: z.object({
            completed: z.boolean(),
            timeSpent: z.number(),
            lastUpdated: z.string().nullable()
        })
    })
}); 