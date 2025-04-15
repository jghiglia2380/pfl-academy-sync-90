import { Coins } from "lucide-react";
import { useEffect } from "react";

type ReviewStepProps = {
  character: any;
  selectedSavings: string;
  savingsJustification: string;
  selectedInvestment: string;
  investmentJustification: string;
  reflection: string;
  onReset: () => void;
  onCompleteExercise: (completed: boolean) => void;
};

export function ReviewStep({
  character,
  selectedSavings,
  savingsJustification,
  selectedInvestment,
  investmentJustification,
  reflection,
  onReset,
  onCompleteExercise,
}: ReviewStepProps) {
  useEffect(() => {
    onCompleteExercise(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-green-700 mb-2">
          <Coins className="w-5 h-5" />
          <h3 className="font-semibold">Exercise Complete!</h3>
        </div>
        <p className="text-green-600">
          You've successfully completed the financial planning exercise. Review
          your choices below:
        </p>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Character Profile</h4>
          <p>Name: {character.name}</p>
          <p>Age: {character.age}</p>
          <p>Financial Goal: {character.goal}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Financial Plan</h4>
          <div className="space-y-2">
            <p>
              <strong>Savings Product:</strong> {selectedSavings}
            </p>
            <p>
              <em>Justification:</em> {savingsJustification}
            </p>
            <p>
              <strong>Investment Product:</strong> {selectedInvestment}
            </p>
            <p>
              <em>Justification:</em> {investmentJustification}
            </p>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Reflection</h4>
          <p>{reflection}</p>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={onReset}
          className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
        >
          Start New Exercise
        </button>
      </div>
    </div>
  );
}
