import { useEffect } from "react";
import { Header } from "./Header";
import { BudgetTable } from "./BudgetTable";
import { ScenarioSelector } from "./ScenarioSelector";
import { ReflectionPrompt } from "./ReflectionPrompt";

export default function CollegeCosts({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      currentExpenses: prev.currentExpenses || section.expenses,
      selectedScenario: prev.selectedScenario || section.scenarios[0],
      showAnnual: prev.showAnnual ?? false,
    }));
  }, []);

  useEffect(() => {
    if (formData.reflection && formData.aiResponse) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  const handleAmountChange = (id, amount) => {
    setFormData((prev) => ({
      ...prev,
      currentExpenses: prev.currentExpenses.map((expense) =>
        expense.id === id
          ? { ...expense, monthlyAmount: Math.round(amount) }
          : expense
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <ScenarioSelector
            scenarios={section.scenarios}
            selectedScenario={formData.selectedScenario}
            onSelect={(value) =>
              setFormData((prev) => ({ ...prev, selectedScenario: value }))
            }
          />

          <BudgetTable
            expenses={formData.currentExpenses || []}
            adjustments={formData.selectedScenario?.adjustments || {}}
            onAmountChange={handleAmountChange}
            showAnnual={formData.showAnnual}
            setShowAnnual={(value) =>
              setFormData((prev) => ({ ...prev, showAnnual: value }))
            }
          />
        </div>
        <ReflectionPrompt formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
}
