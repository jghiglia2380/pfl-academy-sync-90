import { useEffect } from "react";
import Header from "./Header";
import Calculator from "./Calculator";
import EducationalTips from "./EducationalTips";
import ReflectionSection from "./ReflectionSection";

function MedicalCosts({ section, onExerciseComplete, formData, setFormData }) {
  useEffect(() => {
    if (
      formData.aiResponse &&
      formData.reflection &&
      formData.coInsuranceAmount &&
      formData.feedback
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Header />
        <div className="space-y-8">
          <Calculator formData={formData} setFormData={setFormData} />
          <EducationalTips />
          <ReflectionSection formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
}

export default MedicalCosts;
