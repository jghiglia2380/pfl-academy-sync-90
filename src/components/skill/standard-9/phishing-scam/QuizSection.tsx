import { useEffect } from "react";

export function QuizSection({ formData, setFormData }) {
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedAnswer: prev.selectedAnswer || null,
    }));
  }, []);

  const handleQuizSubmit = (answer) => {
    setFormData((prev) => ({
      ...prev,
      selectedAnswer: answer,
      isQuizCorrect: answer === "d",
    }));
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Quick Check</h2>
      <p className="mb-4 text-gray-700">
        What is a major red flag that an email might be a phishing attempt?
      </p>
      <div className="space-y-3">
        {[
          { id: "a", text: "A professional company logo" },
          { id: "b", text: "A request for your Social Security number" },
          { id: "c", text: "A free gift offer" },
          { id: "d", text: "Both (b) and (c)" },
        ].map((option) => (
          <button
            key={option.id}
            className={`w-full p-3 text-left rounded-lg border transition-colors ${
              formData.selectedAnswer === option.id
                ? option.id === "d"
                  ? "bg-green-100 border-green-500"
                  : "bg-red-100 border-red-500"
                : "hover:bg-gray-50 border-gray-200"
            }`}
            onClick={() => handleQuizSubmit(option.id)}
          >
            {option.text}
          </button>
        ))}
      </div>
      {formData.selectedAnswer && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            formData.selectedAnswer === "d"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {formData.selectedAnswer === "d"
            ? "Correct! Both requests for sensitive information and too-good-to-be-true offers are common phishing tactics."
            : "Try again! Look for multiple red flags in suspicious emails."}
        </div>
      )}
    </section>
  );
}
