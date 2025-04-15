import React, { useState } from 'react';

const EducationalTips = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const tips = [
    'Set realistic budgets and stick to them',
    'Avoid chasing losses—accept that losing is part of the experience',
    'Balance gambling with other activities to avoid overindulgence'
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Educational Tips</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
        >
          {isExpanded ? 'Hide' : 'Show'} Tips
        </button>
      </div>

      {isExpanded && (
        <ul className="space-y-2 pl-5 list-disc text-gray-600">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default EducationalTips;