import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryCardProps {
  category: {
    title: string;
    percentage: number;
    description: string;
    impact: string;
    tips: string[];
    color: string;
  };
  isOpen: boolean;
  onToggle: () => void;
}

export function CategoryCard({ category, isOpen, onToggle }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <span className="font-bold" style={{ color: category.color }}>{category.percentage}%</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
        </div>
        {isOpen ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
      </button>
      
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-gray-600 mb-3">{category.description}</p>
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Impact</h4>
            <p className="text-gray-600">{category.impact}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Tips for Improvement</h4>
            <ul className="list-disc list-inside text-gray-600">
              {category.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}