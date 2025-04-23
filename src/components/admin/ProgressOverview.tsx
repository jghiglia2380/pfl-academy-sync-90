import React from 'react';
import { Card } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { LineChart } from '../charts/LineChart';

interface ProgressOverviewProps {
  timeRange: string;
  district: string;
  platform: string;
  period: string;
  data: {
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
    };
  };
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  timeRange,
  district,
  platform,
  period,
  data
}) => {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <h4 className="text-sm font-medium text-gray-500">Total Students</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {data.metrics.totalStudents}
          </p>
        </Card>
        <Card>
          <h4 className="text-sm font-medium text-gray-500">Active Students</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {data.metrics.activeStudents}
          </p>
          <Progress
            value={(data.metrics.activeStudents / data.metrics.totalStudents) * 100}
            className="mt-2"
          />
        </Card>
        <Card>
          <h4 className="text-sm font-medium text-gray-500">Completion Rate</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {data.metrics.completionRate}%
          </p>
          <Progress
            value={data.metrics.completionRate}
            className="mt-2"
          />
        </Card>
        <Card>
          <h4 className="text-sm font-medium text-gray-500">Average Score</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {data.metrics.averageScore}%
          </p>
          <Progress
            value={data.metrics.averageScore}
            className="mt-2"
          />
        </Card>
      </div>

      {/* Progress Trend */}
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Progress Trend
        </h3>
        <LineChart
          data={data.trends.daily}
          xField="date"
          yField="value"
          height={300}
        />
      </Card>
    </div>
  );
}; 