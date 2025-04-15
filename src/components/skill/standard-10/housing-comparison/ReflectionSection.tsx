import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export default function ReflectionSection({ formData, setFormData }) {
  const [loadingAi, setLoadingAi] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

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
        User comparison housing options: ${formData.housingData}
        User top priorities: ${formData.priorities}
        Based on your quick comparison, which housing option best aligns with your top priorities and current needs?
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
    <div className="bg-white shadow rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Understanding Your Choice
      </h2>
      <p className="text-gray-600 mb-4">
        Based on your quick comparison, which housing option best aligns with
        your top priorities and current needs?
      </p>
      <div className="mb-4">
        <textarea
          value={formData.reflection}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Write 2-3 sentences explaining your choice..."
        />
      </div>
      <button
        onClick={() => setShowHint(!showHint)}
        className="text-blue-600 mb-4 hover:text-blue-800 text-sm font-medium"
      >
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>
      {showHint && (
        <div className="mt-2 mb-4 text-sm text-gray-600">
          <ul className="list-disc list-inside space-y-1">
            <li>
              Think about which option meets your most important priority, like
              budget or location.
            </li>
            <li>
              Consider the trade-offs between short-term convenience and
              long-term benefits.
            </li>
          </ul>
        </div>
      )}
      <div className="flex items-center justify-between">
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
