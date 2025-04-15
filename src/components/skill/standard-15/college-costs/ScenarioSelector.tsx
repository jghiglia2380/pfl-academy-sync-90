import React from "react";

interface ScenarioSelectorProps {
  scenarios: any[];
  selectedScenario: any | null;
  onSelect: (scenario: any) => void;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  scenarios,
  selectedScenario,
  onSelect,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Explore Different Scenarios
      </h2>
      <div className="space-y-2">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => onSelect(scenario)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
              selectedScenario && selectedScenario.id === scenario.id
                ? "bg-blue-50 border-2 border-blue-500"
                : "bg-white border border-gray-200 hover:border-blue-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{scenario.name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {scenario.description}
                </div>
              </div>
              <svg
                className={`w-5 h-5 ${
                  selectedScenario && selectedScenario.id === scenario.id
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    selectedScenario && selectedScenario.id === scenario.id
                      ? "M5 13l4 4L19 7"
                      : "M9 5l7 7-7 7"
                  }
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
