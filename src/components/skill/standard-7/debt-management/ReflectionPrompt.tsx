import { HelpCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

const ReflectionPrompt = ({ formData, setFormData }) => {
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
      "why do you think bankruptcy is considered a last resort? What factors should someone consider before deciding to file?"
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  const hints = [
    "Consider which strategy offers the most relief while minimizing long-term financial harm.",
    "Think about how each option aligns with your goals, such as improving credit or avoiding future debt.",
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Reflection</h2>

      <p className="text-gray-600 mb-4">
        Based on what you’ve learned, why do you think bankruptcy is considered
        a last resort? What factors should someone consider before deciding to
        file?
      </p>

      <div className="mb-6">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <HelpCircle className="w-4 h-4 mr-1" />
          {showHint ? "Hide Hints" : "Show Hints"}
        </button>

        {showHint && (
          <ul className="mt-4 p-4 bg-blue-50 rounded-md list-disc list-inside space-y-2 text-blue-600">
            {hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <textarea
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
          rows={4}
          value={formData.reflection}
          onChange={handleChange}
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
};

export default ReflectionPrompt;
