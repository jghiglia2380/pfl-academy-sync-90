import { Calculator } from "lucide-react";

export default function ScenarioActivity({ scenario, formData, setFormData }) {
  // Get stored values from global formData or use defaults
  const selectedOption = formData[scenario.id]?.selectedOption || "";
  const explanation = formData[scenario.id]?.explanation || "";
  const showFeedback = formData[scenario.id]?.showFeedback || false;

  // Handle selection change and update global formData
  const handleOptionChange = (optionId: string) => {
    setFormData((prev) => ({
      ...prev,
      [scenario.id]: {
        ...prev[scenario.id],
        selectedOption: optionId,
      },
    }));
  };

  // Handle explanation change and update global formData
  const handleExplanationChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [scenario.id]: {
        ...prev[scenario.id],
        explanation: e.target.value,
      },
    }));
  };

  // Handle submission and show feedback in global formData
  const handleSubmit = () => {
    setFormData((prev) => ({
      ...prev,
      [scenario.id]: {
        ...prev[scenario.id],
        showFeedback: true,
      },
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Quick Decision Tax Scenario
      </h2>
      <p className="text-gray-600 mb-6">{scenario.description}</p>

      <div className="space-y-6">
        {scenario.options.map((option) => (
          <div
            key={option.id}
            className="flex items-start space-x-3 p-4 border rounded-lg"
          >
            <input
              type="radio"
              name={`taxOption-${scenario.id}`} // Unique name for each scenario
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleOptionChange(option.id)}
              className="mt-1"
            />
            <div>
              <h3 className="font-medium text-gray-900">{option.title}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
              <p className="text-sm font-semibold text-blue-600 mt-1">
                Benefit: ${option.benefit.toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Explain your choice
          </label>
          <textarea
            value={explanation}
            onChange={handleExplanationChange}
            rows={3}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Why did you choose this option?"
          />
        </div>

        <button
          disabled={!selectedOption || !explanation}
          onClick={handleSubmit}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Submit Response
        </button>

        {showFeedback && (
          <div
            className={`mt-4 border-l-4 rounded p-4 ${
              formData[scenario.id].selectedOption === "aotc"
                ? "bg-green-100 border-green-400"
                : "border-red-500 bg-red-100"
            }`}
          >
            <p
              className={`${
                formData[scenario.id].selectedOption === "aotc"
                  ? "text-green-700"
                  : "text-red-700"
              } font-semibold`}
            >
              The AOTC reduces the tax bill directly by $2,000, making it the
              better option in this scenario. The Student Loan Interest
              Deduction would only reduce taxable income by $500, resulting in a
              much smaller tax benefit.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
