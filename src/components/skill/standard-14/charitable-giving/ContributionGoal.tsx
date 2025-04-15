import React from 'react';
import { QuestionTooltip } from './QuestionTooltip';

export default function ContributionGoal({ monetaryOptions, volunteerOptions, formData, handleInputChange }) {
  const [showCustom, setShowCustom] = React.useState(false);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setShowCustom(true);
      handleInputChange({ target: { name: formData.contributionType === 'monetary' ? 'amount' : 'hours', value: '' } });
    } else {
      setShowCustom(false);
      handleInputChange({ target: { name: formData.contributionType === 'monetary' ? 'amount' : 'hours', value } });
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">Set Your Contribution Goal</h2>
        <QuestionTooltip text="Define a realistic and sustainable contribution goal" />
      </div>
      
      {formData.contributionType === 'monetary' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {monetaryOptions.map((option) => (
              <label
                key={option.value}
                className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  (formData.amount === option.value.toString() || (option.value === 'custom' && showCustom))
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <input
                  type="radio"
                  name="amountOption"
                  value={option.value}
                  checked={formData.amount === option.value.toString() || (option.value === 'custom' && showCustom)}
                  onChange={handleOptionChange}
                  className="sr-only"
                />
                <div className="text-lg font-medium text-gray-900">{option.label}</div>
              </label>
            ))}
          </div>
          
          {showCustom && (
            <div>
              <label htmlFor="amount" className="block text-lg font-medium text-gray-700 mb-2">
                Enter custom monthly amount ($)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                min="0"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                value={formData.amount}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
      )}

      {formData.contributionType === 'volunteering' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {volunteerOptions.map((option) => (
              <label
                key={option.value}
                className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  (formData.hours === option.value.toString() || (option.value === 'custom' && showCustom))
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <input
                  type="radio"
                  name="hoursOption"
                  value={option.value}
                  checked={formData.hours === option.value.toString() || (option.value === 'custom' && showCustom)}
                  onChange={handleOptionChange}
                  className="sr-only"
                />
                <div className="text-lg font-medium text-gray-900">{option.label}</div>
              </label>
            ))}
          </div>
          
          {showCustom && (
            <div>
              <label htmlFor="hours" className="block text-lg font-medium text-gray-700 mb-2">
                Enter custom monthly hours
              </label>
              <input
                type="number"
                id="hours"
                name="hours"
                min="0"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                value={formData.hours}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
      )}

      {formData.contributionType === 'inkind' && (
        <div>
          <label htmlFor="inKindItems" className="block text-lg font-medium text-gray-700 mb-2">
            Items or services you plan to donate
          </label>
          <textarea
            id="inKindItems"
            name="inKindItems"
            rows={3}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
            value={formData.inKindItems}
            onChange={handleInputChange}
            placeholder="e.g., Professional services, clothing, food items..."
          />
        </div>
      )}
    </div>
  );
}