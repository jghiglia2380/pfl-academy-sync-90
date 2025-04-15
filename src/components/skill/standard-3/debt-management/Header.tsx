import { Wallet2 } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <Wallet2 className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Managing Debt and Evaluating Bankruptcy Options
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Learn to create effective debt management strategies and understand bankruptcy implications through this interactive exercise.
      </p>
    </div>
  );
};

export default Header;