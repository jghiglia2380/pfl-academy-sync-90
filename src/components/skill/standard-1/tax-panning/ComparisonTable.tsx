import  { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ComparisonTable({ categories }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {categories.map(category => (
        <div key={category.id} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleCategory(category.id)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gray-50"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {category.title}
            </h3>
            {expandedCategory === category.id ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {expandedCategory === category.id && (
            <div className="grid md:grid-cols-2 gap-4 p-6">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">18-24 Years</h4>
                <p className="text-gray-600">{category.younger}</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-900 mb-2">25-35 Years</h4>
                <p className="text-gray-600">{category.older}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}