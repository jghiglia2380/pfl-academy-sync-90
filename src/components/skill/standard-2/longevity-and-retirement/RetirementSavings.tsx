import { QuestionTooltip } from "./QuestionTooltip";

const returnOptions = [
  { value: "4", label: "4%" },
  { value: "5", label: "5%" },
  { value: "6", label: "6%" },
  { value: "7", label: "7%" },
];

export default function RetirementSavings({
  formData,
  handleInputChange,
  calculations,
}) {
  return (
    <div className="bg-white shadow rounded-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">
          Estimate Total Retirement Savings
        </h2>
        <QuestionTooltip text="Calculate how much you need to save based on your expenses and investment returns" />
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="returnRate"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Choose an estimated annual return on investments
          </label>
          <select
            id="returnRate"
            name="returnRate"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
            value={formData.returnRate}
            onChange={handleInputChange}
          >
            <option value="">Select a rate...</option>
            {returnOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {calculations.totalSavingsNeeded > 0 && (
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-medium text-green-900 mb-2">
              Required Retirement Savings
            </h3>
            <div className="space-y-2 text-green-700">
              <p>
                You will need approximately $
                {calculations.totalSavingsNeeded.toLocaleString()} in savings to
                fund your retirement
              </p>
              <p className="text-sm">
                Based on retiring at age {formData.retirementAge} and{" "}
                {calculations.yearsInRetirement} years in retirement
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
