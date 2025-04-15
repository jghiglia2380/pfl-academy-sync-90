import React, { useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export const ReflectionPrompt = ({ formData, setFormData }) => {
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
        In this activity, you'll help Alex, a fictional first-year college student, create a detailed budget by analyzing expenses and exploring strategies to minimize borrowing.
        What strategies would you recommend for Alex to lower his total borrowing needs?
        How might reducing personal expenses impact Alex's overall college experience?
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
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Understanding Student Loans
      </h2>

      <div className="space-y-4">
        <div>
          <p className="mb-2 font-medium">
            What strategies would you recommend for Alex to lower his total
            borrowing needs?
          </p>
          <p className="mb-2">
            How might reducing personal expenses impact Alex's overall college
            experience?
          </p>
        </div>

        <div className="relative">
          <textarea
            value={formData.reflection}
            onChange={(e) => handleChange(e)}
            className="w-full h-32 p-3 border rounded-md"
            placeholder="Enter your response here..."
          />
        </div>

        {showHint && (
          <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
            <p>Hints to consider:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                Consider practical cost-saving strategies like scholarships,
                meal planning, or housing adjustments
              </li>
              <li>
                Think about the balance between financial savings and
                maintaining a positive college experience
              </li>
              <li>
                Look for opportunities to reduce costs without sacrificing
                academic success
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
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
        </div>
      </div>
    </div>
  );
};
