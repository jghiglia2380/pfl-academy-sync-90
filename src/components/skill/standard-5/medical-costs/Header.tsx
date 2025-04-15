import { Calculator } from 'lucide-react';

function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <Calculator className="text-blue-600 text-4xl" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">
        Analyzing Out-of-Pocket Medical Costs
      </h1>
      <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
        Learn how to calculate medical expenses using insurance terms like deductibles,
        co-insurance, and co-payment limits through this interactive exercise.
      </p>
    </div>
  );
}

export default Header;