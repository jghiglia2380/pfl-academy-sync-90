import { ExpandableInput } from "./ExpandableInput";
import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export function ReflectionSection({ formData, setFormData }) {
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
    const caseStudies =
      "What patterns do you notice between risk and potential returns? What might explain these relationships?";
    setLoadingAi(true);
    const response = await generateAiResponse(
      formData.reflection,
      JSON.stringify(caseStudies)
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponseReflection: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponseReflection: "" });
  };
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Reflect on Your Analysis
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What patterns do you notice between risk and potential returns? What
            might explain these relationships?
          </label>
          <ExpandableInput
            value={formData.reflection}
            onChange={(value) => {
              setFormData({ ...formData, reflection: value });
              setWordCount(value.split(" ").length);
            }}
            placeholder="Share your thoughts on the relationship between risk and returns..."
          />
          {formData.reflection && formData.aiResponseReflection ? (
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
                formData.aiResponseReflection && (
                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      AI Feedback
                    </h4>
                    <p className="text-gray-700 mt-2">
                      {formData.aiResponseReflection}
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loadingAi}
              className="w-full bg-indigo-600 text-white mt-4 px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
            >
              {loadingAi ? "Generating AI response..." : "Submit Reflection"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
