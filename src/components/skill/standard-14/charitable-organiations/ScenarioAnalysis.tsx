import React, { useState } from "react";
import CollapsibleSection from "./CollapsibleSection";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

function ScenarioAnalysis({ formData, setFormData }) {
  const [loadingAi, setLoadingAi] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, analysis: e.target.value });
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
      formData.analysis,
      "Imagine you receive a phone call from a telemarketer asking you to donate to a charity claiming to provide food for families in need. What steps would you take to verify this is a legitimate organization?"
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiAnalysisResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, analysis: "", aiAnalysisResponse: "" });
  };
  return (
    <CollapsibleSection title="Scenario Analysis: Avoiding Charity Scams">
      <div className="space-y-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Imagine you receive a phone call from a telemarketer asking you
                to donate to a charity claiming to provide food for families in
                need. What steps would you take to verify this is a legitimate
                organization?
              </p>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="response"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Response
          </label>
          <textarea
            id="response"
            name="response"
            rows={4}
            className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md p-3"
            value={formData.analysis}
            onChange={handleChange}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Example Actions
          </h4>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
            <li>
              Research the charity online to check if it has a reputable
              presence
            </li>
            <li>Check independent charity watchdog sites for legitimacy</li>
            <li>
              Request written information about the organization before making a
              decision
            </li>
          </ul>
        </div>
        {formData.analysis && formData.aiAnalysisResponse ? (
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
              formData.aiAnalysisResponse && (
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    AI Feedback
                  </h4>
                  <p className="text-gray-700 mt-2">
                    {formData.aiAnalysisResponse}
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
            {loadingAi ? "Generating AI response..." : "Submit Analysis"}
          </button>
        )}
      </div>
    </CollapsibleSection>
  );
}

export default ScenarioAnalysis;
