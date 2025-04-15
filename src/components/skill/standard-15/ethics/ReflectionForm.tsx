import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export function ReflectionForm({
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
    }
  }, [formData]);

  const caseStudies = [
    {
      title: "Example 1: Illegal Tax Evasion – Al Capone's Downfall",
      content:
        "Al Capone, one of the most notorious crime bosses in U.S. history, was brought down not by his criminal activities but through tax evasion charges. Despite running a lucrative empire through illegal alcohol distribution, gambling, and other illicit businesses, Capone failed to report his income to the IRS. The government's investigation revealed substantial earnings that were never accounted for in tax filings, allowing the prosecution to charge him with tax evasion. In 1931, Capone was convicted and sentenced to 11 years in federal prison.",
    },
    {
      title: "Example 2: Legal Tax Avoidance – Amazon's Global Strategy",
      content:
        "Amazon demonstrates legal tax avoidance through strategic financial planning. In 2021, Amazon reported a federal tax rate of just 6 percent on its U.S. profits of over $35 billion, saving approximately $5.2 billion in federal corporate taxes by using various tax credits and deductions. Additionally, Amazon leverages subsidiaries and moves profits to countries with lower tax rates, like Luxembourg, allowing them to minimize their U.S. tax obligations.",
    },
    {
      reflection:
        "What are your thoughts on these different approaches to taxation? Consider the ethical implications...",
    },
  ];

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
      JSON.stringify(caseStudies)
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
    onReflectionComplete(true);
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 my-6">
      <h3 className="text-xl font-semibold text-indigo-600 mb-4">
        Share Your Reflection
      </h3>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="reflection"
            className="block text-sm font-medium text-slate-700"
          >
            Your Thoughts:
          </label>
          <textarea
            id="reflection"
            rows={6}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="What are your thoughts on these different approaches to taxation? Consider the ethical implications..."
            value={formData.reflection}
            onChange={handleChange}
            required
          />
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
}
