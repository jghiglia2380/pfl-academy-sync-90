import { useState, useEffect, useCallback } from 'react';
import {
  getReportingConfig,
  updateReportingConfig,
  getLMSIntegrations,
  updateLMSIntegration,
  syncLMSIntegration,
  getScheduledReports,
  createScheduledReport,
  updateScheduledReport,
  deleteScheduledReport,
  getReportRuns,
  generateReport,
  subscribeToReportRuns,
  subscribeToLMSIntegrations
} from '../services/reporting';
import {
  ReportingConfig,
  LMSIntegration,
  ScheduledReport,
  ReportRun,
  ReportFilters,
  ReportType,
  ReportFormat,
  UseReportingOptions,
  UseReportingResult
} from '../types/reporting';
import { useAuth } from './useAuth';
import { useDistrict } from './useDistrict';

export const useReporting = (options: UseReportingOptions = {}): UseReportingResult => {
  const { user } = useAuth();
  const { district } = useDistrict();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!user || !district) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch reporting config
      const config = await getReportingConfig(district.id, user.schoolId);

      // Fetch LMS integrations
      const integrations = await getLMSIntegrations(district.id);

      // Fetch scheduled reports
      const reports = await getScheduledReports(user.id);

      // Fetch report runs
      const runs = await getReportRuns(user.id);

      setData({
        config,
        integrations,
        reports,
        runs
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, [user, district]);

  useEffect(() => {
    fetchData();

    // Set up real-time subscriptions
    const reportRunsSubscription = user && subscribeToReportRuns(user.id, () => {
      fetchData();
    });

    const lmsIntegrationsSubscription = district && subscribeToLMSIntegrations(district.id, () => {
      fetchData();
    });

    return () => {
      reportRunsSubscription?.unsubscribe();
      lmsIntegrationsSubscription?.unsubscribe();
    };
  }, [fetchData, user, district]);

  const updateFilters = useCallback(async (filters: Partial<ReportFilters>) => {
    if (!user || !district) return;

    try {
      await updateReportingConfig(district.id, user.schoolId, {
        defaultFilters: filters
      });
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update filters'));
    }
  }, [user, district, fetchData]);

  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh,
    updateFilters
  };
};

export const useLMSIntegrations = () => {
  const { user } = useAuth();
  const { district } = useDistrict();
  const [integrations, setIntegrations] = useState<LMSIntegration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchIntegrations = useCallback(async () => {
    if (!district) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getLMSIntegrations(district.id);
      setIntegrations(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch LMS integrations'));
    } finally {
      setLoading(false);
    }
  }, [district]);

  useEffect(() => {
    fetchIntegrations();

    const subscription = district && subscribeToLMSIntegrations(district.id, () => {
      fetchIntegrations();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [fetchIntegrations, district]);

  const updateIntegration = useCallback(async (id: string, updates: Partial<LMSIntegration>) => {
    try {
      const updated = await updateLMSIntegration(id, updates);
      setIntegrations(prev => prev.map(i => i.id === id ? updated : i));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update integration'));
    }
  }, []);

  const syncIntegration = useCallback(async (id: string) => {
    try {
      await syncLMSIntegration(id);
      await fetchIntegrations();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to sync integration'));
    }
  }, [fetchIntegrations]);

  return {
    integrations,
    loading,
    error,
    updateIntegration,
    syncIntegration
  };
};

export const useScheduledReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<ScheduledReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReports = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getScheduledReports(user.id);
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch scheduled reports'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchReports();

    const subscription = user && subscribeToReportRuns(user.id, () => {
      fetchReports();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [fetchReports, user]);

  const createReport = useCallback(async (report: Omit<ScheduledReport, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newReport = await createScheduledReport(report);
      setReports(prev => [...prev, newReport]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create scheduled report'));
    }
  }, []);

  const updateReport = useCallback(async (id: string, updates: Partial<ScheduledReport>) => {
    try {
      const updated = await updateScheduledReport(id, updates);
      setReports(prev => prev.map(r => r.id === id ? updated : r));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update scheduled report'));
    }
  }, []);

  const deleteReport = useCallback(async (id: string) => {
    try {
      await deleteScheduledReport(id);
      setReports(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete scheduled report'));
    }
  }, []);

  return {
    reports,
    loading,
    error,
    createReport,
    updateReport,
    deleteReport
  };
}; 