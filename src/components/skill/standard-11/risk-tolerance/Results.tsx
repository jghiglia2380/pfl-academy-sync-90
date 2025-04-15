function getRiskProfile(score) {
  // With 5 questions, score range is 5-15 points
  if (score <= 8)
    return {
      type: "Conservative",
      description:
        "You prefer preserving capital and avoiding significant risk. Consider investments like high-yield savings accounts, CDs, and government bonds.",
    };
  if (score <= 12)
    return {
      type: "Moderate",
      description:
        "You are comfortable with a balanced level of risk for growth and stability. Consider a mix of stocks and bonds, balanced mutual funds, and some real estate investments.",
    };
  return {
    type: "Aggressive",
    description:
      "You seek high returns and can tolerate significant fluctuations. Consider growth stocks, emerging markets, and other high-potential investments while maintaining some diversification.",
  };
}

export default function Results({ score, formData, setFormData }) {
  const profile = getRiskProfile(score);

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-bold mb-4">Your Risk Tolerance Profile</h2>
      <div className="mb-4">
        <span className="text-lg font-medium">Score: {score} out of 15</span>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-medium mb-2">{profile.type} Investor</h3>
        <p className="text-gray-600">{profile.description}</p>
      </div>

      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        onClick={() =>
          setFormData({ ...formData, showResults: false, quizScore: 0 })
        }
      >
        Reset Assessment
      </button>
    </div>
  );
}
