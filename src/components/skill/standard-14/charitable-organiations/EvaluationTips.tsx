import React from 'react';
import CollapsibleSection from './CollapsibleSection';

function EvaluationTips() {
  const tips = [
    'Look for clear information about the organization\'s mission and goals',
    'Check how funds are allocated—most reputable charities use at least 75% of funds for their programs',
    'Avoid high-pressure donation requests, especially from unsolicited calls or emails',
    'Verify the organization\'s tax-exempt status',
    'Review annual reports and financial statements',
    'Check for transparency in reporting program outcomes'
  ];

  return (
    <CollapsibleSection title="Charity Evaluation Tips">
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {tips.map((tip, index) => (
            <li key={index} className="px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </CollapsibleSection>
  );
}

export default EvaluationTips;