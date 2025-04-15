import { QuestionTooltip } from "./QuestionTooltip";

const lifeExpectancyOptions = [80, 85, 90, 95, 100];
const retirementAgeOptions = Array.from({ length: 31 }, (_, i) => i + 55); // Ages 55-85

export default function LifeExpectancy({ formData, handleInputChange }) {
  return (
    <div className="bg-white shadow rounded-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">
          Plan Your Timeline
        </h2>
        <QuestionTooltip text="Consider family history, lifestyle, and personal health factors" />
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="currentAge"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            What is your current age?
          </label>
          <input
            type="number"
            id="currentAge"
            name="currentAge"
            min="18"
            max="80"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
            value={formData.currentAge}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="retirementAge"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            At what age do you plan to retire?
          </label>
          <select
            id="retirementAge"
            name="retirementAge"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
            value={formData.retirementAge}
            onChange={handleInputChange}
          >
            <option value="">Select retirement age...</option>
            {retirementAgeOptions.map((age) => (
              <option key={age} value={age}>
                {age} years {age === 65 && "(Average retirement age)"}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            The average retirement age in the U.S. is 65 years old
          </p>
        </div>

        <div>
          <label
            htmlFor="lifeExpectancy"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select your estimated life expectancy
          </label>
          <select
            id="lifeExpectancy"
            name="lifeExpectancy"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
            value={formData.lifeExpectancy}
            onChange={handleInputChange}
          >
            <option value="">Select an age...</option>
            {lifeExpectancyOptions.map((age) => (
              <option key={age} value={age}>
                {age} years
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            If unsure, consider the average life expectancy in your country.
            Example: In the U.S., it is currently around 77 years.
          </p>
        </div>

        {formData.currentAge &&
          formData.retirementAge &&
          formData.lifeExpectancy && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Your Retirement Timeline
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>
                  Years until retirement:{" "}
                  {parseInt(formData.retirementAge) -
                    parseInt(formData.currentAge)}{" "}
                  years
                </li>
                <li>
                  Years in retirement:{" "}
                  {parseInt(formData.lifeExpectancy) -
                    parseInt(formData.retirementAge)}{" "}
                  years
                </li>
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}
