import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Standard8Submission } from '../../../types/standard8';

interface CreditCardAnalysisProps {
  register: UseFormRegister<Standard8Submission>;
  watch: UseFormWatch<Standard8Submission>;
  setValue: UseFormSetValue<Standard8Submission>;
}

export const CreditCardAnalysis: React.FC<CreditCardAnalysisProps> = ({
  register,
  watch,
  setValue
}) => {
  const creditCardOptions = [
    {
      name: 'Rewards Plus Card',
      apr: 18.99,
      annualFee: 95,
      rewards: '3% on dining and travel',
      signUpBonus: '$200 after $1,000 spend',
      additionalBenefits: 'Travel insurance'
    },
    {
      name: 'Cash Back Basic',
      apr: 15.99,
      annualFee: 0,
      rewards: '2% on all purchases',
      signUpBonus: '$100 after $500 spend',
      additionalBenefits: 'Extended warranty'
    },
    {
      name: 'Low Rate Card',
      apr: 12.99,
      annualFee: 0,
      rewards: 'None',
      signUpBonus: '0% APR for 15 months',
      additionalBenefits: 'Balance transfers'
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Credit Card Analysis</h2>
      
      {/* Credit Card Options Reference */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Credit Card Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creditCardOptions.map((card, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h5 className="font-medium text-blue-800 mb-3">{card.name}</h5>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-percent text-green-500 mt-1 mr-2"></i>
                  <span>APR: {card.apr}%</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-dollar-sign text-yellow-500 mt-1 mr-2"></i>
                  <span>Annual Fee: ${card.annualFee}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-gift text-green-500 mt-1 mr-2"></i>
                  <span>Rewards: {card.rewards}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-award text-blue-500 mt-1 mr-2"></i>
                  <span>Sign-up Bonus: {card.signUpBonus}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-plane text-purple-500 mt-1 mr-2"></i>
                  <span>Additional Benefits: {card.additionalBenefits}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Scenario 1: Large Purchase Financing */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Scenario 1: Large Purchase Financing</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h5 className="font-medium text-blue-800 mb-3">Payment Terms</h5>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <i className="fas fa-calendar text-blue-500 mt-1 mr-2"></i>
                <span>12 month payment plan</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-equals text-blue-500 mt-1 mr-2"></i>
                <span>Equal monthly payments</span>
              </li>
            </ul>
          </div>
          {/* ... other scenario details ... */}
        </div>
      </div>

      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-calculator"></i>
          1.1 Large Purchase Analysis
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Show your calculations for Scenario 1:
          </p>
          <textarea
            {...register('creditCardAnalysis.largePurchase.calculations')}
            rows={4}
            className="font-mono"
            placeholder="Show your calculations for monthly payments, total interest, and net costs for each card option..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Include detailed calculations for each card option, showing all steps
          </div>
        </div>
      </div>

      {/* Scenario 2: Regular Monthly Spending */}
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Scenario 2: Regular Monthly Spending</h4>
        {/* ... scenario details ... */}
      </div>

      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-chart-line"></i>
          1.2 Monthly Spending Analysis
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Show your calculations for Scenario 2:
          </p>
          <textarea
            {...register('creditCardAnalysis.monthlySpending.calculations')}
            rows={4}
            className="font-mono"
            placeholder="Show your calculations for rewards earnings and net value for each card..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Break down rewards calculations by spending category
          </div>
        </div>
      </div>

      {/* Scenario 3: Balance Transfer Evaluation */}
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Scenario 3: Balance Transfer Evaluation</h4>
        {/* ... scenario details ... */}
      </div>

      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-exchange-alt"></i>
          1.3 Balance Transfer Analysis
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Show your calculations for Scenario 3:
          </p>
          <textarea
            {...register('creditCardAnalysis.balanceTransfer.calculations')}
            rows={4}
            className="font-mono"
            placeholder="Show your calculations comparing balance transfer options..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Include transfer fees and total interest savings in your calculations
          </div>
        </div>
      </div>

      {/* Final Recommendation */}
      <div className="response-area">
        <label className="block">
          <i className="fas fa-lightbulb"></i>
          1.4 Comprehensive Recommendation
        </label>
        <textarea
          {...register('creditCardAnalysis.recommendation')}
          rows={4}
          placeholder="Based on your analysis of all three scenarios, provide comprehensive recommendations for each situation..."
        />
        <div className="hint">
          <i className="fas fa-info-circle mr-1"></i>
          Support your recommendations with specific findings from your analysis
        </div>
      </div>
    </div>
  );
}; 