import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

function ReflectionPrompt({ formData, setFormData }) {
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
        Risk Management Strategies: Avoiding, Reducing, Accepting, and Transferring Risk.
        How do you see yourself using these risk management strategies in your own life?
        Choose one strategy that you think is the most useful and describe a situation where you might apply it...
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          How do you see yourself using these risk management strategies in your
          own life? Choose one strategy that you think is the most useful and
          describe a situation where you might apply it...
        </label>
      </div>

      <textarea
        value={formData.reflection}
        onChange={handleChange}
        rows={4}
        className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
      />

      <button
        type="button"
        onClick={() => setShowHint(!showHint)}
        className="text-sm text-indigo-600 hover:text-indigo-500"
      >
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>

      {showHint && (
        <div className="rounded-md bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Helpful Prompts
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Think about situations where you've faced risks before and
                    how you handled them
                  </li>
                  <li>
                    Consider which strategy might be easiest or most practical
                    to apply in your daily life
                  </li>
                </ul>
              </div>
            </div>
          </div>
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

export default ReflectionPrompt;
