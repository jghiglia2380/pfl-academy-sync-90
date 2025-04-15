import React, { useEffect } from "react";
import { Calculator, CheckCircle } from "lucide-react";

function ReflectionCalculator({ formData, setFormData }) {
  const correctAnswer = 35500;

  const formatNumberWithCommas = (value) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const unformatNumber = (value) => value.replace(/,/g, "");

  useEffect(() => {
    const contributionNum =
      parseFloat(unformatNumber(formData.totalContributions || "0")) || 0;
    setFormData((prev) => ({
      ...prev,
      targetIncome: contributionNum / 0.2,
    }));
  }, [formData.totalContributions]);

  const handleSubmit = () => {
    const contributionNum = parseFloat(
      unformatNumber(formData.totalContributions)
    );
    setFormData((prev) => ({
      ...prev,
      isCorrect: contributionNum === correctAnswer,
    }));
  };

  const handleContributionChange = (e) => {
    const formatted = formatNumberWithCommas(e.target.value);
    setFormData((prev) => ({
      ...prev,
      totalContributions: formatted,
    }));
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-700 mb-4">
          Using the 50/30/20 rule, if you want to maximize contributions to a
          401(k) ($22,500), a Traditional IRA ($6,500), and a Roth IRA ($6,500),
          how much would you need to earn annually to allocate these investments
          while keeping them at 20% of your total income?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Annual Contributions
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                value={formData.totalContributions}
                onChange={handleContributionChange}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Enter total contributions"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Sum of maximum contributions: 401(k) + Traditional IRA + Roth IRA
            </p>
          </div>
          {formData.isCorrect && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-medium text-green-900">Correct!</h3>
              </div>
            </div>
          )}
          {formData.isCorrect === false && (
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-red-500" />
                <h3 className="font-medium text-red-900">Incorrect</h3>
              </div>
              <p className="mt-2 text-sm text-red-700">
                The total contribution should be $35,500
              </p>
            </div>
          )}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-blue-500" />
              <h3 className="font-medium text-blue-900">
                Required Annual Income
              </h3>
            </div>
            <p className="mt-2 text-2xl font-bold text-blue-900">
              ${formData.targetIncome?.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-blue-700">
              This is the annual income needed to keep retirement contributions
              at 20% of your total income.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">How it works:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              Add up all maximum contributions:
              <ul className="list-disc list-inside ml-4 mt-1 text-gray-600">
                <li>401(k): $22,500</li>
                <li>Traditional IRA: $6,500</li>
                <li>Roth IRA: $6,500</li>
                <li>Total: $35,500</li>
              </ul>
            </li>
            <li>
              Using the 50/30/20 rule, retirement savings should be 20% of
              income
            </li>
            <li>
              Divide total contributions by 0.20 to find required annual income
            </li>
            <li>Formula: Required Income = Total Contributions ÷ 0.20</li>
          </ol>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
        <button
          onClick={handleSubmit}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          Validate Answer
        </button>
      </div>

      {formData.showAnswer && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-yellow-800">
            The correct total contribution is: <strong>$35,500</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default ReflectionCalculator;
