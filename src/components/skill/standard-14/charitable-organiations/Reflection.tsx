import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

function Reflection({ formData, setFormData }) {
  const [showHints, setShowHints] = useState(false);
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
      "Why is it important to investigate a charity before making a donation?"
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  const hints = [
    "Consider how verifying a charity ensures your money is used for its intended purpose.",
    "Think about the consequences of donating to a fraudulent or inefficient organization.",
  ];

  return (
    <CollapsibleSection title="Reflection">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="reflection"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Why is it important to investigate a charity before making a
            donation?
          </label>
          <textarea
            id="reflection"
            name="reflection"
            rows={4}
            className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md p-3"
            value={formData.reflection}
            onChange={handleChange}
          />
        </div>

        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setShowHints(!showHints)}
        >
          <Lightbulb className="h-5 w-5 mr-2 text-blue-500" />
          Show Hints
        </button>

        {showHints && (
          <div className="mt-4 bg-blue-50 p-4 rounded-md">
            <h4 className="text-sm font-medium text-blue-800 mb-2">
              Helpful Hints
            </h4>
            <ul className="space-y-2">
              {hints.map((hint, index) => (
                <li key={index} className="text-blue-700">
                  {hint}
                </li>
              ))}
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
      </div>
    </CollapsibleSection>
  );
}

export default Reflection;
