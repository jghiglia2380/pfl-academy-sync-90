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
      `
        These are the user's Identity Protection Checklist responses: ${formData.checklist}
        After completing your checklist, reflect on your own digital habits.
        Are there any areas where you're more vulnerable to identity theft? 
        Choose one of the items you created and describe why it's particularly important for you.
        Write 2-3 sentences explaining how you'll implement this action in your daily life.
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
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Reflection</h2>

      <p className="text-gray-600 mb-4">
        After completing your checklist, reflect on your own digital habits. Are
        there any areas where you're more vulnerable to identity theft? Choose
        one of the items you created and describe why it's particularly
        important for you. Write 2-3 sentences explaining how you'll implement
        this action in your daily life.
      </p>

      <div className="mb-2">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>
      </div>

      {showHint && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded text-sm">
          <ul className="list-disc list-inside">
            <li>Consider your daily online activities and habits</li>
            <li>
              Think about which protection strategy would make the biggest
              impact
            </li>
            <li>Be specific about how you'll implement the change</li>
          </ul>
        </div>
      )}

      <textarea
        value={formData.reflection}
        onChange={handleChange}
        className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        rows="4"
        placeholder="Write your reflection here..."
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
};

export default ReflectionSection;
