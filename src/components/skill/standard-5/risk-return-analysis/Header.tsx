import { BookOpen } from 'lucide-react';

export function Header() {
  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">Understanding Risk and Return</h1>
      </div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Explore different investment options and assess their risk and potential returns. Consider the relationship between risk and reward as you analyze each option.
      </p>
    </div>
  );
}