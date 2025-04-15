import { useState } from 'react';

export default function Quiz({ questions, onComplete }) {
  const [answers, setAnswers] = useState({});

  function calculateScore(answers) {
    return Object.values(answers).reduce((sum, points) => sum + points, 0);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculateScore(answers);
    onComplete(score);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((q) => (
        <div key={q.id} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">{q.question}</h3>
          <div className="space-y-2">
            {q.options.map((option, idx) => (
              <label key={idx} className="flex items-center space-x-3 p-3 rounded hover:bg-gray-50">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option.points}
                  onChange={(e) => setAnswers({
                    ...answers,
                    [q.id]: parseInt(e.target.value)
                  })}
                  required
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">{option.text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      
      <button
        type="submit"
        disabled={Object.keys(answers).length !== questions.length}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Quiz
      </button>
    </form>
  );
}