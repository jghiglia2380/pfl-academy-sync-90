import { Check, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { TAX_SYSTEMS } from '../utils/taxSystems';

const TaxSystemSelector = ({ selectedSystem, onSelect }) => {
  const getSystemIcon = (type: 'progressive' | 'regressive') => {
    return type === 'progressive' ? (
      <TrendingUp className="h-8 w-8" />
    ) : (
      <TrendingDown className="h-8 w-8" />
    );
  };

  const renderSystem = (system) => (
    <div
      key={system.type}
      className={`p-6 rounded-lg shadow-md cursor-pointer transition-all
        ${selectedSystem === system.type
          ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 transform scale-[1.02]' 
          : 'bg-white hover:bg-gray-50 border border-gray-200 hover:transform hover:scale-[1.01]'}`}
      onClick={() => onSelect(system.type)}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-full 
          ${selectedSystem === system.type 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-600'}`}>
          {getSystemIcon(system.type)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold capitalize">
              {system.type} Tax System
            </h3>
            {selectedSystem === system.type && (
              <Check className="h-6 w-6 text-blue-500" />
            )}
          </div>
          <p className="text-gray-600 mt-2">{system.description}</p>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <h4 className="font-medium text-gray-700">Key Features:</h4>
        {system.keyPoints.map((point, index) => (
          <div key={index} className="flex items-start gap-2 pl-2">
            <AlertCircle className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
            <p className="text-gray-600">{point}</p>
          </div>
        ))}
      </div>

      {selectedSystem === system.type && (
        <div className="mt-4 text-sm text-blue-600 font-medium">
          Selected ✓
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.values(TAX_SYSTEMS).map(renderSystem)}
    </div>
  );
};

export default TaxSystemSelector;