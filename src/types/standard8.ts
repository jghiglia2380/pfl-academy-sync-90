import { z } from "zod";

export interface CreditCardOption {
  name: string;
  apr: number;
  annualFee: number;
  rewards: string;
  signUpBonus: string;
  additionalBenefits: string;
}

export interface LargePurchaseScenario {
  purchaseAmount: number;
  paymentTerms: {
    months: number;
    equalPayments: boolean;
  };
  costFactors: {
    includeAnnualFees: boolean;
    includeRewards: boolean;
  };
  assumptions: {
    meetBonusRequirements: boolean;
    regularPaymentSchedule: boolean;
  };
}

export interface MonthlySpendingScenario {
  diningAndEntertainment: {
    diningOut: number;
    entertainment: number;
    rewardsPotential: string;
  };
  travelAndTransit: {
    travelExpenses: number;
    transitCosts: number;
    bonusCategoryEligible: boolean;
  };
  generalSpending: {
    generalPurchases: number;
    payFullBalance: boolean;
    consistentPattern: boolean;
  };
}

export interface BalanceTransferScenario {
  currentCard: {
    balance: number;
    apr: number;
    monthlyPayment: number;
  };
  transferOption: {
    newApr: number;
    transferFee: number;
    monthlyPayment: number;
  };
  paymentTerms: {
    fixedPayments: boolean;
    payUntilCleared: boolean;
    noNewPurchases: boolean;
  };
}

export interface RetailerSecurity {
  name: string;
  features: {
    encryption: boolean;
    twoFactorAuth: boolean;
    securePayment: boolean;
    fraudMonitoring: boolean;
  };
}

export interface PaymentMethodSecurity {
  name: string;
  features: {
    fraudProtection: boolean;
    realTimeMonitoring: boolean;
    virtualCardNumbers: boolean;
  };
}

export interface PurchaseOption {
  retailer: string;
  price: number;
  shipping: {
    cost: number;
    days: number;
  };
  warranty: {
    cost: number;
    type: string;
  };
  additionalFeatures: string[];
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
    section: 'onlineShopping' | 'creditCardManagement' | 'securityPractices';
    content: string;
    order: number;
    visibility: HintVisibility;
    created_at: string;
    updated_at: string;
}

export interface SampleAnswer {
    id: string;
    section: 'onlineShopping' | 'creditCardManagement' | 'securityPractices';
    content: any;
    visibility: HintVisibility;
    created_at: string;
    updated_at: string;
}

export interface ProgressTracking {
    onlineShopping: {
        completed: boolean;
        timeSpent: number;
        lastUpdated: string | null;
    };
    creditCardManagement: {
        completed: boolean;
        timeSpent: number;
        lastUpdated: string | null;
    };
    securityPractices: {
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

export interface Standard8Submission {
    id: string;
    student_id: string;
    content: {
        onlineShopping: {
            benefits: string[];
            risks: string[];
            comparison: {
                online: string[];
                inStore: string[];
            };
            decision: string;
        };
        creditCardManagement: {
            cardOptions: {
                name: string;
                apr: number;
                rewards: string[];
                fees: number[];
            }[];
            usagePlan: string;
            paymentStrategy: string;
        };
        securityPractices: {
            protectionMeasures: string[];
            warningSigns: string[];
            responsePlan: string;
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

export interface Standard8Draft {
    id: string;
    student_id: string;
    content: Standard8Submission['content'];
    last_updated: string;
    created_at: string;
    teacher_config: TeacherConfig;
    progress: ProgressTracking;
    auto_saved: boolean;
    last_auto_save?: string;
}

export interface Standard8Feedback {
    id: string;
    submission_id: string;
    instructor_id: string;
    content: string;
    created_at: string;
    updated_at: string;
    teacher_config: TeacherConfig;
}

export interface Standard8Grade {
    id: string;
    submission_id: string;
    instructor_id: string;
    score: number;
    rubric_scores: {
        onlineShopping: number;
        creditCardManagement: number;
        securityPractices: number;
    };
    graded_at: string;
    created_at: string;
    updated_at: string;
    teacher_config: TeacherConfig;
}

export const standard8SubmissionSchema = z.object({
    content: z.object({
        onlineShopping: z.object({
            benefits: z.array(z.string()),
            risks: z.array(z.string()),
            comparison: z.object({
                online: z.array(z.string()),
                inStore: z.array(z.string())
            }),
            decision: z.string()
        }),
        creditCardManagement: z.object({
            cardOptions: z.array(z.object({
                name: z.string(),
                apr: z.number(),
                rewards: z.array(z.string()),
                fees: z.array(z.number())
            })),
            usagePlan: z.string(),
            paymentStrategy: z.string()
        }),
        securityPractices: z.object({
            protectionMeasures: z.array(z.string()),
            warningSigns: z.array(z.string()),
            responsePlan: z.string()
        })
    }),
    progress: z.object({
        onlineShopping: z.object({
            completed: z.boolean(),
            timeSpent: z.number(),
            lastUpdated: z.string().nullable()
        }),
        creditCardManagement: z.object({
            completed: z.boolean(),
            timeSpent: z.number(),
            lastUpdated: z.string().nullable()
        }),
        securityPractices: z.object({
            completed: z.boolean(),
            timeSpent: z.number(),
            lastUpdated: z.string().nullable()
        })
    })
}); 