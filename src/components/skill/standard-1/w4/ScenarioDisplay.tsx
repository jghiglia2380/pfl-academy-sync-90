export const ScenarioDisplay = ({ scenario }) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Your Scenario</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Personal Information:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Name: {scenario.name.first} {scenario.name.last}</li>
            <li>Address: {scenario.address.street}, {scenario.address.city}, {scenario.address.state} {scenario.address.zip}</li>
            <li>SSN: {scenario.ssn}</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Employment Details:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Annual Income: ${scenario.income.toLocaleString()}</li>
            <li>Filing Status: {scenario.filingStatus}</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
          <h3 className="font-semibold mb-2">Guidance:</h3>
          <p>{scenario.guidance}</p>
        </div>
      </div>
    </div>
  );
};