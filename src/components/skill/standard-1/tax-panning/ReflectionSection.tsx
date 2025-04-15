import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export default function ReflectionSection({
  formData,
  setFormData,
  onReflectionComplete,
}) {
  const [loadingAi, setLoadingAi] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, reflection: e.target.value });
    setWordCount(e.target.value.split(/\s/).filter((w) => w !== "").length);
  };

  useEffect(() => {
    if (formData.reflection && formData.aiResponse) {
      onReflectionComplete(true);
    } else {
      onReflectionComplete(false);
    }
  }, [formData]);

  const promt =
    "Based on what you've learned, what is one key tax strategy you could implement this year to maximize your financial well-being? Provide an example to support your answer.";

  const handleSubmit = async () => {
    if (wordCount < 15) {
      toast.warning("Please write at least 15 words before submitting.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    setLoadingAi(true);
    const response = await generateAiResponse(formData.reflection, promt);
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
    onReflectionComplete(true);
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Reflection</h2>
      <p className="text-gray-600 mb-4">
        Based on what you've learned, what is one key tax strategy you could
        implement this year to maximize your financial well-being? Provide an
        example to support your answer.
      </p>
      <textarea
        value={formData.reflection}
        onChange={(e) => handleChange(e)}
        rows={4}
        readOnly={formData.reflection && formData.aiResponse}
        className="w-full px-3 py-2 border rounded-md"
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
    </section>
  );
}
