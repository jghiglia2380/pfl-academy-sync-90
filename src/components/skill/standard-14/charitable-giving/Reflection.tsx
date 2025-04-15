import { QuestionTooltip } from "./QuestionTooltip";
import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export default function Reflection({ formData, setFormData }) {
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
      "Why is it important to give back to the community?"
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };
  return (
    <div className="bg-white shadow rounded-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">
          Plan & Reflection
        </h2>
        <QuestionTooltip text="Share your thoughts on giving back to the community" />
      </div>
      <div className="space-y-8">
        <div>
          <label
            htmlFor="plan"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Summarize your charitable giving plan
          </label>
          <p className="text-gray-600 mb-3">
            Explain why you chose this cause, what type of contribution you'll
            make, and what impact you hope to have.
          </p>
          <textarea
            id="plan"
            name="plan"
            rows={4}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
            value={formData.plan}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, plan: e.target.value })
            }
          />
        </div>

        <div>
          <label
            htmlFor="reflection"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Why is it important to give back to the community?
          </label>
          <textarea
            id="reflection"
            name="reflection"
            rows={4}
            className="block w-full rounded-lg border-gray-300 mb-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
            value={formData.reflection}
            onChange={handleChange}
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
    </div>
  );
}
