import { HelpCircle, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";

const LoanEvaluationStrategy: React.FC = ({ formData, setFormData }) => {
  const [showHint, setShowHint] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);

  const minCharCount = 150;

  const handleSubmit = async () => {
    setLoadingAi(true);
    const response = await generateAiResponse(
      formData.reflection,
      "Which type of loan do you think would be the most challenging to manage over time, and why? If you had to borrow money for a large purchase (e.g., a car or education), which loan type would you choose and what factors would influence your decision?"
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Loan Evaluation Strategy
      </h2>
      <p className="text-gray-700 mb-4">
        Which type of loan do you think would be the most challenging to manage
        over time, and why? If you had to borrow money for a large purchase
        (e.g., a car or education), which loan type would you choose and what
        factors would influence your decision?
      </p>

      <div className="mb-4">
        <button
          onClick={() => setShowHint(!showHint)}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <HelpCircle className="h-4 w-4 mr-1" />
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>

        {showHint && (
          <div className="mt-2 p-4 bg-blue-50 rounded-md text-sm text-gray-700">
            <ul className="list-disc list-inside space-y-1">
              <li>
                Consider factors like interest rates, repayment terms, and fees
              </li>
              <li>
                Think about your financial goals and whether the loan aligns
                with your ability to repay
              </li>
              <li>
                Consider the impact of different repayment periods on your
                monthly budget
              </li>
              <li>
                Think about the consequences of missing payments or defaulting
              </li>
            </ul>
          </div>
        )}
      </div>

      <textarea
        value={formData.reflection}
        onChange={(e) => {
          setFormData({ ...formData, reflection: e.target.value });
        }}
        placeholder="Enter your response here..."
        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />

      <div className="text-right text-sm text-gray-500 mt-1">
        <span
          className={
            formData.reflection?.length < minCharCount
              ? "text-red-600"
              : "text-gray-600"
          }
        >
          {" "}
          {formData.reflection?.length}{" "}
        </span>{" "}
        / {minCharCount} (min) characters
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
                <h4 className="text-lg font-bold text-gray-900">AI Feedback</h4>
                <p className="text-gray-700 mt-2">{formData.aiResponse}</p>
              </div>
            )
          )}
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={loadingAi || formData.reflection?.length < minCharCount}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
        >
          {loadingAi ? "Generating AI response..." : "Submit Reflection"}
        </button>
      )}
    </div>
  );
};

export default LoanEvaluationStrategy;
