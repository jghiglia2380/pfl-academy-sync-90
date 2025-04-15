import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface EducationalTipsProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function EducationalTips({ isOpen, onToggle }: EducationalTipsProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center text-blue-600 hover:text-blue-800 w-full justify-between mb-4"
      >
        <span className="flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          Important Tips to Remember
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-2">
          <p className="flex items-center text-gray-700">
            • The odds of winning are typically very low
          </p>
          <p className="flex items-center text-gray-700">
            • Gambling can be enjoyable when treated as a planned expense
          </p>
          <p className="flex items-center text-gray-700">
            • Setting limits helps prevent overspending and emotional stress
          </p>
          <p className="flex items-center text-gray-700">
            • Never gamble with money you can't afford to lose
          </p>
        </div>
      )}
    </div>
  );
}