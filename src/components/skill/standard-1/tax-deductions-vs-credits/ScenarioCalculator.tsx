import { Calculator } from "lucide-react";
import { Scenario, CalculationResult } from "../types";

interface Props {
  scenario: Scenario;
  formData: any; // Accept formData as a prop
  setFormData: (updateFn: (prev: any) => any) => void; // Accept setFormData
  onCalculate: (inputs: Record<string, number>) => CalculationResult;
}

export default function ScenarioCalculator({
  scenario,
  formData,
  setFormData,
  onCalculate,
}: Props) {
  // Initialize inputs from scenario, fallback to formData
  const inputs =
    formData[scenario.id]?.inputs ||
    scenario.inputs.reduce(
      (acc, input) => ({
        ...acc,
        [input.id]: input.defaultValue,
      }),
      {}
    );

  // Get saved result or null
  const result = formData[scenario.id]?.result || null;
  const explanation = formData[scenario.id]?.explanation || "";

  // Handle input changes and update global formData
  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [scenario.id]: {
        ...prev[scenario.id],
        inputs: {
          ...prev[scenario.id]?.inputs,
          [id]: parseFloat(value) || 0,
        },
      },
    }));
  };

  // Handle calculation and update global formData
  const handleCalculate = () => {
    const calculationResult = onCalculate(inputs);
    setFormData((prev) => ({
      ...prev,
      [scenario.id]: {
        ...prev[scenario.id],
        result: calculationResult,
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">
        {scenario.title}
      </h3>
      <p className="text-gray-600 mb-6">{scenario.description}</p>

      <div className="space-y-4 mb-6">
        {scenario.inputs.map((input) => (
          <div key={input.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {input.label}
            </label>
            <input
              type="number"
              value={inputs[input.id]}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleCalculate}
        className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mb-6"
      >
        <Calculator className="w-5 h-5 mr-2" />
        Calculate Impact
      </button>

      {result && (
        <div className="space-y-4 border-t pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Deduction Benefit</h4>
              <p className="text-2xl font-bold text-blue-600">
                ${result.deductionBenefit.toFixed(2)}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Credit Benefit</h4>
              <p className="text-2xl font-bold text-blue-600">
                ${result.creditBenefit.toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Better Option</h4>
            <p className="text-lg text-blue-900">
              The {result.betterOption} provides a greater benefit by $
              {result.difference.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Explain your analysis
        </label>
        <textarea
          value={explanation}
          onChange={handleExplanationChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Explain why one option is better than the other..."
        />
      </div>
    </div>
  );
}
