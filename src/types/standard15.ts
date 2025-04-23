export enum AssessmentStatus {
  Draft = 'draft',
  Submitted = 'submitted',
  Graded = 'graded',
}

export enum ScaffoldingLevel {
  Clean = 'clean',
  Guided = 'guided',
  Complete = 'complete',
}

export interface FinancialAnalysisItem {
  expenseCategory?: string;
  annualCost?: number;
  fourYearTotal?: number;
  notes?: string;
}

export interface StartupCostItem {
  resourceTool?: string;
  initialCost?: number;
  monthlyCost?: number;
  purpose?: string;
}

export interface ValuePropositionElement {
  element?: string;
  currentStrength?: string;
  developmentNeed?: string;
  actionSteps?: string;
}

export interface BrandElement {
  element?: string;
  description?: string;
  examples?: string;
  application?: string;
}

export interface CareerProgressionItem {
  timeline?: string;
  education?: string;
  experience?: string;
  incomePotential?: string;
}

export interface TeacherConfig {
  scaffoldingLevel: ScaffoldingLevel;
  showHints: boolean;
  showExamples: boolean;
  hints?: {
    [section: string]: string[];
  };
  sampleAnswers?: {
    [section: string]: string[];
  };
}

export interface Standard15Assessment {
  id?: string;
  studentId?: string;
  status: AssessmentStatus;
  financialAnalysis: (FinancialAnalysisItem | StartupCostItem)[];
  brandStrategy: (ValuePropositionElement | BrandElement)[];
  careerProgression: CareerProgressionItem[];
  feedback?: string;
  grade?: number;
  createdAt?: string;
  updatedAt?: string;
  submittedAt?: string | null;
  gradedAt?: string | null;
  gradedBy?: string | null;
  version?: number;
  lastSaved?: string | null;
}

export interface Standard15Hint {
  id: string;
  teacherId: string;
  section: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Standard15SampleAnswer {
  id: string;
  teacherId: string;
  section: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Standard15Scaffolding {
  id: string;
  teacherId: string;
  classId: string;
  studentId?: string;
  scaffoldingLevel: ScaffoldingLevel;
  showHints: boolean;
  showExamples: boolean;
  createdAt: string;
  updatedAt: string;
} 