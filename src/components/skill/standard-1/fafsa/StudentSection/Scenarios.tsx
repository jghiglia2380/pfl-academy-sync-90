export function Scenarios({ randomScenario }) {
  return (
    <div className="scenario-container">
      <h2 className="text-xl font-bold mb-4">Practice Scenario</h2>
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8">
        <h3 className="font-bold mb-2">Use the following information to complete the form:</h3>
        <div className="space-y-2">
          <p><span className="font-semibold">Name:</span> {randomScenario.firstName} {randomScenario.lastName}</p>
          <p><span className="font-semibold">Citizenship Status:</span> {randomScenario.citizenshipStatus}</p>
          {randomScenario.alienRegistrationNumber && (
            <p><span className="font-semibold">Alien Registration Number:</span> {randomScenario.alienRegistrationNumber}</p>
          )}
          <p><span className="font-semibold">Marital Status:</span> {randomScenario.maritalStatus}</p>
          <p><span className="font-semibold">Parent 1 Education:</span> {randomScenario.parent1Education}</p>
          <p><span className="font-semibold">Parent 2 Education:</span> {randomScenario.parent2Education}</p>
        </div>
        <div className="mt-4 text-sm text-blue-700">
          <p>Note: For practice purposes, use any 9 digits for the Social Security Number.</p>
        </div>
      </div>
    </div>
  );
}