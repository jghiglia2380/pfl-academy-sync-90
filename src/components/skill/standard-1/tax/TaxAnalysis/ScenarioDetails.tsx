import React from 'react';

interface ScenarioDetailsProps {
  scenario: any;
  index: number;
}

const ScenarioDetails: React.FC<ScenarioDetailsProps> = ({ scenario, index }) => {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold mb-4">
        Scenario {index + 1}: {scenario.name}
      </h3>
      <div className="space-y-3 text-gray-700">
        <p><strong>Income:</strong> ${scenario.income.toLocaleString()}/year</p>
        <p><strong>Occupation:</strong> {scenario.occupation}</p>
        <p><strong>Financial Situation:</strong> {scenario.financialSituation}</p>
        <p><strong>Additional Information:</strong> {scenario.otherInformation}</p>
      </div>
    </div>
  );
};

export default ScenarioDetails;