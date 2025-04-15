import { CalculatorIcon } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center mb-16">
      <div className="flex justify-center mb-6">
        <CalculatorIcon className="h-20 w-20 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-blue-900 mb-6">
        Longevity and Retirement Planning Worksheet
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Plan for a secure retirement by understanding life expectancy, expenses,
        and savings needs. This exercise will help you create a comprehensive
        strategy for long-term financial security.
      </p>
    </div>
  );
}
