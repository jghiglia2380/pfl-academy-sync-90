export function ScenarioSelector({ scenarios, selectedScenario, onScenarioChange }) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select a Scenario:
      </label>
      <select
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={selectedScenario}
        onChange={(e) => onScenarioChange(Number(e.target.value))}
      >
        {scenarios.map((scenario, index) => (
          <option key={index} value={index}>
            {scenario.situation}
          </option>
        ))}
      </select>
    </div>
  );
}