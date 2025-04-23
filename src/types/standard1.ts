import { z } from 'zod';

export enum ScaffoldingLevel {
  Clean = 'clean',
  Guided = 'guided',
  Complete = 'complete'
}

export interface TeacherConfig {
  scaffoldingLevel: ScaffoldingLevel;
  hints: {
    financialGoals: boolean;
    budgetAnalysis: boolean;
    recommendations: boolean;
  };
  sampleAnswers: {
    financialGoals: boolean;
    budgetAnalysis: boolean;
    recommendations: boolean;
  };
}

export interface Hint {
  id: string;
  section: 'financialGoals' | 'budgetAnalysis' | 'recommendations';
  content: string;
  visibility: boolean;
}

export interface SampleAnswer {
  id: string;
  section: 'financialGoals' | 'budgetAnalysis' | 'recommendations';
  content: string;
  visibility: boolean;
}

export interface ProgressTracking {
  financialGoals: {
    completed: boolean;
    timeSpent: number;
    lastUpdated: string;
  };
  budgetAnalysis: {
    completed: boolean;
    timeSpent: number;
    lastUpdated: string;
  };
  recommendations: {
    completed: boolean;
    timeSpent: number;
    lastUpdated: string;
  };
}

export interface Standard1Submission {
  id: string;
  studentId: string;
  content: {
    financialGoals: {
      shortTerm: string[];
      mediumTerm: string[];
      longTerm: string[];
    };
    budgetAnalysis: {
      income: {
        salary: number;
        other: number;
      };
      expenses: {
        fixed: number;
        variable: number;
      };
      savings: number;
    };
    recommendations: {
      shortTerm: string;
      mediumTerm: string;
      longTerm: string;
    };
  };
  submittedAt: string;
  previousSubmissionId?: string;
  versionHistory: {
    id: string;
    content: Standard1Submission['content'];
    savedAt: string;
  }[];
  progress: ProgressTracking;
}

export interface Standard1Draft {
  id: string;
  studentId: string;
  content: Standard1Submission['content'];
  lastUpdated: string;
  autoSaveStatus: {
    lastSaved: string;
    isSaving: boolean;
    error?: string;
  };
}

export interface Standard1Feedback {
  id: string;
  submissionId: string;
  instructorId: string;
  content: {
    financialGoals: string;
    budgetAnalysis: string;
    recommendations: string;
  };
  createdAt: string;
  updatedAt: string;
  scaffoldingLevel: ScaffoldingLevel;
}

export interface Standard1Grade {
  id: string;
  submissionId: string;
  instructorId: string;
  score: number;
  rubricScores: {
    financialGoals: number;
    budgetAnalysis: number;
    recommendations: number;
  };
  gradedAt: string;
  teacherConfig: TeacherConfig;
}

export const standard1SubmissionSchema = z.object({
  content: z.object({
    financialGoals: z.object({
      shortTerm: z.array(z.string()),
      mediumTerm: z.array(z.string()),
      longTerm: z.array(z.string()),
    }),
    budgetAnalysis: z.object({
      income: z.object({
        salary: z.number(),
        other: z.number(),
      }),
      expenses: z.object({
        fixed: z.number(),
        variable: z.number(),
      }),
      savings: z.number(),
    }),
    recommendations: z.object({
      shortTerm: z.string(),
      mediumTerm: z.string(),
      longTerm: z.string(),
    }),
  }),
  progress: z.object({
    financialGoals: z.object({
      completed: z.boolean(),
      timeSpent: z.number(),
      lastUpdated: z.string(),
    }),
    budgetAnalysis: z.object({
      completed: z.boolean(),
      timeSpent: z.number(),
      lastUpdated: z.string(),
    }),
    recommendations: z.object({
      completed: z.boolean(),
      timeSpent: z.number(),
      lastUpdated: z.string(),
    }),
  }),
}); 