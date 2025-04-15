import * as Icons from "lucide-react";

export default function QuestionCard({ question, formData, setFormData }) {
  // Get stored values from global formData or use defaults
  const questionState = formData[question.id] || {
    answers: question.type === "multi-select" ? [] : "",
    showFeedback: false,
    isCorrect: false,
  };

  const { answers, showFeedback, isCorrect } = questionState;

  const Icon = Icons[question.icon as keyof typeof Icons];

  // Validate answers and update global formData
  const validateAnswers = () => {
    let isValid = false;

    if (question.type === "multi-select") {
      // Check if selected answers match the correct ones
      isValid =
        JSON.stringify([...answers].sort()) ===
        JSON.stringify(question.correctAnswer.sort());
    } else if (question.type === "multiple-choice") {
      // Check if the single selected answer matches
      isValid = answers === question.correctAnswer[0];
    }

    // Update global formData
    setFormData((prev) => ({
      ...prev,
      [question.id]: {
        answers,
        showFeedback: true,
        isCorrect: isValid,
      },
    }));
  };

  // Handle answer selection and update global formData
  const handleAnswerChange = (option) => {
    if (question.type === "multi-select") {
      const updatedAnswers = new Set(answers);
      updatedAnswers.has(option)
        ? updatedAnswers.delete(option)
        : updatedAnswers.add(option);
      setFormData((prev) => ({
        ...prev,
        [question.id]: {
          ...prev[question.id],
          answers: Array.from(updatedAnswers),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [question.id]: {
          ...prev[question.id],
          answers: option,
        },
      }));
    }
  };

  // Handle try again and reset feedback
  const handleTryAgain = () => {
    setFormData((prev) => ({
      ...prev,
      [question.id]: {
        answers: question.type === "multi-select" ? [] : "",
        showFeedback: false,
        isCorrect: false,
      },
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">
          {question.question}
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        {question.type === "multi-select" && (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={`${question.id}-option-${index}`}
                  value={option}
                  checked={answers.includes(option)}
                  onChange={() => handleAnswerChange(option)}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <label
                  htmlFor={`${question.id}-option-${index}`}
                  className="text-gray-700"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}

        {question.type === "multiple-choice" && (
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`${question.id}-option-${index}`}
                  name={`multiple-choice-${question.id}`}
                  value={option}
                  checked={answers === option}
                  onChange={() => handleAnswerChange(option)}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <label
                  htmlFor={`${question.id}-option-${index}`}
                  className="text-gray-700"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {!showFeedback ? (
        <button
          onClick={validateAnswers}
          disabled={
            question.type === "multi-select" ? answers.length === 0 : !answers
          }
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          Submit Response
        </button>
      ) : !isCorrect ? (
        <button
          onClick={handleTryAgain}
          className="w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
        >
          Try Again
        </button>
      ) : null}

      {showFeedback && (
        <div
          className={`mt-4 p-4 rounded ${
            isCorrect
              ? "bg-green-50 border-l-4 border-green-400"
              : "bg-blue-50 border-l-4 border-blue-400"
          }`}
        >
          <h4 className="font-semibold text-gray-800 mb-2">
            {isCorrect ? "Great job!" : "Correct Answers:"}
          </h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {question.correctAnswer.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
          <p className="mt-2 text-gray-700">{question.feedback}</p>
        </div>
      )}
    </div>
  );
}
