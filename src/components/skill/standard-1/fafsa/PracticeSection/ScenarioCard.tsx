import React from 'react';

interface ScenarioCardProps {
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

export function ScenarioCard({ title, description, isSelected, onClick }: ScenarioCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-purple-100 border-2 border-purple-500'
          : 'bg-white border border-gray-200 hover:border-purple-300'
      }`}
    >
      <h3 className="text-xl font-semibold text-purple-700 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}