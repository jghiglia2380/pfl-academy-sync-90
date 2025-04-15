const ScenarioSelector = ({ scenarios, onSelect, selectedScenario }) => {
  const getRandomScenario = () => {
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    onSelect(scenarios[randomIndex]);
  };

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-purple-900 mb-4">
          FAFSA Practice Scenarios
        </h2>
        <div className="space-y-4">
          <button
            onClick={getRandomScenario}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Get Random Scenario
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => onSelect(scenario)}
                className={`p-6 rounded-lg cursor-pointer transition-all ${
                  selectedScenario === scenario.id
                    ? "bg-purple-100 border-2 border-purple-500"
                    : "bg-white border border-gray-200 hover:border-purple-300"
                }`}
              >
                <h3 className="font-bold text-purple-900">{scenario.title}</h3>
                <p className="text-sm text-gray-600">
                  Click to use this scenario
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSelector;
