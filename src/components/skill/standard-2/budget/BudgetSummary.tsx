import React from 'react';
import { calculateTotal, calculateCategoryTotal, formatPercentage } from './utils/budgetCalculations';

interface BudgetSummaryProps {
  data: any[];
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ data }) => {
  const total = calculateTotal(data);
  const categories: ('Needs' | 'Wants' | 'Savings')[] = ['Needs', 'Wants', 'Savings'];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {categories.map((category) => {
        const categoryTotal = calculateCategoryTotal(data, category);
        const percentage = formatPercentage(categoryTotal, total);
        const getColorClass = (cat: string) => {
          switch (cat) {
            case 'Needs': return 'bg-blue-100 border-blue-500';
            case 'Wants': return 'bg-orange-100 border-orange-500';
            case 'Savings': return 'bg-green-100 border-green-500';
            default: return '';
          }
        };

        return (
          <div
            key={category}
            className={`p-4 rounded-lg border-l-4 ${getColorClass(category)}`}
          >
            <h3 className="text-lg font-semibold mb-2">{category}</h3>
            <p className="text-2xl font-bold">${categoryTotal.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{percentage} of total</p>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetSummary;