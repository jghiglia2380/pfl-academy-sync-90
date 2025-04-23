import { z } from "zod";
import { baseSubmissionSchema } from "./capstone";

const riskSchema = z.object({
  type: z.string().min(1, "Risk type is required"),
  description: z.string().min(1, "Risk description is required"),
  impact: z.number().min(1).max(10, "Impact must be between 1 and 10"),
  probability: z.number().min(1).max(10, "Probability must be between 1 and 10"),
  mitigationStrategy: z.string().min(1, "Mitigation strategy is required"),
});

const insuranceCoverageSchema = z.object({
  type: z.string().min(1, "Insurance type is required"),
  provider: z.string().min(1, "Provider name is required"),
  coverage: z.number().positive("Coverage amount must be positive"),
  premium: z.number().positive("Premium must be positive"),
  deductible: z.number().nonnegative("Deductible must be non-negative"),
  justification: z.string().min(1, "Justification is required"),
});

const monthlyBudgetSchema = z.object({
  income: z.number().positive("Income must be positive"),
  expenses: z.number().positive("Expenses must be positive"),
  insuranceAllocation: z.number().positive("Insurance allocation must be positive"),
  calculations: z.string().min(1, "Calculations are required"),
});

const protectionStepSchema = z.object({
  action: z.string().min(1, "Action is required"),
  timeline: z.string().min(1, "Timeline is required"),
  cost: z.number().nonnegative("Cost must be non-negative"),
  expectedOutcome: z.string().min(1, "Expected outcome is required"),
  priority: z.enum(["high", "medium", "low"], {
    required_error: "Priority must be high, medium, or low",
  }),
});

const scenarioResponseSchema = z.object({
  riskAssessment: z.object({
    identifiedRisks: z.array(riskSchema).min(2, "At least 2 risks must be identified"),
  }),
  insuranceAnalysis: z.object({
    recommendedCoverage: z.array(insuranceCoverageSchema).min(1, "At least 1 insurance coverage must be recommended"),
    monthlyBudget: monthlyBudgetSchema,
  }),
  protectionPlan: z.object({
    steps: z.array(protectionStepSchema).min(3, "At least 3 protection steps are required"),
  }),
});

export const standard11Schema = baseSubmissionSchema.extend({
  scenario1_response: scenarioResponseSchema,
  scenario2_response: scenarioResponseSchema,
}); 