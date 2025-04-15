import { useState } from "react";

export default function MatchingActivity({
  investments,
  formData,
  setFormData,
}) {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFeedback(true);
    setFormData((prev) => ({
      ...prev,
      matchingAnswers: prev.matchingAnswers || {},
      showMatchingFeedback: true,
    }));
  };

  const handleChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      matchingAnswers: {
        ...prev.matchingAnswers,
        [id]: value,
      },
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-bold mb-6">
        Match Investments to Risk Levels
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {investments.map((investment) => (
          <div key={investment.id} className="border p-4 rounded">
            <h3 className="font-medium mb-2">{investment.name}</h3>
            <p className="text-sm text-gray-600 mb-3">
              {investment.description}
            </p>
            <select
              value={formData.matchingAnswers?.[investment.id] || ""}
              onChange={(e) => handleChange(investment.id, e.target.value)}
              className="block w-full rounded border-gray-300"
              required
            >
              <option value="">Select risk level...</option>
              <option value="Conservative">Conservative</option>
              <option value="Moderate">Moderate</option>
              <option value="Aggressive">Aggressive</option>
            </select>

            {formData.showMatchingFeedback && (
              <div
                className={`mt-2 text-sm ${
                  formData.matchingAnswers?.[investment.id] === investment.risk
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formData.matchingAnswers?.[investment.id] === investment.risk
                  ? "Correct!"
                  : `Incorrect. The answer is ${investment.risk}`}
              </div>
            )}
          </div>
        ))}

        {!formData.showMatchingFeedback && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
          >
            Check Answers
          </button>
        )}
      </form>
    </div>
  );
}
