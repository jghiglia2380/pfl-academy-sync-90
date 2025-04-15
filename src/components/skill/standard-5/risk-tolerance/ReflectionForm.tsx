import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export default function ReflectionForm({ formData, setFormData }) {
  const [loadingAi, setLoadingAi] = useState(false);
  const [wordCount, setWordCount] = useState(0);

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
      "Describe your risk tolerance level and which investment options best suit your level. Consider how they align with your financial goals."
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Reflection</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            After completing the quiz, describe your risk tolerance level and
            which investment options best suit your level. Consider how they
            align with your financial goals.
          </label>
          <textarea
            value={formData.reflection}
            onChange={(e) => {
              setFormData({ ...formData, reflection: e.target.value });
              setWordCount(e.target.value.split(" ").length);
            }}
            rows={5}
            className="block w-full rounded-md border-gray-300 shadow-sm"
            required
            minLength={50}
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
      </form>
    </div>
  );
}
