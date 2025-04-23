import { supabase } from './supabase';
import {
  ReportingConfig,
  LMSIntegration,
  ScheduledReport,
  ReportRun,
  ReportFilters,
  ReportType,
  ReportFormat,
  LMSStatus,
  IntegrationType,
  reportFiltersSchema,
  scheduledReportSchema
} from '../types/reporting';

// Reporting Configs
export const getReportingConfig = async (districtId: string, schoolId: string): Promise<ReportingConfig | null> => {
  const { data, error } = await supabase
    .from('reporting_configs')
    .select('*')
    .eq('district_id', districtId)
    .eq('school_id', schoolId)
    .single();

  if (error) throw error;
  return data;
};

export const updateReportingConfig = async (
  districtId: string,
  schoolId: string,
  config: Partial<ReportingConfig['config']>
): Promise<ReportingConfig> => {
  const { data, error } = await supabase
    .from('reporting_configs')
    .upsert({
      district_id: districtId,
      school_id: schoolId,
      config
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// LMS Integrations
export const getLMSIntegrations = async (districtId: string): Promise<LMSIntegration[]> => {
  const { data, error } = await supabase
    .from('lms_integrations')
    .select('*')
    .eq('district_id', districtId);

  if (error) throw error;
  return data;
};

export const updateLMSIntegration = async (
  id: string,
  updates: Partial<LMSIntegration>
): Promise<LMSIntegration> => {
  const { data, error } = await supabase
    .from('lms_integrations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const syncLMSIntegration = async (id: string): Promise<void> => {
  const { error } = await supabase.rpc('sync_lms_integration', { integration_id: id });
  if (error) throw error;
};

// Scheduled Reports
export const getScheduledReports = async (userId: string): Promise<ScheduledReport[]> => {
  const { data, error } = await supabase
    .from('scheduled_reports')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
};

export const createScheduledReport = async (
  report: Omit<ScheduledReport, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ScheduledReport> => {
  const validatedReport = scheduledReportSchema.parse(report);
  
  const { data, error } = await supabase
    .from('scheduled_reports')
    .insert(validatedReport)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateScheduledReport = async (
  id: string,
  updates: Partial<ScheduledReport>
): Promise<ScheduledReport> => {
  const { data, error } = await supabase
    .from('scheduled_reports')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteScheduledReport = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('scheduled_reports')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Report Runs
export const getReportRuns = async (userId: string): Promise<ReportRun[]> => {
  const { data, error } = await supabase
    .from('report_runs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const generateReport = async (
  reportType: ReportType,
  format: ReportFormat,
  filters: ReportFilters
): Promise<ReportRun> => {
  const validatedFilters = reportFiltersSchema.parse(filters);
  
  const { data, error } = await supabase
    .from('report_runs')
    .insert({
      report_type: reportType,
      format,
      filters: validatedFilters
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Real-time Subscriptions
export const subscribeToReportRuns = (
  userId: string,
  callback: (payload: any) => void
) => {
  return supabase
    .channel('report_runs')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'report_runs',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe();
};

export const subscribeToLMSIntegrations = (
  districtId: string,
  callback: (payload: any) => void
) => {
  return supabase
    .channel('lms_integrations')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'lms_integrations',
        filter: `district_id=eq.${districtId}`
      },
      callback
    )
    .subscribe();
};

// Report File Storage
export const getReportFile = async (reportId: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('reports')
    .createSignedUrl(`${reportId}.pdf`, 3600);
  
  if (error) throw error;
  return data.signedUrl;
};

export const uploadReportFile = async (
  reportId: string,
  file: File
): Promise<void> => {
  const { error } = await supabase.storage
    .from('reports')
    .upload(`${reportId}.pdf`, file, {
      cacheControl: '3600',
      upsert: true
    });
  
  if (error) throw error;
};

// Report Scheduling
export const scheduleReportJob = async (reportId: string): Promise<void> => {
  const { error } = await supabase.rpc('schedule_report_job', { report_id: reportId });
  if (error) throw error;
};

export const cancelScheduledReport = async (reportId: string): Promise<void> => {
  const { error } = await supabase.rpc('cancel_scheduled_report', { report_id: reportId });
  if (error) throw error;
};

// LMS Integration Webhooks
export const handleLMSWebhook = async (
  integrationId: string,
  payload: any
): Promise<void> => {
  const { error } = await supabase.rpc('handle_lms_webhook', {
    integration_id: integrationId,
    payload
  });
  
  if (error) throw error;
};

// Report Generation Queue
export const queueReportGeneration = async (
  reportType: ReportType,
  format: ReportFormat,
  filters: ReportFilters
): Promise<string> => {
  const { data, error } = await supabase.rpc('queue_report_generation', {
    report_type: reportType,
    format,
    filters
  });
  
  if (error) throw error;
  return data;
}; 