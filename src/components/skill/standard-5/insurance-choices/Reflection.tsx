import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export function Reflection({ formData, setFormData }) {
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
        Why is it important to choose the right type of insurance for each situation?
        Write a few sentences explaining how having the right coverage can protect you from financial loss.
      `
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  const onToggleHint = () => {
    setShowHint((prev) => !prev);
  };
  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Reflection</h3>
      <p className="text-gray-700 mb-4">
        Why is it important to choose the right type of insurance for each
        situation? Write a few sentences explaining how having the right
        coverage can protect you from financial loss.
      </p>
      <textarea
        value={formData.reflection}
        onChange={handleChange}
        rows={4}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Enter your reflection here..."
      />
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <button
          onClick={onToggleHint}
          className="text-blue-600 hover:text-blue-800"
        >
          {showHint ? "Hide hint" : "Show hint"}
        </button>
      </div>
      {showHint && (
        <div className="mt-3 bg-blue-50 p-4 rounded-lg text-sm text-blue-700">
          <p className="font-medium text-blue-800 mb-2">Hints to consider:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Think about how insurance can protect against unexpected costs,
              like medical bills or property damage.
            </li>
            <li>
              Consider how different insurance types meet specific needs, such
              as liability or comprehensive coverage.
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
          className="w-full mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
        >
          {loadingAi ? "Generating AI response..." : "Submit Reflection"}
        </button>
      )}
    </div>
  );
}
