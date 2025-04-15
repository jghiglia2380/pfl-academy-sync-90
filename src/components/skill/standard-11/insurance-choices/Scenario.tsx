import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react';

interface ScenarioProps {
  id: number;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  currentAnswer?: string;
  onAnswer: (id: number, answer: string) => void;
  showExplanation: boolean;
  onToggleExplanation: (id: number) => void;
}

export function Scenario({
  id,
  prompt,
  options,
  correctAnswer,
  explanation,
  currentAnswer,
  onAnswer,
  showExplanation,
  onToggleExplanation,
}: ScenarioProps) {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-medium text-gray-900">
        Situation {id}
      </h3>
      <p className="text-gray-700">{prompt}</p>

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="radio"
              name={`scenario-${id}`}
              value={option}
              checked={currentAnswer === option}
              onChange={() => onAnswer(id, option)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>

      {currentAnswer && (
        <div className="mt-4">
          <div className={`flex items-center space-x-2 ${
            currentAnswer === correctAnswer ? 'text-green-600' : 'text-red-600'
          }`}>
            {currentAnswer === correctAnswer ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <span>
              {currentAnswer === correctAnswer
                ? 'Great job! This is the right choice.'
                : `Not quite. The correct answer is ${correctAnswer}.`}
            </span>
          </div>
          <button
            onClick={() => onToggleExplanation(id)}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
          >
            <HelpCircle className="h-4 w-4" />
            <span>{showExplanation ? 'Hide' : 'Show'} explanation</span>
          </button>
          {showExplanation && (
            <p className="mt-2 text-gray-600 text-sm">{explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}