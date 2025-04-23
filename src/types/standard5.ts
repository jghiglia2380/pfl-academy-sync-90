import { z } from 'zod';
import {
  BaseSubmission,
  BaseDraft,
  BaseFeedback,
  BaseGrade,
} from './capstone';

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
  section: 'riskAssessment' | 'riskManagementPlan';
  content: string;
  order: number;
  visibility: HintVisibility;
}

export interface SampleAnswer {
  id: string;
  section: 'riskAssessment' | 'riskManagementPlan';
  content: string;
  visibility: HintVisibility;
}

// Progress Tracking
export interface ProgressTracking {
  riskAssessment: {
    completed: boolean;
    timeSpent: number;
    lastUpdated: string;
  };
  riskManagementPlan: {
    completed: boolean;
    timeSpent: number;
    lastUpdated: string;
  };
}

// Version History
export interface Version {
  id: string;
  content: RiskManagementSubmission;
  versionNumber: number;
  createdAt: string;
}

// Risk Assessment Types
export interface RiskAssessment {
  personalRisk: {
    health: {
      currentCoverage: string;
      gaps: string;
      recommendations: string;
    };
    disability: {
      currentCoverage: string;
      gaps: string;
      recommendations: string;
    };
    lifeInsurance: {
      currentCoverage: string;
      gaps: string;
      recommendations: string;
    };
    longTermCare: {
      currentCoverage: string;
      gaps: string;
      recommendations: string;
    };
  };
  propertyRisk: {
    home: {
      currentCoverage: string;
      gaps: string;
      recommendations: string;
    };
    auto: {
      currentCoverage: string;
      gaps: string;
      recommendations: string;
    };
    otherProperty: {
      currentCoverage: string;
      gaps: string;
      recommendations: string;
    };
  };
  liabilityRisk: {
    personal: {
      currentCoverage: string;
      gaps: string;
      recommendations: string;
    };
    professional: {
      currentCoverage: string;
      gaps: string;
      recommendations: string;
    };
  };
}

// Risk Management Plan Types
export interface RiskManagementPlan {
  insuranceStrategy: {
    health: {
      recommendedCoverage: string;
      implementationPlan: string;
      costEstimate: number;
    };
    disability: {
      recommendedCoverage: string;
      implementationPlan: string;
      costEstimate: number;
    };
    lifeInsurance: {
      recommendedCoverage: string;
      implementationPlan: string;
      costEstimate: number;
    };
    longTermCare: {
      recommendedCoverage: string;
      implementationPlan: string;
      costEstimate: number;
    };
  };
  propertyProtection: {
    home: {
      recommendedCoverage: string;
      implementationPlan: string;
      costEstimate: number;
    };
    auto: {
      recommendedCoverage: string;
      implementationPlan: string;
      costEstimate: number;
    };
    otherProperty: {
      recommendedCoverage: string;
      implementationPlan: string;
      costEstimate: number;
    };
  };
  liabilityProtection: {
    personal: {
      recommendedCoverage: string;
      implementationPlan: string;
      costEstimate: number;
    };
    professional: {
      recommendedCoverage: string;
      implementationPlan: string;
      costEstimate: number;
    };
  };
  emergencyFund: {
    targetAmount: number;
    currentAmount: number;
    fundingPlan: string;
    timeline: string;
  };
}

// Risk Management Submission Types
export interface RiskManagementSubmission {
  riskAssessment: RiskAssessment;
  riskManagementPlan: RiskManagementPlan;
}

// Zod Schemas
export const riskAssessmentSchema = z.object({
  personalRisk: z.object({
    health: z.object({
      currentCoverage: z.string(),
      gaps: z.string(),
      recommendations: z.string(),
    }),
    disability: z.object({
      currentCoverage: z.string(),
      gaps: z.string(),
      recommendations: z.string(),
    }),
    lifeInsurance: z.object({
      currentCoverage: z.string(),
      gaps: z.string(),
      recommendations: z.string(),
    }),
    longTermCare: z.object({
      currentCoverage: z.string(),
      gaps: z.string(),
      recommendations: z.string(),
    }),
  }),
  propertyRisk: z.object({
    home: z.object({
      currentCoverage: z.string(),
      gaps: z.string(),
      recommendations: z.string(),
    }),
    auto: z.object({
      currentCoverage: z.string(),
      gaps: z.string(),
      recommendations: z.string(),
    }),
    otherProperty: z.object({
      currentCoverage: z.string(),
      gaps: z.string(),
      recommendations: z.string(),
    }),
  }),
  liabilityRisk: z.object({
    personal: z.object({
      currentCoverage: z.string(),
      gaps: z.string(),
      recommendations: z.string(),
    }),
    professional: z.object({
      currentCoverage: z.string(),
      gaps: z.string(),
      recommendations: z.string(),
    }),
  }),
});

export const riskManagementPlanSchema = z.object({
  insuranceStrategy: z.object({
    health: z.object({
      recommendedCoverage: z.string(),
      implementationPlan: z.string(),
      costEstimate: z.number(),
    }),
    disability: z.object({
      recommendedCoverage: z.string(),
      implementationPlan: z.string(),
      costEstimate: z.number(),
    }),
    lifeInsurance: z.object({
      recommendedCoverage: z.string(),
      implementationPlan: z.string(),
      costEstimate: z.number(),
    }),
    longTermCare: z.object({
      recommendedCoverage: z.string(),
      implementationPlan: z.string(),
      costEstimate: z.number(),
    }),
  }),
  propertyProtection: z.object({
    home: z.object({
      recommendedCoverage: z.string(),
      implementationPlan: z.string(),
      costEstimate: z.number(),
    }),
    auto: z.object({
      recommendedCoverage: z.string(),
      implementationPlan: z.string(),
      costEstimate: z.number(),
    }),
    otherProperty: z.object({
      recommendedCoverage: z.string(),
      implementationPlan: z.string(),
      costEstimate: z.number(),
    }),
  }),
  liabilityProtection: z.object({
    personal: z.object({
      recommendedCoverage: z.string(),
      implementationPlan: z.string(),
      costEstimate: z.number(),
    }),
    professional: z.object({
      recommendedCoverage: z.string(),
      implementationPlan: z.string(),
      costEstimate: z.number(),
    }),
  }),
  emergencyFund: z.object({
    targetAmount: z.number(),
    currentAmount: z.number(),
    fundingPlan: z.string(),
    timeline: z.string(),
  }),
});

export const riskManagementSubmissionSchema = z.object({
  riskAssessment: riskAssessmentSchema,
  riskManagementPlan: riskManagementPlanSchema,
});

// Database Types
export type Standard5Submission = BaseSubmission & {
  content: RiskManagementSubmission;
  teacherConfig: TeacherConfig;
  progress: ProgressTracking;
  status: AssessmentStatus;
  version: number;
};

export type Standard5Draft = BaseDraft & {
  content: RiskManagementSubmission;
  teacherConfig: TeacherConfig;
  progress: ProgressTracking;
  autoSaved: boolean;
  lastAutoSave: string;
};

export type Standard5Feedback = BaseFeedback & {
  content: {
    riskAssessment: string;
    riskManagementPlan: string;
  };
  teacherConfig: TeacherConfig;
};

export type Standard5Grade = BaseGrade & {
  rubric: {
    riskAssessment: number;
    riskManagementPlan: number;
  };
  teacherConfig: TeacherConfig;
};

// Validation Schema
export const standard5SubmissionSchema = z.object({
  content: riskManagementSubmissionSchema,
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
    riskAssessment: z.object({
      completed: z.boolean(),
      timeSpent: z.number().min(0),
      lastUpdated: z.string()
    }),
    riskManagementPlan: z.object({
      completed: z.boolean(),
      timeSpent: z.number().min(0),
      lastUpdated: z.string()
    })
  }),
  status: z.nativeEnum(AssessmentStatus),
  version: z.number().min(1)
}); 