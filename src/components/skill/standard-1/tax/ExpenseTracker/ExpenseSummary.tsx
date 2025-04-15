import React from 'react';
import { ExpenseSummary as ExpenseSummaryType } from '../../types/expense';

interface ExpenseSummaryProps {
  summary: ExpenseSummaryType;
  title: string;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ summary, title }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold">${summary.total.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">Needs</p>
          <p className="text-2xl font-bold text-blue-600">
            ${summary.needsTotal.toLocaleString()}
          </p>
          <p className="text-sm text-blue-600">{summary.needsPercentage.toFixed(1)}%</p>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg">
          <p className="text-sm text-orange-600">Wants</p>
          <p className="text-2xl font-bold text-orange-600">
            ${summary.wantsTotal.toLocaleString()}
          </p>
          <p className="text-sm text-orange-600">{summary.wantsPercentage.toFixed(1)}%</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600">Savings</p>
          <p className="text-2xl font-bold text-green-600">
            ${summary.savingsTotal.toLocaleString()}
          </p>
          <p className="text-sm text-green-600">{summary.savingsPercentage.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;