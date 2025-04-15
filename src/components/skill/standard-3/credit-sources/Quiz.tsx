type QuizProps = {
  answer: string | null;
  onAnswerChange: (answer: string) => void;
};

export function Quiz({ answer, onAnswerChange }: QuizProps) {
  const options = ['Credit Union', 'Consumer Finance Company', 'Payday Lender', 'Online Lender'];
  
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Quiz</h2>
      <p className="text-gray-600 mb-4">Which lender is generally considered the riskiest option?</p>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name="quiz"
              value={option}
              checked={answer === option}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>
      {answer && (
        <div className={`mt-4 p-3 rounded-md ${answer === 'Payday Lender' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {answer === 'Payday Lender' 
            ? 'Correct! Payday lenders often charge extremely high interest rates and fees.'
            : 'Incorrect. Payday lenders are generally considered the riskiest due to their extremely high interest rates and fees.'}
        </div>
      )}
    </div>
  );
}