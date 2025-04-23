import { Database } from './supabase';
import { z } from "zod";

export type Standard10Assessment = Database['public']['Tables']['standard10_assessments']['Row'];

export interface MarketAnalysis {
  location: string;
  propertyType: string;
  marketTrends: string;
  comparableProperties: Array<{
    address: string;
    price: number;
    features: string;
  }>;
}

export interface FinancialCalculations {
  monthlyIncome: number;
  monthlyExpenses: number;
  downPayment: number;
  mortgageRate: number;
  propertyTaxes: number;
  insurance: number;
  maintenanceCosts: number;
  debtToIncomeRatio: number;
}

export interface DecisionAnalysis {
  pros: string[];
  cons: string[];
  shortTermConsiderations: string;
  longTermConsiderations: string;
  riskAnalysis: string;
}

export interface Standard10Scenario {
  marketAnalysis: MarketAnalysis;
  financialCalculations: FinancialCalculations;
  decisionAnalysis: DecisionAnalysis;
  recommendation: string;
}

export interface Standard10FormData {
  scenario1: Standard10Scenario;
  scenario2: Standard10Scenario;
}

export interface Standard10Progress {
  marketAnalysis: boolean;
  financialAnalysis: boolean;
  decisionAnalysis: boolean;
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

export interface Standard10Submission {
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

export interface Standard10Draft {
    id: string;
    student_id: string;
    content: Standard10Submission['content'];
    last_updated: string;
    created_at: string;
    teacher_config: TeacherConfig;
    progress: ProgressTracking;
    auto_saved: boolean;
    last_auto_save?: string;
}

export interface Standard10Feedback {
    id: string;
    submission_id: string;
    instructor_id: string;
    content: string;
    created_at: string;
    updated_at: string;
    teacher_config: TeacherConfig;
}

export interface Standard10Grade {
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

export const standard10SubmissionSchema = z.object({
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