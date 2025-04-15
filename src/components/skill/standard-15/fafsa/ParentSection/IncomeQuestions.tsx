import CurrencyInput from "./CurrencyInput";
import { getCurrentFafsaYear } from "../../utils/taxYear";

interface IncomeQuestionsProps {
  formData: any;
  setFormData: (data: any) => void;
}

const IncomeQuestions = ({ formData, setFormData }: IncomeQuestionsProps) => {
  const { taxYear } = getCurrentFafsaYear();

  // Handle income changes and update global form state
  const handleIncomeChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      incomes: {
        ...prev.incomes,
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-4">
      {/* Adjusted Gross Income Section */}
      <div className="border border-purple-900 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-purple-900 font-bold mb-2">
              What was your parents' adjusted gross income for {taxYear}?
            </h3>
            <p className="text-sm mb-2">
              Skip this question if your parents did not file taxes. Adjusted
              gross income is on IRS Form 1040—line 11.
            </p>
          </div>
          <CurrencyInput
            value={formData.incomes?.adjustedGross || ""}
            onChange={(value) => handleIncomeChange("adjustedGross", value)}
          />
        </div>
      </div>

      {/* Parent Income Section */}
      <div className="border border-purple-900 p-4">
        <p className="text-sm mb-4">
          The following questions ask about earnings (wages, salaries, tips,
          etc.) in {taxYear}. Answer the questions whether or not a tax return
          was filed. This information may be found on the W-2 forms or by adding
          up the following items: IRS Form 1040—line 1 (or IRS Form 1040-NR—line
          1a) + Schedule 1—lines 3 + 6 + Schedule K-1 (IRS Form 1065)—Box 14
          (Code A).
        </p>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-purple-900 font-bold">
              How much did parent 1 (father/mother/stepparent) earn from working
              in {taxYear}?
            </h3>
            <CurrencyInput
              value={formData.incomes?.parent1 || ""}
              onChange={(value) => handleIncomeChange("parent1", value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-purple-900 font-bold">
              How much did parent 2 (father/mother/stepparent) earn from working
              in {taxYear}?
            </h3>
            <CurrencyInput
              value={formData.incomes?.parent2 || ""}
              onChange={(value) => handleIncomeChange("parent2", value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeQuestions;
