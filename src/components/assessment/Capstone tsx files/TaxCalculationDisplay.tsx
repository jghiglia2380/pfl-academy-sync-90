import React from 'react';
import { formatCurrency } from '../../lib/formatters';

interface TaxCalculationDisplayProps {
  liability: number;
  effectiveRate: number;
  bracket: number;
  optimalDeduction: {
    method: 'standard' | 'itemized';
    amount: number;
  };
  taxSavings: number;
}

export const TaxCalculationDisplay: React.FC<TaxCalculationDisplayProps> = ({
  liability,
  effectiveRate,
  bracket,
  optimalDeduction,
  taxSavings
}) => {
  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">Tax Calculation Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Tax Liability</div>
          <div className="text-2xl font-bold text-blue-700">{formatCurrency(liability)}</div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Effective Tax Rate</div>
          <div className="text-2xl font-bold text-blue-700">
            {effectiveRate.toFixed(1)}%
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Marginal Tax Bracket</div>
          <div className="text-2xl font-bold text-blue-700">{bracket}%</div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Optimal Deduction Method</div>
          <div className="text-2xl font-bold text-blue-700 capitalize">
            {optimalDeduction.method}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Amount: {formatCurrency(optimalDeduction.amount)}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-600 mb-1">Tax Savings</div>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(taxSavings)}
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className="mb-2">
          * These calculations are based on current tax rates and regulations.
          Actual tax liability may vary based on additional factors.
        </p>
        <p>
          * Consult with a tax professional for personalized advice.
        </p>
      </div>
    </div>
  );
};

export default TaxCalculationDisplay; 