import React, { useState, useEffect } from 'react';
import { useReporting, useLMSIntegrations, useScheduledReports } from '../../hooks/useReporting';
import { ReportType, ReportFormat, LMSStatus } from '../../types/reporting';
import {
  Card,
  Button,
  Select,
  Checkbox,
  Tabs,
  Tab,
  Progress,
  Alert,
  Spinner
} from '../ui';
import { LineChart, BarChart, PieChart } from '../charts';
import { LMSIntegrationCard } from './LMSIntegrationCard';
import { ReportOptions } from './ReportOptions';
import { ProgressOverview } from './ProgressOverview';

export const ReportingAnalytics: React.FC = () => {
  const { data, loading, error, refresh, updateFilters } = useReporting();
  const { integrations, loading: integrationsLoading, updateIntegration, syncIntegration } = useLMSIntegrations();
  const { reports, loading: reportsLoading, createReport, updateReport, deleteReport } = useScheduledReports();

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('current_semester');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  useEffect(() => {
    if (data?.config?.defaultFilters) {
      updateFilters(data.config.defaultFilters);
    }
  }, [data?.config, updateFilters]);

  if (loading || integrationsLoading || reportsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert type="error" title="Error">
        {error.message}
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reporting & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track student performance, identify trends, and make data-driven decisions.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon="download">
            Export
          </Button>
          <Button variant="primary" icon="calendar">
            Schedule Reports
          </Button>
        </div>
      </div>

      {/* LMS Integration Status */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">LMS Integration Status</h2>
          <Button variant="link" icon="cog">
            Configure Integrations
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {integrations.map(integration => (
            <LMSIntegrationCard
              key={integration.id}
              integration={integration}
              onUpdate={updateIntegration}
              onSync={syncIntegration}
            />
          ))}
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Period
            </label>
            <Select
              value={selectedTimeRange}
              onChange={setSelectedTimeRange}
              options={[
                { value: 'current_semester', label: 'Current Semester' },
                { value: 'last_semester', label: 'Previous Semester' },
                { value: 'last_30_days', label: 'Last 30 Days' },
                { value: 'custom', label: 'Custom Range' }
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District/School
            </label>
            <Select
              value={selectedDistrict}
              onChange={setSelectedDistrict}
              options={[
                { value: 'all', label: 'All Schools' },
                { value: 'okc', label: 'Oklahoma City Public Schools' },
                { value: 'tulsa', label: 'Tulsa Public Schools' },
                { value: 'edmond', label: 'Edmond Public Schools' }
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Curriculum Platform
            </label>
            <Select
              value={selectedPlatform}
              onChange={setSelectedPlatform}
              options={[
                { value: 'all', label: 'All Platforms' },
                { value: 'sync90', label: 'Synchronous 90-Hour' },
                { value: 'async45', label: 'Asynchronous 45-Hour' },
                { value: 'async30', label: 'Asynchronous 30-Hour' }
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Period
            </label>
            <Select
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              options={[
                { value: 'all', label: 'All Periods' },
                { value: '1', label: 'Period 1' },
                { value: '2', label: 'Period 2' },
                { value: '3', label: 'Period 3' }
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tab value="overview" label="Overview" />
        <Tab value="progress" label="Progress" />
        <Tab value="engagement" label="Engagement" />
        <Tab value="reports" label="Reports" />
      </Tabs>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <ProgressOverview
              timeRange={selectedTimeRange}
              district={selectedDistrict}
              platform={selectedPlatform}
              period={selectedPeriod}
            />
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Pathway Comparison
              </h3>
              <div className="h-80">
                <LineChart
                  data={data?.metrics?.pathwayComparison || []}
                  xField="date"
                  yField="value"
                  seriesField="pathway"
                />
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Progress Over Time
              </h3>
              <div className="h-80">
                <BarChart
                  data={data?.metrics?.progressOverTime || []}
                  xField="date"
                  yField="value"
                />
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'engagement' && (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Engagement Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-80">
                  <PieChart
                    data={data?.metrics?.engagementByActivity || []}
                    angleField="value"
                    colorField="type"
                  />
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'reports' && (
          <ReportOptions
            reports={reports}
            onCreate={createReport}
            onUpdate={updateReport}
            onDelete={deleteReport}
          />
        )}
      </div>
    </div>
  );
}; 