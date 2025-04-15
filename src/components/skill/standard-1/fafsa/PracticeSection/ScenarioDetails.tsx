import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Benefit {
  name: string;
}

interface ScenarioData {
  agi: string;
  workingIncome: string;
  dislocatedWorker: string;
  benefits: Benefit[];
  additionalInfo: Benefit[];
  untaxedIncome: Benefit[];
}

interface ScenarioDetailsProps {
  data: ScenarioData;
}

export function ScenarioDetails({ data }: ScenarioDetailsProps) {
  const renderList = (items: Benefit[], title: string) => {
    if (!items.length) return null;
    
    return (
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">{title}:</h4>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mt-6">
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold text-gray-700">Adjusted Gross Income (AGI):</h4>
          <p className="text-gray-600">{data.agi}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Income from Working:</h4>
          <p className="text-gray-600">{data.workingIncome}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700">Dislocated Worker:</h4>
          <p className="text-gray-600">{data.dislocatedWorker}</p>
        </div>
      </div>
      
      {renderList(data.benefits, "Household Benefits Received in 2021-2022")}
      {renderList(data.additionalInfo, "Additional Financial Information in 2021")}
      {renderList(data.untaxedIncome, "Untaxed Income in 2021")}
    </div>
  );
}