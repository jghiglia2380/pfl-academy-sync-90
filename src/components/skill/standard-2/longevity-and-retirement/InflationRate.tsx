import React from "react";
import { QuestionTooltip } from "./QuestionTooltip";

const inflationOptions = [
  { value: "2", label: "2%" },
  { value: "2.5", label: "2.5%" },
  { value: "3", label: "3%" },
  { value: "3.5", label: "3.5%" },
];

export default function InflationRate({
  formData,
  handleInputChange,
  futureExpenses,
  yearsUntilRetirement,
}) {
  return (
    <div className="bg-white shadow rounded-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">
          Account for Inflation
        </h2>
        <QuestionTooltip text="The inflation rate impacts how much money you'll need to maintain your purchasing power" />
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="inflationRate"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Choose an estimated inflation rate
          </label>
          <select
            id="inflationRate"
            name="inflationRate"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
            value={formData.inflationRate}
            onChange={handleInputChange}
          >
            <option value="">Select a rate...</option>
            {inflationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {futureExpenses > 0 && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Projected Annual Expenses
            </h3>
            <p className="text-blue-700">
              Your estimated annual expenses in {yearsUntilRetirement} years at
              retirement will be: ${futureExpenses.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
