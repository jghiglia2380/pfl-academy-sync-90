import { useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

function ReflectionPrompt({ formData, setFormData }) {
  const [loadingAi, setLoadingAi] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      reflections: {
        ...prev.reflections,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!formData.reflections?.question1 || !formData.reflections?.question2) {
      toast.warning(
        "Please complete both reflection questions before submitting."
      );
      return;
    }

    setLoadingAi(true);
    const responses = await Promise.all([
      generateAiResponse(
        formData.reflections.question1,
        "Why do you think consumer credit laws are necessary?"
      ),
      generateAiResponse(
        formData.reflections.question2,
        "If you could create a new consumer credit law, what issue would it address, and why?"
      ),
    ]);

    setFormData((prev) => ({
      ...prev,
      aiFeedback: {
        question1: responses[0],
        question2: responses[1],
      },
    }));
    setLoadingAi(false);
  };

  const handleRevise = () => {
    setFormData((prev) => ({
      ...prev,
      reflections: {},
      aiFeedback: {},
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Understanding Consumer Credit Laws
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Why do you think consumer credit laws are necessary?
          </label>
          <textarea
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter your response..."
            value={formData.reflections?.question1 || ""}
            onChange={(e) => handleChange("question1", e.target.value)}
            maxLength={250}
          />
          {formData.aiFeedback?.question1 && (
            <p className="text-sm text-blue-900 mt-2 bg-blue-50 p-2 rounded-md">
              <span className="font-semibold">AI Feedback:</span>{" "}
              {formData.aiFeedback.question1}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            If you could create a new consumer credit law, what issue would it
            address, and why?
          </label>
          <textarea
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter your response..."
            value={formData.reflections?.question2 || ""}
            onChange={(e) => handleChange("question2", e.target.value)}
            maxLength={250}
          />
          {formData.aiFeedback?.question2 && (
            <p className="text-sm text-blue-900 mt-2 mb-2 bg-blue-50 p-2 rounded-md">
              <span className="font-semibold">AI Feedback:</span>{" "}
              {formData.aiFeedback.question2}
            </p>
          )}
        </div>
      </div>

      {formData.reflections && formData.aiFeedback ? (
        <div>
          <div className="flex w-full mb-4">
            <button
              onClick={handleRevise}
              className="bg-indigo-600 w-full text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Revise Response
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={loadingAi}
          className="w-full bg-indigo-600 text-white py-3 px-6 mt-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
        >
          {loadingAi ? "Generating AI Feedback..." : "Submit Reflection"}
        </button>
      )}
    </div>
  );
}

export default ReflectionPrompt;
