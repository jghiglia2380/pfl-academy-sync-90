import { useEffect } from "react";
import Header from "./Header";
import BudgetSection from "./BudgetSection";
import TimeLimitSection from "./TimeLimitSection";
import StrategiesSection from "./StrategiesSection";
import PosterSection from "./PosterSection";
import ReflectionSection from "./ReflectionSection";
import EducationalTips from "./EducationalTips";

function ResponsibleGambling({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  useEffect(() => {
    if (
      formData.budget !== "" &&
      formData.timeLimit !== "" &&
      formData.strategies !== "" &&
      formData.postetSection?.signs !== "" &&
      formData.postetSection?.resources !== "" &&
      formData.postetSection?.tips !== "" &&
      formData.reflection &&
      formData.aiResponse
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Header />

        <div className="space-y-8">
          <BudgetSection
            value={formData.budget}
            onChange={(value) => handleChange("budget", value)}
          />

          <TimeLimitSection
            value={formData.timeLimit}
            onChange={(value) => handleChange("timeLimit", value)}
          />

          <StrategiesSection
            value={formData.strategies}
            onChange={(value) => handleChange("strategies", value)}
          />

          <PosterSection formData={formData} setFormData={setFormData} />

          <ReflectionSection formData={formData} setFormData={setFormData} />

          <EducationalTips />
        </div>
      </div>
    </div>
  );
}

export default ResponsibleGambling;
