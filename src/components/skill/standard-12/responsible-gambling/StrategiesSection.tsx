import React, { useState } from 'react';

interface StrategiesSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const StrategiesSection: React.FC<StrategiesSectionProps> = ({ value, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const exampleStrategies = [
    'Take regular breaks',
    'Do not borrow money from others',
    'Set small goals for leaving, like when the budget is reached or the time limit is up',
    'Leave with a positive mindset, regardless of financial outcomes'
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 3: Strategies to Keep It Fun</h2>
      
      <div className="space-y-4">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder="List your strategies here..."
        />

        <div>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
          >
            {isExpanded ? 'Hide' : 'Show'} example strategies
          </button>

          {isExpanded && (
            <ul className="mt-2 pl-5 list-disc text-gray-600 text-sm">
              {exampleStrategies.map((strategy, index) => (
                <li key={index}>{strategy}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default StrategiesSection;