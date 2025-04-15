import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

export function Analysis({ formData, setFormData }) {
  const [showSample, setShowSample] = useState(false);
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
      `
      User gambling types: ${formData.gamblingTypes}.
      User need to choose one type of gambling from the chart and analyze it.
      `
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiAnalysisResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, analysis: "", aiAnalysisResponse: "" });
  };
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">
        Choose one type of gambling from your chart and analyze it:
      </label>
      <textarea
        value={formData.analysis}
        onChange={handleChange}
        className="w-full p-3 border rounded-md mb-4"
        rows={4}
        placeholder="Write your analysis here..."
      />

      <button
        onClick={() => setShowSample(!showSample)}
        className="flex mb-2 items-center text-blue-600 hover:text-blue-800"
      >
        {showSample ? (
          <ChevronUp className="w-4 h-4 mr-1" />
        ) : (
          <ChevronDown className="w-4 h-4 mr-1" />
        )}
        {showSample ? "Hide Sample Answer" : "View Sample Answer"}
      </button>

      {showSample && (
        <div className="mt-4 mb-2 p-4 bg-blue-50 rounded-md">
          <p className="text-gray-700">
            The lottery is a type of gambling that should be viewed as
            entertainment because the chances of winning are extremely low.
            While buying a ticket might be fun and exciting, it can lead to
            disappointment if people expect to win. Compared to going to a
            concert or movie, the lottery is less interactive and can have
            negative financial consequences if people overspend on tickets.
          </p>
        </div>
      )}

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
                <h4 className="text-lg font-bold text-gray-900">AI Feedback</h4>
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
  );
}
