export function ComparisonChart({ userAnswers, onInputChange, aiFeedback }) {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-3 gap-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Category</h2>
        <h2 className="text-2xl font-bold text-gray-900">Saving</h2>
        <h2 className="text-2xl font-bold text-gray-900">Investing</h2>
      </div>

      {userAnswers.map((answer, index) => (
        <div key={answer.category} className="grid grid-cols-3 gap-6 mb-6">
          <h3 className="text-xl font-semibold text-blue-600">
            {answer.category}
          </h3>
          <div>
            <textarea
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              rows={3}
              value={answer.saving}
              onChange={(e) => onInputChange(index, "saving", e.target.value)}
            />
          </div>
          <div>
            <textarea
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              rows={3}
              value={answer.investing}
              onChange={(e) =>
                onInputChange(index, "investing", e.target.value)
              }
            />
          </div>
          {aiFeedback && aiFeedback[index] && (
            <div className="col-span-3 bg-gray-100 p-3 rounded-md text-gray-700">
              {aiFeedback[index]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
