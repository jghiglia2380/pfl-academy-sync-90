import { z } from 'zod';
import { AssessmentStatus, ScaffoldingLevel } from '@/types/standard15';

const financialAnalysisItemSchema = z.object({
  expenseCategory: z.string().min(1, 'Expense category is required'),
  annualCost: z.number().min(0, 'Annual cost must be positive'),
  fourYearTotal: z.number().min(0, 'Total cost must be positive'),
  notes: z.string().optional(),
});

const startupCostItemSchema = z.object({
  resourceTool: z.string().min(1, 'Resource/tool name is required'),
  initialCost: z.number().min(0, 'Initial cost must be positive'),
  monthlyCost: z.number().min(0, 'Monthly cost must be positive'),
  purpose: z.string().min(1, 'Purpose is required'),
});

const valuePropositionElementSchema = z.object({
  element: z.string().min(1, 'Element name is required'),
  currentStrength: z.string().min(1, 'Current strength is required'),
  developmentNeed: z.string().min(1, 'Development need is required'),
  actionSteps: z.string().min(1, 'Action steps are required'),
});

const brandElementSchema = z.object({
  element: z.string().min(1, 'Element name is required'),
  description: z.string().min(1, 'Description is required'),
  examples: z.string().min(1, 'Examples are required'),
  application: z.string().min(1, 'Application is required'),
});

const careerProgressionItemSchema = z.object({
  timeline: z.string().min(1, 'Timeline is required'),
  education: z.string().min(1, 'Education/certification is required'),
  experience: z.string().min(1, 'Experience is required'),
  incomePotential: z.string().min(1, 'Income potential is required'),
});

export const standard15Schema = z.object({
  id: z.string().optional(),
  studentId: z.string().optional(),
  status: z.nativeEnum(AssessmentStatus),
  financialAnalysis: z.array(
    z.union([financialAnalysisItemSchema, startupCostItemSchema])
  ).min(1, 'At least one financial analysis item is required'),
  brandStrategy: z.array(
    z.union([valuePropositionElementSchema, brandElementSchema])
  ).min(1, 'At least one brand strategy item is required'),
  careerProgression: z.array(careerProgressionItemSchema)
    .min(1, 'At least one career progression item is required'),
  feedback: z.string().optional(),
  grade: z.number().min(0).max(100).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  submittedAt: z.string().nullable().optional(),
  gradedAt: z.string().nullable().optional(),
  gradedBy: z.string().nullable().optional(),
  version: z.number().optional(),
  lastSaved: z.string().nullable().optional(),
});

export const teacherConfigSchema = z.object({
  scaffoldingLevel: z.nativeEnum(ScaffoldingLevel),
  showHints: z.boolean(),
  showExamples: z.boolean(),
  hints: z.record(z.array(z.string())).optional(),
  sampleAnswers: z.record(z.array(z.string())).optional(),
});

export type Standard15SchemaType = z.infer<typeof standard15Schema>;
export type TeacherConfigSchemaType = z.infer<typeof teacherConfigSchema>; 