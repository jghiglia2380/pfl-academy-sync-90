import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

function ReflectionSection({ formData, setFormData }) {
  const [showHint, setShowHint] = useState(false);
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
        Why is it important to understand insurance terms like deductibles, co-insurance, and co-payment limits?
        Write a few sentences explaining how understanding these terms can help you plan for medical expenses and make informed decisions about choosing an insurance plan.
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
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Reflection</h2>

      <p className="text-gray-700 mb-4">
        Why is it important to understand insurance terms like deductibles,
        co-insurance, and co-payment limits? Write a few sentences explaining
        how understanding these terms can help you plan for medical expenses and
        make informed decisions about choosing an insurance plan.
      </p>

      <textarea
        rows={6}
        value={formData.reflection}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-4"
        placeholder="Enter your reflection (150-200 words)..."
        maxLength={1000}
      />

      <div className="space-y-4 mb-2">
        <div>
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
        </div>
      </div>

      {showHint && (
        <div className="mt-4 mb-2 bg-blue-50 p-4 rounded-md">
          <h3 className="font-medium text-blue-900 mb-2">Hints to consider:</h3>
          <ul className="list-disc ml-6 text-blue-700 space-y-2">
            <li>
              Consider how these terms affect the total amount you might pay for
              medical bills
            </li>
            <li>
              Think about how understanding limits like the co-insurance cap can
              help you avoid unexpected expenses
            </li>
            <li>
              Reflect on how this knowledge helps in comparing different
              insurance plans
            </li>
          </ul>
        </div>
      )}

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
                <h4 className="text-lg font-bold text-gray-900">AI Feedback</h4>
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
  );
}

export default ReflectionSection;
