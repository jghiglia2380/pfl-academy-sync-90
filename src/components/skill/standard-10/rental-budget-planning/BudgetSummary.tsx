import { Calculator } from "lucide-react";
import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export function BudgetSummary({
  totalIncome,
  totalExpenses,
  formData,
  setFormData,
}) {
  const [loadingAi, setLoadingAi] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const remainingIncome = totalIncome - totalExpenses;
  const affordableRent = totalIncome * 0.3;
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, reflection: e.target.value });
    setWordCount(e.target.value.split(/\s/).filter((w) => w !== "").length);
  };

  const handleSubmit = async () => {
    if (wordCount < 15) {
      toast.warning("Please write at least 15 words before submitting.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    setLoadingAi(true);
    const response = await generateAiResponse(
      formData.reflection,
      `
        User total monthly income: ${formatCurrency(totalIncome)}
        User total monthly expenses: ${formatCurrency(totalExpenses)}
        User remaining income: ${formatCurrency(remainingIncome)}
        Based on your budget, how realistic is renting an apartment with your projected income? 
        Does the amount you can afford for rent meet your expectations for a first apartment?
      `
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Calculator size={24} className="text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-900">
          Step 3: Determine Affordable Rent
        </h2>
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <p className="text-gray-700">
          Financial experts recommend that rent should not exceed 30% of your
          monthly income. Based on your total monthly income of{" "}
          {formatCurrency(totalIncome)}, you can afford:
        </p>
        <p className="text-2xl font-bold text-blue-600 mt-2">
          {formatCurrency(affordableRent)} per month in rent
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-lg">
          <span>Total Monthly Income:</span>
          <span className="font-semibold">{formatCurrency(totalIncome)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Total Monthly Expenses:</span>
          <span className="font-semibold">{formatCurrency(totalExpenses)}</span>
        </div>
        <div className="flex justify-between text-lg text-green-600">
          <span>Remaining Income:</span>
          <span className="font-semibold">
            {formatCurrency(remainingIncome)}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-3">Understanding Your Budget</h3>
        <p className="text-gray-600 mb-3">
          Based on your budget, how realistic is renting an apartment with your
          projected income? Does the amount you can afford for rent meet your
          expectations for a first apartment?
        </p>
        <textarea
          value={formData.reflection}
          onChange={handleChange}
          className="w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4"
          placeholder="Write your reflection here..."
        />
        {formData.reflection && formData.aiResponse ? (
          <div>
            <div className="flex w-full mb-4">
              <button
                onClick={handleRevise}
                className="bg-indigo-600 w-full text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Revise Response
              </button>
            </div>
            {/* AI Response Box */}
            {loadingAi ? (
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                <p className="text-gray-700">Generating AI feedback...</p>
              </div>
            ) : (
              formData.aiResponse && (
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    AI Feedback
                  </h4>
                  <p className="text-gray-700 mt-2">{formData.aiResponse}</p>
                </div>
              )
            )}
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loadingAi}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
          >
            {loadingAi ? "Generating AI response..." : "Submit Reflection"}
          </button>
        )}
      </div>
    </div>
  );
}
