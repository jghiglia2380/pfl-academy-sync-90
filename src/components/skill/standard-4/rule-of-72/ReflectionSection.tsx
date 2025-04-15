import { ReflectionInput } from "./ReflectionInput";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";

const reflectionQuestions = [
  {
    id: 1,
    question:
      "Using the Rule of 72, which interest rate would double your savings the fastest?",
  },
  {
    id: 2,
    question:
      "Explain why a higher interest rate has a significant impact on the doubling time.",
  },
  {
    id: 3,
    question:
      "Describe one situation where choosing a lower interest rate might be more favorable despite the slower doubling time.",
  },
];

export function ReflectionSection({ formData, setFormData }) {
  const [loadingAi, setLoadingAi] = useState(false);
  const [wordCount, setWordCount] = useState({});

  const handleAnswerChange = (id, value) => {
    console.log(id, value);
    setFormData((prev) => ({
      ...prev,
      reflection: {
        ...prev.reflection,
        [id]: value,
      },
    }));

    setWordCount((prev) => ({
      ...prev,
      [id]: (value || "")
        .toString()
        .split(/\s+/)
        .filter((w) => w !== "").length,
    }));
  };

  const handleSubmit = async (id) => {
    if ((wordCount[id] || 0) < 15) {
      toast.warning("Please write at least 15 words before submitting.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    setLoadingAi(true);
    const response = await generateAiResponse(formData.reflection[id], id);
    setLoadingAi(false);

    setFormData((prev) => ({
      ...prev,
      aiResponse: {
        ...prev.aiResponse,
        [id]: response,
      },
    }));
  };

  const handleRevise = (id) => {
    setFormData((prev) => ({
      ...prev,
      reflection: {
        ...prev.reflection,
        [id]: "",
      },
      aiResponse: {
        ...prev.aiResponse,
        [id]: "",
      },
    }));
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Reflection</h3>
      <div className="space-y-6">
        {reflectionQuestions.map((q) => (
          <div key={q.id} className="mb-6">
            <label className="block text-gray-700 font-medium">
              {q.id}. {q.question}
            </label>
            <ReflectionInput
              questionId={q.id}
              value={formData.reflection?.[q.id] || ""}
              onChange={handleAnswerChange} // Pass directly instead of wrapping it
              placeholder="Enter your response here..."
            />
            {formData.reflection?.[q.id] && formData.aiResponse?.[q.id] ? (
              <div>
                <div className="flex w-full mt-2">
                  <button
                    onClick={() => handleRevise(q.id)}
                    className="bg-indigo-600 w-full text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Revise Response
                  </button>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    AI Feedback
                  </h4>
                  <p className="text-gray-700 mt-2">
                    {formData.aiResponse[q.id]}
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleSubmit(q.id)}
                disabled={loadingAi}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 mt-2"
              >
                {loadingAi ? "Generating AI response..." : "Submit Reflection"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
