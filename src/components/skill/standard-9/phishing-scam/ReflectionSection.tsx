import { HelpCircle } from "lucide-react";
import React, { useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export function ReflectionSection({ formData, setFormData }) {
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
      ` think about a time when you or someone you know received a suspicious message or email.
        How would you approach educating others about staying safe online, while keeping the conversation supportive and helpful?
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
    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Understanding the video</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">
            After watching the video, think about a time when you or someone you
            know received a suspicious message or email. How would you approach
            educating others about staying safe online, while keeping the
            conversation supportive and helpful?
          </label>
          <div className="relative">
            <textarea
              className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.reflection}
              onChange={handleChange}
              placeholder="Share your thoughts here..."
            />
          </div>
          <button
            className="mt-2 flex mb-2 items-center text-blue-600 hover:text-blue-700"
            onClick={() => setShowHint(!showHint)}
          >
            <HelpCircle className="w-4 h-4 mr-1" />
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
          {showHint && (
            <div className="mt-2 p-4 mb-2 bg-blue-50 rounded-lg text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Focus on explaining the warning signs clearly, like fake email
                  addresses or requests for personal information
                </li>
                <li>
                  Think about how to keep the conversation positive and
                  encouraging
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
                      <p className="text-gray-700 mt-2">
                        {formData.aiResponse}
                      </p>
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
    </section>
  );
}
