import { z } from 'zod';

// Enums
export enum ReportType {
  PROGRESS = 'progress',
  ENGAGEMENT = 'engagement',
  COMPLETION = 'completion',
  ASSESSMENT = 'assessment'
}

export enum ReportFormat {
  PDF = 'pdf',
  CSV = 'csv',
  EXCEL = 'excel'
}

export enum LMSStatus {
  CONNECTED = 'connected',
  PARTIAL = 'partial',
  NOT_CONFIGURED = 'not_configured',
  ERROR = 'error'
}

export enum IntegrationType {
  CANVAS = 'canvas',
  GOOGLE_CLASSROOM = 'google_classroom',
  CLEVER = 'clever',
  POWERSCHOOL = 'powerschool'
}

// Interfaces
export interface ReportingConfig {
  id: string;
  districtId: string;
  schoolId: string;
  config: {
    defaultTimeRange: string;
    defaultFilters: ReportFilters;
    notificationSettings: {
      email: boolean;
      inApp: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface LMSIntegration {
  id: string;
  districtId: string;
  schoolId: string;
  type: IntegrationType;
  status: LMSStatus;
  lastSync: Date | null;
  syncCount: number;
  errorMessage: string | null;
  config: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduledReport {
  id: string;
  districtId: string;
  schoolId: string;
  userId: string;
  reportType: ReportType;
  format: ReportFormat;
  schedule: {
    frequency: 'daily' | 'weekly' | 'monthly';
    dayOfWeek?: number;
    dayOfMonth?: number;
    time: string;
  };
  filters: ReportFilters;
  lastRun: Date | null;
  nextRun: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportRun {
  id: string;
  scheduledReportId: string;
  userId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  filters: ReportFilters;
  resultUrl: string | null;
  errorMessage: string | null;
  createdAt: Date;
  completedAt: Date | null;
}

export interface ReportFilters {
  timeRange: {
    start: Date;
    end: Date;
  };
  districtId?: string;
  schoolId?: string;
  curriculumPlatform?: string;
  classPeriod?: string;
  gradeLevel?: string;
  standardId?: string;
}

// Validation Schemas
export const reportFiltersSchema = z.object({
  timeRange: z.object({
    start: z.date(),
    end: z.date()
  }),
  districtId: z.string().optional(),
  schoolId: z.string().optional(),
  curriculumPlatform: z.string().optional(),
  classPeriod: z.string().optional(),
  gradeLevel: z.string().optional(),
  standardId: z.string().optional()
});

export const scheduledReportSchema = z.object({
  reportType: z.nativeEnum(ReportType),
  format: z.nativeEnum(ReportFormat),
  schedule: z.object({
    frequency: z.enum(['daily', 'weekly', 'monthly']),
    dayOfWeek: z.number().optional(),
    dayOfMonth: z.number().optional(),
    time: z.string()
  }),
  filters: reportFiltersSchema
});

// API Response Types
export interface ReportData {
  metrics: {
    totalStudents: number;
    activeStudents: number;
    completionRate: number;
    averageScore: number;
  };
  trends: {
    daily: Array<{
      date: string;
      value: number;
    }>;
    weekly: Array<{
      week: string;
      value: number;
    }>;
    monthly: Array<{
      month: string;
      value: number;
    }>;
  };
  breakdowns: {
    byGrade: Array<{
      grade: string;
      count: number;
    }>;
    bySchool: Array<{
      school: string;
      count: number;
    }>;
    byStandard: Array<{
      standard: string;
      count: number;
    }>;
  };
}

// Hook Types
export interface UseReportingOptions {
  timeRange?: {
    start: Date;
    end: Date;
  };
  filters?: Partial<ReportFilters>;
  refreshInterval?: number;
}

export interface UseReportingResult {
  data: ReportData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  updateFilters: (filters: Partial<ReportFilters>) => void;
} 