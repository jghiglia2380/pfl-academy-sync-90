import { HelpCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export default function ReflectionSection({ formData, setFormData }) {
  const [showHints, setShowHints] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [wordCount, setWordCount] = useState(0);

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
      Credit cards offer a variety of features, fees, and rewards. Choosing the right card can make a big difference in managing your finances effectively.
      Credit card options: Grocery Rewards Card, Travel Rewards Card, Gas Rewards Card.
      After reviewing the three credit card options, which card would you choose and why?
      Which factors were the most important to your decision (e.g., APR, annual fee, or rewards), and why?
      If you were to carry a balance, would your decision change? How so?
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
    <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">
            Consider the following questions:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
            <li>
              After reviewing the three credit card options, which card would
              you choose and why?
            </li>
            <li>
              Which factors were the most important to your decision (e.g., APR,
              annual fee, or rewards), and why?
            </li>
            <li>
              If you were to carry a balance, would your decision change? How
              so?
            </li>
          </ul>
        </div>

        <div className="relative">
          <textarea
            value={formData.reflection}
            onChange={handleChange}
            className="w-full h-32 p-3 border rounded-md"
            placeholder="Type your reflection here..."
          />
        </div>

        <div>
          <button
            onClick={() => setShowHints(!showHints)}
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <HelpCircleIcon className="w-5 h-5 mr-1" />
            Show Hints
          </button>

          {showHints && (
            <ul className="mt-2 ml-6 text-blue-600 list-disc">
              <li>Consider how often you spend on groceries, travel, or gas</li>
              <li>
                Think about whether you usually pay off your credit card in full
                or carry a balance
              </li>
              <li>Consider which benefits would be most valuable to you</li>
              <li>Think about how the annual fee impacts the overall value</li>
            </ul>
          )}
        </div>

        <div className="flex w-full justify-end">
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
    </div>
  );
}
