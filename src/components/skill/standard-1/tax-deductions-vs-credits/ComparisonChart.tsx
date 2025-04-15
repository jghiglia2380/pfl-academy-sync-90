import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ComparisonCategory } from '../types';

interface Props {
  categories: ComparisonCategory[];
}

export default function ComparisonChart({ categories }: Props) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div 
          key={category.title}
          className="border rounded-lg overflow-hidden bg-white shadow-sm"
        >
          <button
            onClick={() => toggleCategory(category.title)}
            className="w-full px-6 py-4 flex items-center justify-between bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-blue-900">{category.title}</h3>
            {expandedCategory === category.title ? (
              <ChevronUp className="h-5 w-5 text-blue-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-blue-500" />
            )}
          </button>
          
          {expandedCategory === category.title && (
            <div className="grid md:grid-cols-2 gap-4 p-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Tax Deduction</h4>
                <p className="text-gray-600">{category.deduction}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Tax Credit</h4>
                <p className="text-gray-600">{category.credit}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}