import { useState } from "react";
import { FileText } from "lucide-react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export default function ScenarioCard({ scenario, formData, setFormData }) {
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

    const promt = `You need to pay for your college tuition. The university accepts payments through online banking, credit cards, debit cards, and checks. You don't want to carry cash or use a check. Which payment method would you choose, and why? What are the advantages and disadvantages of your choice?`;
    const response = await generateAiResponse(formData.reflection, promt);
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-4">
        <FileText className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">
          {scenario.title}
        </h3>
      </div>

      <p className="text-gray-600 mb-6">{scenario.description}</p>

      <div className="mb-4">
        <textarea
          value={formData.reflection}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Type your response here..."
        />
        <p className="text-sm text-gray-500 mt-2">
          Word count: {wordCount} / {15} minimum
        </p>
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
          disabled={loadingAi}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
        >
          {loadingAi ? "Generating AI response..." : "Submit Reflection"}
        </button>
      )}

      {wordCount >= 15 && (
        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <h4 className="font-semibold text-blue-800 mb-2">Example Answer:</h4>
          <p className="text-blue-700">{scenario.exampleAnswer}</p>
        </div>
      )}
    </div>
  );
}
