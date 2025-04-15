import Header from "./Header";
import DebtManagementPlan from "./DebtManagementPlan";
import DebtManagementTips from "./DebtManagementTips";
import BankruptcyChart from "./BankruptcyChart";
import ReflectionPrompt from "./ReflectionPrompt";
import { useEffect } from "react";

function DebtManagement({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  useEffect(() => {
    if (formData.reflection && formData.aiResponse && formData.plan) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <div className="space-y-8">
          <DebtManagementPlan formData={formData} setFormData={setFormData} />
          <BankruptcyChart />
          <DebtManagementTips tips={section.tips} />
          <ReflectionPrompt formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
}

export default DebtManagement;
