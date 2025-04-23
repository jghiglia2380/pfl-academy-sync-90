import { z } from 'zod';
import { BaseSubmission, BaseDraft, BaseFeedback, BaseGrade } from './capstone';

// Enums
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

// Teacher Configuration
export interface TeacherConfig {
  scaffoldingLevel: ScaffoldingLevel;
  hintsEnabled: boolean;
  sampleAnswersEnabled: boolean;
  accessibilitySettings: {
    highContrast: boolean;
    fontSize: number;
  };
}

// Hints and Sample Answers
export interface Hint {
  id: string;
  section: 'investmentAnalysis' | 'investmentStrategy' | 'investmentPlan';
  content: string;
  order: number;
  visibility: HintVisibility;
}

export interface SampleAnswer {
  id: string;
  section: 'investmentAnalysis' | 'investmentStrategy' | 'investmentPlan';
  content: string;
  visibility: HintVisibility;
}

// Progress Tracking
export interface ProgressTracking {
  investmentAnalysis: {
    completed: boolean;
    timeSpent: number;
    lastUpdated: string;
  };
  investmentStrategy: {
    completed: boolean;
    timeSpent: number;
    lastUpdated: string;
  };
  investmentPlan: {
    completed: boolean;
    timeSpent: number;
    lastUpdated: string;
  };
}

// Version History
export interface Version {
  id: string;
  content: InvestmentPlanningSubmission;
  versionNumber: number;
  createdAt: string;
}

// Investment Analysis
export interface InvestmentAnalysis {
  currentPortfolio: {
    stocks: {
      symbol: string;
      shares: number;
      purchasePrice: number;
      currentPrice: number;
    }[];
    bonds: {
      issuer: string;
      faceValue: number;
      couponRate: number;
      maturityDate: string;
    }[];
    mutualFunds: {
      name: string;
      shares: number;
      nav: number;
      expenseRatio: number;
    }[];
    otherAssets: {
      type: string;
      value: number;
      description: string;
    }[];
  };
  riskAssessment: {
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
    timeHorizon: number;
    liquidityNeeds: number;
    analysis: string;
  };
  performanceAnalysis: {
    returns: {
      annualized: number;
      ytd: number;
      historical: {
        year: number;
        return: number;
      }[];
    };
    benchmarkComparison: {
      benchmark: string;
      performance: number;
      analysis: string;
    };
  };
}

// Investment Strategy
export interface InvestmentStrategy {
  goals: {
    shortTerm: {
      goal: string;
      amount: number;
      timeframe: string;
    }[];
    longTerm: {
      goal: string;
      amount: number;
      timeframe: string;
    }[];
  };
  assetAllocation: {
    stocks: number;
    bonds: number;
    cash: number;
    alternatives: number;
    rationale: string;
  };
  investmentSelection: {
    criteria: string[];
    screeningProcess: string;
    diversificationStrategy: string;
  };
}

// Investment Plan
export interface InvestmentPlan {
  implementation: {
    accountTypes: {
      type: string;
      purpose: string;
      contributionStrategy: string;
    }[];
    rebalancingStrategy: {
      frequency: string;
      thresholds: number;
      process: string;
    };
    taxEfficiency: {
      strategies: string[];
      considerations: string;
    };
  };
  monitoring: {
    performanceMetrics: string[];
    reviewFrequency: string;
    adjustmentCriteria: string;
  };
  timeline: {
    milestones: {
      date: string;
      action: string;
      target: string;
    }[];
    reviewDates: string[];
  };
}

// Investment Planning Submission
export interface InvestmentPlanningSubmission {
  investmentAnalysis: InvestmentAnalysis;
  investmentStrategy: InvestmentStrategy;
  investmentPlan: InvestmentPlan;
}

// Zod Schemas
export const investmentAnalysisSchema = z.object({
  currentPortfolio: z.object({
    stocks: z.array(
      z.object({
        symbol: z.string().min(1),
        shares: z.number().min(0),
        purchasePrice: z.number().min(0),
        currentPrice: z.number().min(0),
      })
    ),
    bonds: z.array(
      z.object({
        issuer: z.string().min(1),
        faceValue: z.number().min(0),
        couponRate: z.number().min(0),
        maturityDate: z.string().min(1),
      })
    ),
    mutualFunds: z.array(
      z.object({
        name: z.string().min(1),
        shares: z.number().min(0),
        nav: z.number().min(0),
        expenseRatio: z.number().min(0),
      })
    ),
    otherAssets: z.array(
      z.object({
        type: z.string().min(1),
        value: z.number().min(0),
        description: z.string().min(1),
      })
    ),
  }),
  riskAssessment: z.object({
    riskTolerance: z.enum(['conservative', 'moderate', 'aggressive']),
    timeHorizon: z.number().min(0),
    liquidityNeeds: z.number().min(0),
    analysis: z.string().min(1),
  }),
  performanceAnalysis: z.object({
    returns: z.object({
      annualized: z.number(),
      ytd: z.number(),
      historical: z.array(
        z.object({
          year: z.number(),
          return: z.number(),
        })
      ),
    }),
    benchmarkComparison: z.object({
      benchmark: z.string().min(1),
      performance: z.number(),
      analysis: z.string().min(1),
    }),
  }),
});

export const investmentStrategySchema = z.object({
  goals: z.object({
    shortTerm: z.array(
      z.object({
        goal: z.string().min(1),
        amount: z.number().min(0),
        timeframe: z.string().min(1),
      })
    ),
    longTerm: z.array(
      z.object({
        goal: z.string().min(1),
        amount: z.number().min(0),
        timeframe: z.string().min(1),
      })
    ),
  }),
  assetAllocation: z.object({
    stocks: z.number().min(0).max(100),
    bonds: z.number().min(0).max(100),
    cash: z.number().min(0).max(100),
    alternatives: z.number().min(0).max(100),
    rationale: z.string().min(1),
  }),
  investmentSelection: z.object({
    criteria: z.array(z.string().min(1)),
    screeningProcess: z.string().min(1),
    diversificationStrategy: z.string().min(1),
  }),
});

export const investmentPlanSchema = z.object({
  implementation: z.object({
    accountTypes: z.array(
      z.object({
        type: z.string().min(1),
        purpose: z.string().min(1),
        contributionStrategy: z.string().min(1),
      })
    ),
    rebalancingStrategy: z.object({
      frequency: z.string().min(1),
      thresholds: z.number().min(0),
      process: z.string().min(1),
    }),
    taxEfficiency: z.object({
      strategies: z.array(z.string().min(1)),
      considerations: z.string().min(1),
    }),
  }),
  monitoring: z.object({
    performanceMetrics: z.array(z.string().min(1)),
    reviewFrequency: z.string().min(1),
    adjustmentCriteria: z.string().min(1),
  }),
  timeline: z.object({
    milestones: z.array(
      z.object({
        date: z.string().min(1),
        action: z.string().min(1),
        target: z.string().min(1),
      })
    ),
    reviewDates: z.array(z.string().min(1)),
  }),
});

export const investmentPlanningSubmissionSchema = z.object({
  investmentAnalysis: investmentAnalysisSchema,
  investmentStrategy: investmentStrategySchema,
  investmentPlan: investmentPlanSchema,
});

// Database Types
export type Standard4Submission = BaseSubmission & {
  content: InvestmentPlanningSubmission;
  teacherConfig: TeacherConfig;
  progress: ProgressTracking;
  status: AssessmentStatus;
  version: number;
};

export type Standard4Draft = BaseDraft & {
  content: InvestmentPlanningSubmission;
  teacherConfig: TeacherConfig;
  progress: ProgressTracking;
  autoSaved: boolean;
  lastAutoSave: string;
};

export type Standard4Feedback = BaseFeedback & {
  content: {
    investmentAnalysis: string;
    investmentStrategy: string;
    investmentPlan: string;
  };
  teacherConfig: TeacherConfig;
};

export type Standard4Grade = BaseGrade & {
  rubric: {
    investmentAnalysis: number;
    investmentStrategy: number;
    investmentPlan: number;
  };
  teacherConfig: TeacherConfig;
};

// Validation Schema
export const standard4SubmissionSchema = z.object({
  content: investmentPlanningSubmissionSchema,
  teacherConfig: z.object({
    scaffoldingLevel: z.nativeEnum(ScaffoldingLevel),
    hintsEnabled: z.boolean(),
    sampleAnswersEnabled: z.boolean(),
    accessibilitySettings: z.object({
      highContrast: z.boolean(),
      fontSize: z.number().min(12).max(24)
    })
  }),
  progress: z.object({
    investmentAnalysis: z.object({
      completed: z.boolean(),
      timeSpent: z.number().min(0),
      lastUpdated: z.string()
    }),
    investmentStrategy: z.object({
      completed: z.boolean(),
      timeSpent: z.number().min(0),
      lastUpdated: z.string()
    }),
    investmentPlan: z.object({
      completed: z.boolean(),
      timeSpent: z.number().min(0),
      lastUpdated: z.string()
    })
  }),
  status: z.nativeEnum(AssessmentStatus),
  version: z.number().min(1)
}); 