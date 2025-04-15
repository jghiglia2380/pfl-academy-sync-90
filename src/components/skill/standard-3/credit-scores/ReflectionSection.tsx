import { HelpCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export function ReflectionSection({ formData, setFormData }) {
  const [showHint, setShowHint] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const onChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, reflection: value });
    setWordCount(value.split(/\s/).filter((w) => w !== "").length);
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

    const promt = `
    Learn how different factors affect your credit score and get tips for improvement.
    categories: Payment History, Credit Utilization, Length of Credit History, Types of Credit, New Credit.
    Based on these categories:
    Which factor do you think would be easiest for you to control and improve?
    Which one might be the most challenging, and why?
    `;

    const response = await generateAiResponse(formData.reflection, promt);
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Understanding Your Credit Score
      </h2>
      <div className="space-y-4">
        <p className="text-gray-700">Based on these categories:</p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>
            Which factor do you think would be easiest for you to control and
            improve?
          </li>
          <li>Which one might be the most challenging, and why?</li>
        </ul>

        <div className="relative">
          <textarea
            value={formData.reflection}
            onChange={onChange}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Share your thoughts here..."
          />
        </div>

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

        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <HelpCircle className="w-4 h-4 mr-1" />
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
        </div>

        {showHint && (
          <div className="mt-2 p-4 bg-blue-50 rounded-lg text-gray-700">
            <p className="mb-2">Consider:</p>
            <ul className="list-disc list-inside text-gray-600">
              <li>
                Factors that are directly within your control, like payment
                history and credit utilization
              </li>
              <li>
                Long-term habits, like building a credit history or managing new
                credit applications
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
