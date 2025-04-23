import { z } from 'zod';
import { AssessmentStatus } from './assessment';

// Probability Analysis Types
export interface ProbabilityAnalysis {
  gameType: string;
  outcomes: number;
  favorableOutcomes: number;
  probability: number;
  expectedValue: number;
  calculations: string;
}

// Risk Assessment Types
export interface RiskAssessment {
  riskType: string;
  description: string;
  impact: 'Low' | 'Medium' | 'High';
  probability: 'Low' | 'Medium' | 'High';
  mitigationStrategy: string;
}

// Responsible Gambling Plan Types
export interface ResponsibleGamblingPlan {
  budgetLimit: number;
  timeLimit: number;
  monitoringStrategy: string;
  supportResources: string[];
}

// Scenario Types
export interface Scenario1 {
  diceGame: ProbabilityAnalysis;
  coinFlipGame: ProbabilityAnalysis;
  numberGuessingGame: ProbabilityAnalysis;
  analysis: string;
}

export interface Scenario2 {
  lotteryType: string;
  ticketCost: number;
  prizeStructure: {
    amount: number;
    probability: number;
  }[];
  yearlySpending: number;
  alternativeUses: string[];
  analysis: string;
}

export interface Scenario3 {
  monthlyIncome: number;
  expenses: {
    category: string;
    amount: number;
  }[];
  savingsGoal: {
    description: string;
    amount: number;
    timeline: string;
  };
  gamblingBudget: number;
  analysis: string;
}

// Main Assessment Type
export interface Standard12Assessment {
  id: string;
  userId: string;
  status: AssessmentStatus;
  scenario1: Scenario1;
  scenario2: Scenario2;
  scenario3: Scenario3;
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  feedback?: string[];
  grade?: number;
}

// Zod Schema for Validation
export const probabilityAnalysisSchema = z.object({
  gameType: z.string().min(1, 'Game type is required'),
  outcomes: z.number().min(1, 'Number of outcomes must be at least 1'),
  favorableOutcomes: z.number().min(0, 'Favorable outcomes must be non-negative'),
  probability: z.number().min(0).max(1, 'Probability must be between 0 and 1'),
  expectedValue: z.number(),
  calculations: z.string().min(1, 'Calculations are required')
});

export const riskAssessmentSchema = z.object({
  riskType: z.string().min(1, 'Risk type is required'),
  description: z.string().min(1, 'Description is required'),
  impact: z.enum(['Low', 'Medium', 'High']),
  probability: z.enum(['Low', 'Medium', 'High']),
  mitigationStrategy: z.string().min(1, 'Mitigation strategy is required')
});

export const responsibleGamblingPlanSchema = z.object({
  budgetLimit: z.number().min(0, 'Budget limit must be non-negative'),
  timeLimit: z.number().min(0, 'Time limit must be non-negative'),
  monitoringStrategy: z.string().min(1, 'Monitoring strategy is required'),
  supportResources: z.array(z.string()).min(1, 'At least one support resource is required')
});

export const scenario1Schema = z.object({
  diceGame: probabilityAnalysisSchema,
  coinFlipGame: probabilityAnalysisSchema,
  numberGuessingGame: probabilityAnalysisSchema,
  analysis: z.string().min(1, 'Analysis is required')
});

export const scenario2Schema = z.object({
  lotteryType: z.string().min(1, 'Lottery type is required'),
  ticketCost: z.number().min(0, 'Ticket cost must be non-negative'),
  prizeStructure: z.array(z.object({
    amount: z.number().min(0, 'Prize amount must be non-negative'),
    probability: z.number().min(0).max(1, 'Probability must be between 0 and 1')
  })).min(1, 'At least one prize tier is required'),
  yearlySpending: z.number().min(0, 'Yearly spending must be non-negative'),
  alternativeUses: z.array(z.string()).min(1, 'At least one alternative use is required'),
  analysis: z.string().min(1, 'Analysis is required')
});

export const scenario3Schema = z.object({
  monthlyIncome: z.number().min(0, 'Monthly income must be non-negative'),
  expenses: z.array(z.object({
    category: z.string().min(1, 'Category is required'),
    amount: z.number().min(0, 'Amount must be non-negative')
  })).min(1, 'At least one expense is required'),
  savingsGoal: z.object({
    description: z.string().min(1, 'Description is required'),
    amount: z.number().min(0, 'Amount must be non-negative'),
    timeline: z.string().min(1, 'Timeline is required')
  }),
  gamblingBudget: z.number().min(0, 'Gambling budget must be non-negative'),
  analysis: z.string().min(1, 'Analysis is required')
});

export const standard12Schema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  status: z.enum(['draft', 'submitted', 'graded']),
  scenario1: scenario1Schema,
  scenario2: scenario2Schema,
  scenario3: scenario3Schema,
  createdAt: z.date(),
  updatedAt: z.date(),
  submittedAt: z.date().optional(),
  feedback: z.array(z.string()).optional(),
  grade: z.number().min(0).max(100).optional()
}); 