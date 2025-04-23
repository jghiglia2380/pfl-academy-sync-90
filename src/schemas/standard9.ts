import { z } from 'zod';

export const standard9Schema = z.object({
  studentId: z.string(),
  status: z.enum(['draft', 'submitted']),
  investmentAnalysis: z.object({
    cryptoScenario: z.object({
      redFlagsAnalysis: z.string()
        .min(50, 'Red flags analysis must be at least 50 characters')
        .max(1000, 'Red flags analysis must not exceed 1000 characters'),
      potentialLosses: z.string()
        .min(50, 'Loss calculation must be at least 50 characters')
        .max(1000, 'Loss calculation must not exceed 1000 characters'),
      evaluationFramework: z.string()
        .min(50, 'Evaluation framework must be at least 50 characters')
        .max(1000, 'Evaluation framework must not exceed 1000 characters')
    }),
    phishingScenario: z.object({
      redFlagsAnalysis: z.string()
        .min(50, 'Red flags analysis must be at least 50 characters')
        .max(1000, 'Red flags analysis must not exceed 1000 characters'),
      psychologicalTriggers: z.string()
        .min(50, 'Psychological triggers analysis must be at least 50 characters')
        .max(1000, 'Psychological triggers analysis must not exceed 1000 characters'),
      verificationSteps: z.string()
        .min(50, 'Verification steps must be at least 50 characters')
        .max(1000, 'Verification steps must not exceed 1000 characters')
    }),
    dataBreachScenario: z.object({
      immediateActions: z.string()
        .min(50, 'Immediate actions must be at least 50 characters')
        .max(1000, 'Immediate actions must not exceed 1000 characters'),
      monitoringPlan: z.string()
        .min(50, '90-day monitoring plan must be at least 50 characters')
        .max(1000, '90-day monitoring plan must not exceed 1000 characters'),
      documentationTemplate: z.string()
        .min(50, 'Documentation template must be at least 50 characters')
        .max(1000, 'Documentation template must not exceed 1000 characters')
    })
  })
}); 