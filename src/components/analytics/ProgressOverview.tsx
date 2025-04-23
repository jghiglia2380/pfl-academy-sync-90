import React from 'react';
import { Card } from '../ui/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ProgressOverviewProps {
  timeRange: number;
  pathway?: string | null;
}

export function ProgressOverview({ timeRange, pathway }: ProgressOverviewProps) {
  // Mock data - in a real implementation, this would come from an API
  const progressData = [
    { name: 'Week 1', value: 65 },
    { name: 'Week 2', value: 78 },
    { name: 'Week 3', value: 82 },
    { name: 'Week 4', value: 90 },
    { name: 'Week 5', value: 85 },
    { name: 'Week 6', value: 88 }
  ];

  const completionStats = [
    { label: 'Completed', value: '78%', color: 'bg-green-500' },
    { label: 'In Progress', value: '15%', color: 'bg-yellow-500' },
    { label: 'Not Started', value: '7%', color: 'bg-gray-300' }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Progress Over Time</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Completion Status</h3>
        <div className="grid grid-cols-3 gap-4">
          {completionStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`h-2 w-full ${stat.color} rounded-full mb-2`} />
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 