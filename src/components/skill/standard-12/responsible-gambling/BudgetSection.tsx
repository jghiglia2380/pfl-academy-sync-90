import React from 'react';
import { Tooltip } from './Tooltip';

interface BudgetSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const formatCurrency = (value: string) => {
  const number = value.replace(/[^\d]/g, '');
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(number) / 100);
  return formatted;
};

const BudgetSection: React.FC<BudgetSectionProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    onChange(rawValue);
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Set a Gambling Budget</h2>
      
      <div className="mb-4">
        <p className="text-gray-600 mb-4">
          Imagine you or a friend enjoys going to the casino once a month. Create a responsible 
          gambling plan by setting a fixed amount of money you're willing to spend on gambling 
          each month. Treat it like any other entertainment expense.
        </p>

        <div className="relative">
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Budget
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="budget"
              id="budget"
              value={value ? `${formatCurrency(value)}` : ''}
              onChange={handleChange}
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
            />
          </div>
          <Tooltip text="This amount should never exceed what you can afford to lose. Think about how it fits into your overall monthly expenses." />
        </div>
      </div>
    </section>
  );
};

export default BudgetSection;