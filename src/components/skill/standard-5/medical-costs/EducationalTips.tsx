import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function EducationalTips() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <button
        className="flex justify-between items-center w-full"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-semibold text-gray-900">Key Insurance Terms</h2>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium text-gray-900">Deductible</h3>
            <p className="text-gray-600">
              The amount you must pay for covered health care services before your insurance plan starts to pay.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900">Co-Insurance</h3>
            <p className="text-gray-600">
              Your share of the costs after meeting your deductible, usually expressed as a percentage (e.g., 20% of the remaining costs).
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-900">Co-Insurance Cap</h3>
            <p className="text-gray-600">
              The maximum amount you'll have to pay in co-insurance for covered services in a plan year.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EducationalTips;