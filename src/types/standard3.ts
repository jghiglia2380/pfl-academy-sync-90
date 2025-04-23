import { z } from 'zod';
import { BaseSubmission, BaseDraft, BaseFeedback, BaseGrade } from './capstone';

// Credit Score Analysis
export interface CreditScoreAnalysis {
  currentScore: number;
  scoreFactors: {
    paymentHistory: number;
    creditUtilization: number;
    lengthOfCredit: number;
    newCredit: number;
    creditMix: number;
  };
  scoreImpact: string;
  improvementPlan: string;
}

// Credit Report Analysis
export interface CreditReportAnalysis {
  accounts: {
    type: string;
    balance: number;
    limit: number;
    status: string;
    openedDate: string;
  }[];
  inquiries: {
    date: string;
    type: string;
    company: string;
  }[];
  publicRecords: {
    type: string;
    date: string;
    amount: number;
  }[];
  analysis: string;
}

// Credit Management Plan
export interface CreditManagementPlan {
  goals: {
    shortTerm: string[];
    longTerm: string[];
  };
  strategies: {
    debtReduction: string;
    creditBuilding: string;
    utilization: string;
  };
  timeline: {
    milestones: {
      date: string;
      goal: string;
      action: string;
    }[];
    targetScore: number;
    targetDate: string;
  };
}

// Credit Management Submission
export interface CreditManagementSubmission {
  creditScoreAnalysis: CreditScoreAnalysis;
  creditReportAnalysis: CreditReportAnalysis;
  creditManagementPlan: CreditManagementPlan;
}

// Zod Schemas
export const creditScoreAnalysisSchema = z.object({
  currentScore: z.number().min(300).max(850),
  scoreFactors: z.object({
    paymentHistory: z.number().min(0).max(100),
    creditUtilization: z.number().min(0).max(100),
    lengthOfCredit: z.number().min(0).max(100),
    newCredit: z.number().min(0).max(100),
    creditMix: z.number().min(0).max(100),
  }),
  scoreImpact: z.string().min(1),
  improvementPlan: z.string().min(1),
});

export const creditReportAnalysisSchema = z.object({
  accounts: z.array(
    z.object({
      type: z.string().min(1),
      balance: z.number().min(0),
      limit: z.number().min(0),
      status: z.string().min(1),
      openedDate: z.string().min(1),
    })
  ),
  inquiries: z.array(
    z.object({
      date: z.string().min(1),
      type: z.string().min(1),
      company: z.string().min(1),
    })
  ),
  publicRecords: z.array(
    z.object({
      type: z.string().min(1),
      date: z.string().min(1),
      amount: z.number().min(0),
    })
  ),
  analysis: z.string().min(1),
});

export const creditManagementPlanSchema = z.object({
  goals: z.object({
    shortTerm: z.array(z.string().min(1)),
    longTerm: z.array(z.string().min(1)),
  }),
  strategies: z.object({
    debtReduction: z.string().min(1),
    creditBuilding: z.string().min(1),
    utilization: z.string().min(1),
  }),
  timeline: z.object({
    milestones: z.array(
      z.object({
        date: z.string().min(1),
        goal: z.string().min(1),
        action: z.string().min(1),
      })
    ),
    targetScore: z.number().min(300).max(850),
    targetDate: z.string().min(1),
  }),
});

export const creditManagementSubmissionSchema = z.object({
  creditScoreAnalysis: creditScoreAnalysisSchema,
  creditReportAnalysis: creditReportAnalysisSchema,
  creditManagementPlan: creditManagementPlanSchema,
});

// Database Types
export type Standard3Submission = BaseSubmission & {
  content: CreditManagementSubmission;
};

export type Standard3Draft = BaseDraft & {
  content: CreditManagementSubmission;
};

export type Standard3Feedback = BaseFeedback & {
  content: {
    creditScoreAnalysis: string;
    creditReportAnalysis: string;
    creditManagementPlan: string;
  };
};

export type Standard3Grade = BaseGrade & {
  rubric: {
    creditScoreAnalysis: number;
    creditReportAnalysis: number;
    creditManagementPlan: number;
  };
};

export enum ScaffoldingLevel {
  Clean = 'clean',
  Guided = 'guided',
  Complete = 'complete'
}

export enum HintVisibility {
  Hidden = 'hidden',
  Available = 'available',
  Shown = 'shown'
}

export enum AssessmentStatus {
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Submitted = 'submitted',
  Graded = 'graded'
}

export interface TeacherConfig {
  scaffoldingLevel: ScaffoldingLevel;
  hints: {
    providerAnalysis: HintVisibility;
    serviceComparison: HintVisibility;
    recommendations: HintVisibility;
  };
  sampleAnswers: {
    providerAnalysis: boolean;
    serviceComparison: boolean;
    recommendations: boolean;
  };
}

export interface Hint {
  id: string;
  section: 'providerAnalysis' | 'serviceComparison' | 'recommendations';
  content: string;
  order: number;
  visibility: HintVisibility;
}

export interface SampleAnswer {
  id: string;
  section: 'providerAnalysis' | 'serviceComparison' | 'recommendations';
  content: string;
  isVisible: boolean;
}

export interface ProgressTracking {
  providerAnalysis: {
    isComplete: boolean;
    timeSpent: number;
    lastUpdated: string;
  };
  serviceComparison: {
    isComplete: boolean;
    timeSpent: number;
    lastUpdated: string;
  };
  recommendations: {
    isComplete: boolean;
    timeSpent: number;
    lastUpdated: string;
  };
}

export interface Standard3Submission {
  id: string;
  studentId: string;
  content: {
    providerAnalysis: {
      providerType: string;
      services: string[];
      fees: {
        monthly: number;
        annual: number;
        transaction: number;
      };
      accessibility: {
        locations: number;
        online: boolean;
        mobile: boolean;
      };
      customerService: {
        rating: number;
        availability: string;
        supportChannels: string[];
      };
    };
    serviceComparison: {
      providers: {
        name: string;
        type: string;
        services: string[];
        fees: {
          monthly: number;
          annual: number;
          transaction: number;
        };
        accessibility: {
          locations: number;
          online: boolean;
          mobile: boolean;
        };
        customerService: {
          rating: number;
          availability: string;
          supportChannels: string[];
        };
      }[];
      comparisonCriteria: string[];
      analysis: string;
    };
    recommendations: {
      primaryProvider: string;
      secondaryProvider: string;
      justification: string;
      implementationPlan: string;
    };
  };
  submittedAt: string;
  previousSubmissionId?: string;
  teacherConfig?: TeacherConfig;
  progress: ProgressTracking;
  version: number;
}

export interface Standard3Draft {
  id: string;
  studentId: string;
  content: Standard3Submission['content'];
  lastUpdated: string;
  progress: ProgressTracking;
  version: number;
}

export interface Standard3Feedback {
  id: string;
  submissionId: string;
  instructorId: string;
  content: {
    providerAnalysis: string;
    serviceComparison: string;
    recommendations: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Standard3Grade {
  id: string;
  submissionId: string;
  instructorId: string;
  score: number;
  rubricScores: {
    providerAnalysis: number;
    serviceComparison: number;
    recommendations: number;
  };
  gradedAt: string;
}

export interface Version {
  id: string;
  submissionId: string;
  content: Standard3Submission['content'];
  createdAt: string;
  versionNumber: number;
}

export const standard3SubmissionSchema = z.object({
  content: z.object({
    providerAnalysis: z.object({
      providerType: z.string(),
      services: z.array(z.string()),
      fees: z.object({
        monthly: z.number(),
        annual: z.number(),
        transaction: z.number(),
      }),
      accessibility: z.object({
        locations: z.number(),
        online: z.boolean(),
        mobile: z.boolean(),
      }),
      customerService: z.object({
        rating: z.number(),
        availability: z.string(),
        supportChannels: z.array(z.string()),
      }),
    }),
    serviceComparison: z.object({
      providers: z.array(z.object({
        name: z.string(),
        type: z.string(),
        services: z.array(z.string()),
        fees: z.object({
          monthly: z.number(),
          annual: z.number(),
          transaction: z.number(),
        }),
        accessibility: z.object({
          locations: z.number(),
          online: z.boolean(),
          mobile: z.boolean(),
        }),
        customerService: z.object({
          rating: z.number(),
          availability: z.string(),
          supportChannels: z.array(z.string()),
        }),
      })),
      comparisonCriteria: z.array(z.string()),
      analysis: z.string(),
    }),
    recommendations: z.object({
      primaryProvider: z.string(),
      secondaryProvider: z.string(),
      justification: z.string(),
      implementationPlan: z.string(),
    }),
  }),
  progress: z.object({
    providerAnalysis: z.object({
      isComplete: z.boolean(),
      timeSpent: z.number(),
      lastUpdated: z.string(),
    }),
    serviceComparison: z.object({
      isComplete: z.boolean(),
      timeSpent: z.number(),
      lastUpdated: z.string(),
    }),
    recommendations: z.object({
      isComplete: z.boolean(),
      timeSpent: z.number(),
      lastUpdated: z.string(),
    }),
  }),
  version: z.number(),
}); 