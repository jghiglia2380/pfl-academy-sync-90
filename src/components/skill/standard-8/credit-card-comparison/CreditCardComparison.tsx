import { CreditCard } from "lucide-react";
import CardComparison from "./CardComparison";
import ReflectionSection from "./ReflectionSection";
import BudgetCalculator from "./BudgetCalculator";
import { useEffect } from "react";

export default function CreditCardComparison({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  useEffect(() => {
    if (
      formData.reflection &&
      formData.aiResponse &&
      (formData.budget.groceries ||
        formData.budget.travel ||
        formData.budget.gas)
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-blue-100 p-3">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Credit Card Comparison Exercise
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Credit cards offer a variety of features, fees, and rewards.
            Choosing the right card can make a big difference in managing your
            finances effectively. This exercise will help you compare three
            credit card options and determine which one best fits your spending
            habits and financial needs.
          </p>
        </div>

        <CardComparison formData={formData} setFormData={setFormData} />
        <BudgetCalculator formData={formData} setFormData={setFormData} />
        <ReflectionSection formData={formData} setFormData={setFormData} />

        <footer className="mt-4 text-center text-sm text-gray-500">
          <p className="mb-2">
            The information provided is for educational purposes only and
            reflects typical credit card features. Specific offers may vary.
          </p>
          <p className="font-medium">
            Smart credit card selection can save you money and maximize your
            financial benefits. Always read the fine print before applying for a
            card.
          </p>
        </footer>
      </div>
    </div>
  );
}
