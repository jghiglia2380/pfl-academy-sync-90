import { Home } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center text-center mb-4">
          <Home className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900">Apartment Hunting Checklist</h1>
        <p className="mt-2 text-center text-gray-600 max-w-2xl mx-auto">
          Compare rental options and track your apartment search. Use this tool to evaluate different properties
          and make an informed decision about your next home.
        </p>
      </div>
    </header>
  );
};

export default Header;