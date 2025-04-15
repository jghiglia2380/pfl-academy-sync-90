import { useEffect } from "react";
import CurrencyInput from "./CurrencyInput";

function Calculator({ formData, setFormData }) {
  const deductible = 500;
  const totalBill = 8000;

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      remainingBalance: totalBill - deductible,
      coInsuranceAmount: prev.coInsuranceAmount || "",
      totalOutOfPocket: prev.totalOutOfPocket || 0,
      feedback: prev.feedback || "",
      explanation: prev.explanation || "",
      isCalculatorComplete: prev.isCalculatorComplete || false,
    }));
  }, [setFormData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleCoInsuranceChange = (value) => {
    setFormData((prev) => {
      const calculatedCoInsurance = prev.remainingBalance * 0.2;
      const cappedCoInsurance = Math.min(calculatedCoInsurance, 2000);

      const isCorrect = Number(value) === cappedCoInsurance;
      return {
        ...prev,
        coInsuranceAmount: value,
        totalOutOfPocket: deductible + cappedCoInsurance,
        feedback: isCorrect
          ? "Correct! You calculated the co-insurance amount correctly."
          : "Try again. Remember to calculate 20% of the remaining balance and check if it exceeds the cap.",
        isCalculatorComplete: isCorrect,
      };
    });
  };

  const handleExplanationChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      explanation: e.target.value,
    }));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Step 1: Read the Scenario
      </h2>
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p className="text-blue-700">
          Imagine you have a medical bill of $8,000. Your insurance plan
          includes:
        </p>
        <ul className="list-disc ml-6 mt-2 text-blue-700">
          <li>$500 Deductible</li>
          <li>80/20 Co-Insurance</li>
          <li>$2,000 Co-Insurance Cap</li>
        </ul>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Step 2: Calculate Costs
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Bill
          </label>
          <p className="mt-1 text-lg font-semibold">
            {formatCurrency(totalBill)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deductible Payment
          </label>
          <p className="mt-1 text-lg font-semibold">
            {formatCurrency(deductible)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Remaining Balance After Deductible
          </label>
          <p className="mt-1 text-lg font-semibold">
            {formatCurrency(formData.remainingBalance)}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 flex items-center">
            Your Co-Insurance Amount (20%)
          </label>
          <div className="mt-1">
            <CurrencyInput
              value={formData.coInsuranceAmount}
              onChange={handleCoInsuranceChange}
              placeholder="0.00"
            />
          </div>
          {formData.feedback && (
            <p
              className={`mt-2 text-sm ${
                formData.feedback.includes("Correct")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formData.feedback}
            </p>
          )}
        </div>

        {formData.totalOutOfPocket > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Out-of-Pocket Expenses
            </label>
            <p className="mt-1 text-lg font-semibold text-blue-600">
              {formatCurrency(formData.totalOutOfPocket)}
            </p>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
        Step 3: Explain Your Calculation
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Write a paragraph explaining how you calculated the total
          out-of-pocket expenses:
        </label>
        <textarea
          rows={4}
          value={formData.explanation}
          onChange={handleExplanationChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Explain your calculation process..."
        />
      </div>
    </div>
  );
}

export default Calculator;
