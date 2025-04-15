import { QuestionTooltip } from "./QuestionTooltip";

export default function AnnualExpenses({ formData, handleInputChange }) {
  return (
    <div className="bg-white shadow rounded-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">
          Calculate Annual Expenses
        </h2>
        <QuestionTooltip text="Include costs like housing, food, healthcare, and leisure activities" />
      </div>

      <div>
        <label
          htmlFor="annualExpenses"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Estimated annual expenses in retirement
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-lg">$</span>
          </div>
          <input
            type="number"
            name="annualExpenses"
            id="annualExpenses"
            className="block w-full pl-8 pr-12 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-base"
            placeholder="50000"
            value={formData.annualExpenses}
            onChange={handleInputChange}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Consider using your current annual expenses as a baseline and adjust
          for inflation
        </p>
      </div>
    </div>
  );
}
