import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export default function ReflectionPrompt({ formData, setFormData }) {
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
      Compare online and in-store shopping options to make informed purchasing decisions.
      Analyze factors like price, convenience, and delivery time to understand the trade-offs between different shopping methods.
      User selected factors: ${formData.selectedFactors.join(", ")}
      How would your choice change if you didn't have an immediate need for the product?
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="font-medium mb-2">Your Important Factors:</h3>
        {formData?.selectedFactors?.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {formData?.selectedFactors.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">
            No factors selected yet. Check the boxes above to mark important
            factors.
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="reflection" className="block font-medium mb-2">
          How would your choice change if you didn't have an immediate need for
          the product?
        </label>
        <div className="relative">
          <textarea
            id="reflection"
            value={formData?.reflection}
            onChange={(e) => handleChange(e)}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your reflection here..."
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowHint(!showHint)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>
      </div>

      {showHint && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <h4 className="font-medium mb-2">Hints to consider:</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              Think about how price savings compare to the convenience of
              immediate use
            </li>
            <li>
              Consider how return policies might influence your confidence in
              the purchase
            </li>
            <li>
              Evaluate the trade-offs between waiting for delivery and potential
              cost savings
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
          className="w-full bg-indigo-600 mt-4 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
        >
          {loadingAi ? "Generating AI response..." : "Submit Reflection"}
        </button>
      )}
    </div>
  );
}
