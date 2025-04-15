import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

const ReflectionSection = ({ formData, setFormData }) => {
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
      "Why is it important to set limits and treat gambling like any other form of entertainment?"
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  const hints = [
    "Think about how setting a budget and time limit can prevent unhealthy habits.",
    "Consider how treating gambling as entertainment helps maintain financial and emotional balance.",
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Reflection</h2>

      <div className="space-y-4">
        <p className="text-gray-600">
          Why is it important to set limits and treat gambling like any other
          form of entertainment?
        </p>

        <textarea
          value={formData.reflection}
          onChange={handleChange}
          rows={4}
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
          placeholder="Write your reflection here (150 words max)..."
        />

        <div>
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
          >
            {showHint ? "Hide" : "Show"} Hints
          </button>

          {showHint && (
            <ul className="mt-2 pl-5 list-disc text-gray-600 text-sm">
              {hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          )}
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
      </div>
    </section>
  );
};

export default ReflectionSection;
