import { Database } from './supabase';

export type Standard13Assessment = {
    id: string;
    user_id: string;
    status: 'draft' | 'submitted' | 'graded';
    created_at: string;
    updated_at: string;
    submitted_at?: string;
    graded_at?: string;
    graded_by?: string;
    score?: number;
    feedback?: string[];
    
    // Scenario 1: Credit Card Analysis
    scenario1: {
        minimumPayment: number;
        monthlyInterest: number;
        principalReduction: number;
        payoffAnalysis: string;
        riskAssessment: string[];
        recommendedStrategy: {
            approach: 'minimum' | 'fixed' | 'aggressive';
            monthlyPayment: number;
            explanation: string;
        };
    };

    // Scenario 2: Debt Consolidation
    scenario2: {
        totalDebt: number;
        weightedInterestRate: number;
        debtPriority: {
            order: string[];
            reasoning: string;
        };
        consolidationStrategy: {
            recommendation: 'consolidate' | 'partial' | 'keep';
            explanation: string;
            paymentPlan: {
                allocation: Record<string, number>;
                timeline: string;
            };
        };
    };

    // Scenario 3: Debt Management
    scenario3: {
        budgetAnalysis: {
            totalExpenses: number;
            availableFunds: number;
            calculations: string;
        };
        potentialSavings: {
            areas: Array<{
                category: string;
                amount: number;
                explanation: string;
            }>;
        };
        actionPlan: {
            timeline: Array<{
                month: number;
                goals: string[];
                targetAmount: number;
            }>;
            specificActions: string[];
        };
    };
};

// Teacher Dashboard Support Level Configuration
export type ScaffoldingLevel = 'clean' | 'guided' | 'complete';

export type TeacherSupportConfig = {
    id: string;
    teacher_id: string;
    standard_id: string;
    class_id?: string;
    student_id?: string;
    display_mode: ScaffoldingLevel;
    show_hints: boolean;
    show_sample_answers: boolean;
    created_at: string;
    updated_at: string;
};

// Sample Answer Structure
export type SampleAnswers = {
    scenario1: {
        calculations: {
            minimumPayment: string;
            monthlyInterest: string;
            principalReduction: string;
        };
        analysis: {
            payoffTimeline: string;
            risks: string[];
            recommendedStrategy: string;
        };
    };
    scenario2: {
        calculations: {
            totalDebt: string;
            weightedRate: string;
        };
        analysis: {
            priorityOrder: string;
            consolidationRationale: string;
            paymentStrategy: string;
        };
    };
    scenario3: {
        calculations: {
            budgetAnalysis: string;
            savingsOpportunities: string;
        };
        planning: {
            timeline: string;
            actionSteps: string[];
        };
    };
};

// Hint Structure
export type ScenarioHints = {
    scenario1: {
        calculations: string[];
        analysis: string[];
        strategy: string[];
    };
    scenario2: {
        calculations: string[];
        analysis: string[];
        planning: string[];
    };
    scenario3: {
        calculations: string[];
        analysis: string[];
        planning: string[];
    };
};

export type Standard13Progress = {
    id: string;
    assessment_id: string;
    user_id: string;
    completed_sections: string[];
    current_section: string;
    saved_responses: Partial<Standard13Assessment>;
    last_saved: string;
    time_spent: number;
};

// Database types
export type Standard13Tables = {
    standard13_assessments: Standard13Assessment;
    standard13_progress: Standard13Progress;
    teacher_support_config: TeacherSupportConfig;
};

// Form validation schema will be defined in a separate file 