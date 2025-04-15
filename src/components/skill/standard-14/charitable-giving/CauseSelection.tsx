import { QuestionTooltip } from './QuestionTooltip';

export default function CauseSelection({ formData, handleInputChange }) {
  return (
    <div className="bg-white shadow rounded-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">Choose a Cause or Organization</h2>
        <QuestionTooltip text="Select a cause that resonates with your values and interests" />
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="cause" className="block text-lg font-medium text-gray-700 mb-2">
            What cause or organization would you like to support?
          </label>
          <textarea
            id="cause"
            name="cause"
            rows={3}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
            value={formData.cause}
            onChange={handleInputChange}
            placeholder="e.g., Local food banks, animal shelters, environmental conservation..."
          />
        </div>
      </div>
    </div>
  );
}