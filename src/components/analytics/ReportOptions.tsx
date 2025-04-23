import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Checkbox } from '../ui/Checkbox';

interface ReportOptionsProps {
  timeRange: number;
  pathway?: string | null;
}

export function ReportOptions({ timeRange, pathway }: ReportOptionsProps) {
  const reportTypes = [
    { id: 'progress', label: 'Progress Report' },
    { id: 'engagement', label: 'Engagement Report' },
    { id: 'completion', label: 'Completion Report' },
    { id: 'assessment', label: 'Assessment Report' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'csv', label: 'CSV' },
    { value: 'excel', label: 'Excel' }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Report</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              {reportTypes.map((type) => (
                <div key={type.id} className="flex items-center">
                  <Checkbox id={type.id} />
                  <label htmlFor={type.id} className="ml-2 text-sm text-gray-700">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <Select
              options={formatOptions}
              defaultValue="pdf"
              className="w-full"
            />
          </div>

          <div className="flex justify-end">
            <Button variant="primary">
              Generate Report
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Reports</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((report) => (
            <div key={report} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Progress Report - {new Date().toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
              </div>
              <Button variant="secondary" size="sm">
                Download
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 