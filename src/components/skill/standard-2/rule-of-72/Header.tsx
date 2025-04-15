import React from 'react';
import { Calculator } from 'lucide-react';

interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <div className="text-center mb-12">
      <div className="bg-blue-50 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Calculator className="w-12 h-12 text-blue-500" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      {description && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}