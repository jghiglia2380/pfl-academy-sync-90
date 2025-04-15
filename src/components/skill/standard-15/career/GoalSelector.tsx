interface GoalSelectorProps {
  categories: {
    [key: string]: {
      label: string;
      options: string[];
    };
  };
  selectedGoals: Record<string, string>;
  onSelect: (category: string, value: string) => void;
}

export function GoalSelector({ categories, selectedGoals, onSelect }: GoalSelectorProps) {
  return (
    <div className="space-y-6">
      {Object.entries(categories).map(([categoryId, category]) => (
        <div key={categoryId} className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {category.label}
          </label>
          <select
            value={selectedGoals[categoryId] || ''}
            onChange={(e) => onSelect(categoryId, e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a goal...</option>
            {category.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
