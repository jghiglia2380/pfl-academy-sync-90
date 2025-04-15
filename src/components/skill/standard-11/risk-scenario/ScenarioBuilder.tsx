import React, { useState } from "react";

interface Props {
  scenario: string;
  onChange: (value: string) => void;
}

function ScenarioBuilder({ scenario, onChange }: Props) {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-gray-700">
        Step 2: Create a Risk Scenario
      </label>

      <div className="space-y-4">
        <textarea
          value={scenario}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
          placeholder="Describe a realistic situation where the selected type of risk could occur..."
        />

        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <button
                type="button"
                onClick={() => setShowExample(!showExample)}
                className="text-sm text-blue-800 font-medium flex"
              >
                {showExample ? "Hide Example" : "Show Example"}
              </button>
              {showExample && (
                <p className="mt-2 text-sm ml-6 text-blue-700 list-disc">
                  You leave your laptop in your car while running errands. When
                  you return, you find that your car window has been smashed and
                  your laptop is missing. Now, you have to deal with the
                  financial loss and potential loss of important data.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScenarioBuilder;
