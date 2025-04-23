import { z } from 'zod';

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
    spendingAnalysis: HintVisibility;
    savingsPlan: HintVisibility;
    recommendations: HintVisibility;
  };
  sampleAnswers: {
    spendingAnalysis: boolean;
    savingsPlan: boolean;
    recommendations: boolean;
  };
}

export interface Hint {
  id: string;
  section: 'spendingAnalysis' | 'savingsPlan' | 'recommendations';
  content: string;
  order: number;
  visibility: HintVisibility;
}

export interface SampleAnswer {
  id: string;
  section: 'spendingAnalysis' | 'savingsPlan' | 'recommendations';
  content: string;
  isVisible: boolean;
}

export interface ProgressTracking {
  spendingAnalysis: {
    isComplete: boolean;
    timeSpent: number;
    lastUpdated: string;
  };
  savingsPlan: {
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

export interface Standard2Submission {
  id: string;
  studentId: string;
  content: {
    spendingAnalysis: {
      categories: {
        name: string;
        amount: number;
        percentage: number;
      }[];
      total: number;
    };
    savingsPlan: {
      currentSavings: number;
      monthlyContribution: number;
      targetAmount: number;
      timeline: number;
    };
    recommendations: {
      spending: string;
      savings: string;
      implementation: string;
    };
  };
  submittedAt: string;
  previousSubmissionId?: string;
  teacherConfig?: TeacherConfig;
  progress: ProgressTracking;
  version: number;
}

export interface Standard2Draft {
  id: string;
  studentId: string;
  content: Standard2Submission['content'];
  lastUpdated: string;
  progress: ProgressTracking;
  version: number;
}

export interface Standard2Feedback {
  id: string;
  submissionId: string;
  instructorId: string;
  content: {
    spendingAnalysis: string;
    savingsPlan: string;
    recommendations: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Standard2Grade {
  id: string;
  submissionId: string;
  instructorId: string;
  score: number;
  rubricScores: {
    spendingAnalysis: number;
    savingsPlan: number;
    recommendations: number;
  };
  gradedAt: string;
}

export interface Version {
  id: string;
  submissionId: string;
  content: Standard2Submission['content'];
  createdAt: string;
  versionNumber: number;
}

export const standard2SubmissionSchema = z.object({
  content: z.object({
    spendingAnalysis: z.object({
      categories: z.array(z.object({
        name: z.string(),
        amount: z.number(),
        percentage: z.number(),
      })),
      total: z.number(),
    }),
    savingsPlan: z.object({
      currentSavings: z.number(),
      monthlyContribution: z.number(),
      targetAmount: z.number(),
      timeline: z.number(),
    }),
    recommendations: z.object({
      spending: z.string(),
      savings: z.string(),
      implementation: z.string(),
    }),
  }),
  progress: z.object({
    spendingAnalysis: z.object({
      isComplete: z.boolean(),
      timeSpent: z.number(),
      lastUpdated: z.string(),
    }),
    savingsPlan: z.object({
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