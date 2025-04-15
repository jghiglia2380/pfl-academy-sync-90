import { ShieldCheck } from 'lucide-react';

function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <ShieldCheck className="h-16 w-16 text-indigo-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Risk Scenario Analysis
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Learn to identify risks, create realistic scenarios, and analyze how to manage them 
        using specific strategies. This exercise promotes critical thinking and practical 
        application of risk management concepts.
      </p>
    </div>
  );
}

export default Header;