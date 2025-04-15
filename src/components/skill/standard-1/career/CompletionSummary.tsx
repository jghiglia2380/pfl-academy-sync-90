import React from 'react';
import { CheckCircle } from 'lucide-react';

interface CompletionSummaryProps {
  goals: Record<string, Record<string, string>>;
  timeFrames: { id: string; label: string }[];
  categories: { id: string; label: string }[];
  onRestart: () => void;
}

export function CompletionSummary({
  goals,
  timeFrames,
  categories,
  onRestart,
}: CompletionSummaryProps) {
  console.log(goals);
  console.log(timeFrames);
  console.log(categories);
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900">
          Career Path Plan Complete!
        </h3>
        <p className="text-gray-600 mt-2">
          Here's your personalized career development plan:
        </p>
      </div>

      <div className="space-y-8">
        {timeFrames.map((timeFrame) => (
          <div key={timeFrame.id} className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {timeFrame.label}
            </h4>
            <dl className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex">
                  <dt className="w-1/3 font-medium text-gray-700">
                    {category.label}:
                  </dt>
                  <dd className="w-2/3 text-gray-900">
                    {goals[timeFrame.id]?.[category.id] || 'No goal selected'}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Create Another Career Path Plan
        </button>
      </div>
    </div>
  );
}
