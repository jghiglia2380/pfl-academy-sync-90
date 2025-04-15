import React from 'react';
import { DollarSign, Briefcase, Home, Info } from 'lucide-react';

interface ScenarioCardProps {
  scenario: any;
  isSelected: boolean;
  onClick: () => void;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, isSelected, onClick }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-md transition-all cursor-pointer
        ${isSelected 
          ? 'bg-blue-50 border-2 border-blue-500' 
          : 'bg-white hover:bg-gray-50 border border-gray-200'}`}
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold mb-4">{scenario.name}</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <DollarSign className="h-5 w-5 text-gray-500" />
          <p className="text-gray-700">
            Annual Income: ${scenario.income.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Briefcase className="h-5 w-5 text-gray-500" />
          <p className="text-gray-700">{scenario.occupation}</p>
        </div>

        <div className="flex items-start gap-3">
          <Home className="h-5 w-5 text-gray-500 mt-1" />
          <p className="text-gray-700">{scenario.financialSituation}</p>
        </div>

        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-gray-500 mt-1" />
          <p className="text-gray-700">{scenario.otherInformation}</p>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;