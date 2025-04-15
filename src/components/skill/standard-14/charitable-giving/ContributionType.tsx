import { QuestionTooltip } from './QuestionTooltip';

export default function ContributionType({ contributionTypes, formData, handleInputChange }) {
  return (
    <div className="bg-white shadow rounded-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">Type of Contribution</h2>
        <QuestionTooltip text="Choose how you'd like to contribute to your selected cause" />
      </div>
      <div className="space-y-4">
        {contributionTypes.map((type) => (
          <div
            key={type.id}
            className={`relative rounded-lg border-2 p-4 transition-all ${
              formData.contributionType === type.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <label className="flex items-start space-x-4 cursor-pointer">
              <input
                type="radio"
                name="contributionType"
                value={type.id}
                checked={formData.contributionType === type.id}
                onChange={handleInputChange}
                className="mt-1.5 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="flex-1">
                <span className="block text-lg font-medium text-gray-900 mb-1">{type.label}</span>
                <span className="text-gray-600">{type.description}</span>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}