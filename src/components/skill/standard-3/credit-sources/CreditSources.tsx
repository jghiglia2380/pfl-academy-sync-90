import { Wallet2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

import { ScenarioSelector } from "./ScenarioSelector";
import { LenderDetails } from "./LenderDetails";
import { Quiz } from "./Quiz";
import { CreditSourcesTable } from "./CreditSourcesTable";

export default function CreditSources({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedScenario: prev.selectedScenario || 0,
      reflection: prev.reflection || "",
      quizAnswer: prev.quizAnswer || null,
    }));
  }, []);

  const [expandedLender, setExpandedLender] = useState<string | null>(null);
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
      "why do you think payday lenders continue to be legal despite their high costs?"
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  useEffect(() => {
    if (
      formData.reflection &&
      formData.aiResponse &&
      formData.quizAnswer !== null
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-center py-8">
        <div className="flex justify-center mb-4">
          <Wallet2 className="w-12 h-12 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">
          Understanding Credit Sources
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn about different types of lenders and make informed borrowing
          decisions. Explore various credit options and their terms.
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <ScenarioSelector
              scenarios={section.scenarios}
              selectedScenario={formData.selectedScenario}
              onScenarioChange={(val) =>
                setFormData((prev) => ({ ...prev, selectedScenario: val }))
              }
            />

            <div className="bg-blue-50 p-4 rounded-md mb-8">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                Analysis
              </h2>
              <p className="text-blue-800 mb-2">
                <strong>Best Lender:</strong>{" "}
                {section.scenarios[formData.selectedScenario]?.bestLender}
              </p>
              <p className="text-blue-800">
                <strong>Reasoning:</strong>{" "}
                {section.scenarios[formData.selectedScenario]?.reasoning}
              </p>
            </div>

            {/* Credit Sources Table */}
            <CreditSourcesTable scenarios={section.scenarios} />

            {/* Lender Information */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Lender Details
              </h2>
              {Object.values(section.lenderInfo).map((info) => (
                <LenderDetails
                  key={info.name}
                  lender={info}
                  isExpanded={expandedLender === info.name}
                  onToggle={() =>
                    setExpandedLender(
                      expandedLender === info.name ? null : info.name
                    )
                  }
                />
              ))}
            </div>

            {/* Reflection Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Credit Sources Evaluation
              </h2>
              <p className="text-gray-600 mb-4">
                Based on what you've learned, why do you think payday lenders
                continue to be legal despite their high costs?
              </p>
              <div className="relative">
                <textarea
                  className="block w-full mb-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={4}
                  value={formData.reflection}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your reflection here..."
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
                        <p className="text-gray-700">
                          Generating AI feedback...
                        </p>
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
                    {loadingAi
                      ? "Generating AI response..."
                      : "Submit Reflection"}
                  </button>
                )}
              </div>
            </div>

            <Quiz
              answer={formData.quizAnswer}
              onAnswerChange={(val) =>
                setFormData((prev) => ({ ...prev, quizAnswer: val }))
              }
            />

            {/* Footer */}
            <div className="border-t pt-6 mt-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  The information provided is for educational purposes and may
                  vary based on local laws.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
