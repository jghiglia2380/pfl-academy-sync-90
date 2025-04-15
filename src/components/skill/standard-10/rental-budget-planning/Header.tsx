import { Home } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-4 rounded-full">
          <Home className="w-12 h-12 text-blue-600" />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Planning a Rental Budget
      </h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Learn how to create a realistic rental budget. Practice managing income, expenses, 
        and financial planning to prepare for renting your first apartment.
      </p>
    </div>
  );
}