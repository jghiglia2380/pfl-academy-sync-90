import React from 'react';
import { Card } from '../ui/Card';
import { 
  Activity, 
  Clock, 
  Users, 
  BookOpen,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

interface EngagementMetricsProps {
  timeRange: number;
  pathway?: string | null;
}

export function EngagementMetrics({ timeRange, pathway }: EngagementMetricsProps) {
  // Mock data - in a real implementation, this would come from an API
  const metrics = [
    {
      title: 'Active Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Average Time Spent',
      value: '45 min',
      change: '+8%',
      icon: Clock,
      color: 'text-green-500'
    },
    {
      title: 'Content Views',
      value: '8,765',
      change: '+15%',
      icon: BookOpen,
      color: 'text-purple-500'
    },
    {
      title: 'Interactions',
      value: '2,345',
      change: '+5%',
      icon: MessageSquare,
      color: 'text-yellow-500'
    },
    {
      title: 'Completion Rate',
      value: '78%',
      change: '+3%',
      icon: Activity,
      color: 'text-red-500'
    },
    {
      title: 'Overall Growth',
      value: '24%',
      change: '+4%',
      icon: TrendingUp,
      color: 'text-indigo-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{metric.title}</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                <span className="ml-2 text-sm font-medium text-green-500">
                  {metric.change}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-full bg-gray-50 ${metric.color}`}>
              <metric.icon className="w-6 h-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 