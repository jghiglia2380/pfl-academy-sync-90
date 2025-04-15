import { ChevronDown, ChevronUp } from 'lucide-react';

export function LenderDetails({ lender, isExpanded, onToggle }) {
  return (
    <div className="mb-4 border rounded-md">
      <button
        className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
        onClick={onToggle}
      >
        <span className="font-medium">{lender.name}</span>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isExpanded && (
        <div className="p-4">
          <p className="text-gray-600 mb-4">{lender.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium text-green-600 mb-2">Pros</h3>
              <ul className="list-disc list-inside text-sm">
                {lender.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-red-600 mb-2">Cons</h3>
              <ul className="list-disc list-inside text-sm">
                {lender.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-600 mb-2">Typical Uses</h3>
              <ul className="list-disc list-inside text-sm">
                {lender.typicalUses.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}