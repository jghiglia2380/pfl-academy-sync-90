import { useState } from "react";

function Quiz({ questions, formData, setFormData }) {
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId, optionId) => {
    setFormData((prev) => ({
      ...prev,
      quizAnswers: {
        ...prev.quizAnswers,
        [questionId]: optionId,
      },
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question) => {
      const correctOption = question.options.find((opt) => opt.correct);
      if (formData.quizAnswers?.[question.id] === correctOption.id) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Knowledge Check
      </h2>

      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="space-y-3">
            <p className="text-gray-900">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option) => (
                <label key={option.id} className="flex items-center">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option.id}
                    checked={formData.quizAnswers?.[question.id] === option.id}
                    onChange={() => handleAnswer(question.id, option.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">{option.text}</span>
                </label>
              ))}
            </div>
            {showResults && (
              <div className="text-sm mt-2">
                {formData.quizAnswers?.[question.id] ===
                question.options.find((opt) => opt.correct).id ? (
                  <p className="text-green-600">Correct!</p>
                ) : (
                  <p className="text-red-600">Incorrect</p>
                )}
              </div>
            )}
          </div>
        ))}

        {formData.quizAnswers && showResults ? (
          <p className="mt-4 text-gray-700">
            You got {calculateScore()} out of {questions.length} questions
            correct!
          </p>
        ) : (
          <button
            onClick={() => setShowResults(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Check Answers
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
