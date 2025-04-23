import { CapstoneProject } from './capstone';
import { z } from 'zod';

export interface TaxAnalysis {
  grossIncome: number;
  adjustments: number;
  analysis: string;
  taxBracket?: string;
  estimatedLiability?: number;
}

export interface DeductionPlan {
  deductionMethod: 'standard' | 'itemized';
  totalDeductions: number;
  strategy: string;
  itemizedBreakdown?: {
    mortgageInterest?: number;
    stateTaxes?: number;
    charitableContributions?: number;
    medicalExpenses?: number;
  };
}

export interface TaxStrategy {
  shortTerm: string;
  longTerm: string;
  timeline: string;
  riskAssessment?: string;
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
    section: 'creditAnalysis' | 'debtManagement' | 'creditScore';
    content: string;
    order: number;
    visibility: HintVisibility;
    created_at: string;
    updated_at: string;
}

export interface SampleAnswer {
    id: string;
    section: 'creditAnalysis' | 'debtManagement' | 'creditScore';
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
    debtManagement: {
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

export interface Standard6Submission {
    id: string;
    student_id: string;
    content: {
        creditAnalysis: {
            provider: string;
            services: string[];
            fees: number[];
            benefits: string[];
        };
        debtManagement: {
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

export interface Standard6Draft {
    id: string;
    student_id: string;
    content: Standard6Submission['content'];
    last_updated: string;
    created_at: string;
    teacher_config: TeacherConfig;
    progress: ProgressTracking;
    auto_saved: boolean;
    last_auto_save?: string;
}

export interface Standard6Feedback {
    id: string;
    submission_id: string;
    instructor_id: string;
    content: string;
    created_at: string;
    updated_at: string;
    teacher_config: TeacherConfig;
}

export interface Standard6Grade {
    id: string;
    submission_id: string;
    instructor_id: string;
    score: number;
    rubric_scores: {
        creditAnalysis: number;
        debtManagement: number;
        creditScore: number;
    };
    graded_at: string;
    created_at: string;
    updated_at: string;
    teacher_config: TeacherConfig;
}

export const standard6SubmissionSchema = z.object({
    content: z.object({
        creditAnalysis: z.object({
            provider: z.string(),
            services: z.array(z.string()),
            fees: z.array(z.number()),
            benefits: z.array(z.string())
        }),
        debtManagement: z.object({
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
        debtManagement: z.object({
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

export interface Standard6CapstoneProject extends CapstoneProject {
  taxScenarios: {
    incomeSource: string;
    annualAmount: number;
    taxTreatment: string;
    specialConsiderations: string;
  }[];
  deductionData: {
    standardDeductions: {
      single: number;
      marriedJoint: number;
      headOfHousehold: number;
    };
    itemizedExamples: {
      mortgageInterest: number;
      stateTaxes: number;
      charitableContributions: number;
      medicalExpensesThreshold: number;
    };
  };
  taxCredits: {
    type: string;
    maxAmount: string;
    incomeLimits: string;
    notes: string;
  }[];
} 