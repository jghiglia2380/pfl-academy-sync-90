import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';
import { ReportType, ReportFormat, ScheduledReport } from '../../types/reporting';

interface ReportOptionsProps {
  reports: ScheduledReport[];
  onCreate: (report: Omit<ScheduledReport, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onUpdate: (id: string, updates: Partial<ScheduledReport>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const ReportOptions: React.FC<ReportOptionsProps> = ({
  reports,
  onCreate,
  onUpdate,
  onDelete
}) => {
  const [selectedType, setSelectedType] = useState<ReportType>(ReportType.PROGRESS);
  const [selectedFormat, setSelectedFormat] = useState<ReportFormat>(ReportFormat.PDF);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);

  const handleGenerateReport = async () => {
    try {
      await onCreate({
        reportType: selectedType,
        format: selectedFormat,
        schedule: {
          frequency: 'daily',
          time: '09:00'
        },
        filters: {
          timeRange: {
            start: new Date(),
            end: new Date()
          }
        }
      });
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  const handleScheduleReport = async () => {
    try {
      await onCreate({
        reportType: selectedType,
        format: selectedFormat,
        schedule: {
          frequency: 'daily',
          time: '09:00'
        },
        filters: {
          timeRange: {
            start: new Date(),
            end: new Date()
          }
        }
      });
    } catch (error) {
      console.error('Failed to schedule report:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Generate Report Section */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Generate Report
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <Select
                value={selectedType}
                onChange={setSelectedType}
                options={[
                  { value: ReportType.PROGRESS, label: 'Progress Report' },
                  { value: ReportType.ENGAGEMENT, label: 'Engagement Report' },
                  { value: ReportType.COMPLETION, label: 'Completion Report' },
                  { value: ReportType.ASSESSMENT, label: 'Assessment Report' }
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <Select
                value={selectedFormat}
                onChange={setSelectedFormat}
                options={[
                  { value: ReportFormat.PDF, label: 'PDF' },
                  { value: ReportFormat.CSV, label: 'CSV' },
                  { value: ReportFormat.EXCEL, label: 'Excel' }
                ]}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Checkbox
              checked={includeCharts}
              onChange={setIncludeCharts}
              label="Include charts and graphs"
            />
            <Checkbox
              checked={scheduleEnabled}
              onChange={setScheduleEnabled}
              label="Schedule this report"
            />
          </div>
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={scheduleEnabled ? handleScheduleReport : handleGenerateReport}
            >
              {scheduleEnabled ? 'Schedule Report' : 'Generate Report'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Reports Section */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Recent Reports
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Format
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map(report => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {report.reportType}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {report.format.toUpperCase()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {report.filters ? 'Custom' : 'Default'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Handle download
                        }}
                      >
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Handle delete
                          onDelete(report.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}; 