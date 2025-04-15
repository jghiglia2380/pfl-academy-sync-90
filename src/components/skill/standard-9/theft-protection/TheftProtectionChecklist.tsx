import { useEffect } from "react";
import Header from "./Header";
import ChecklistForm from "./ChecklistForm";
import SampleChecklist from "./SampleChecklist";
import ReflectionSection from "./ReflectionSection";
import Tips from "./Tips";
import Footer from "./Footer";
import CompleteButton from "./CompleteButton";

function TheftProtectionChecklist({
  onExerciseCompleted,
  formData,
  setFormData,
}) {
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist || [
        { area: "", strategy: "" },
        { area: "", strategy: "" },
        { area: "", strategy: "" },
      ],
      reflection: prev.reflection || "",
    }));
  }, []);

  useEffect(() => {
    if (
      formData.reflection &&
      formData.aiResponse &&
      formData.checklist.every(
        (item) => item.area.trim() && item.strategy.trim()
      )
    ) {
      onExerciseCompleted(true);
    } else {
      onExerciseCompleted(false);
    }
  }, [formData]);

  const handleChecklistChange = (index, field, value) => {
    setFormData((prev) => {
      const newChecklist = [...prev.checklist];
      newChecklist[index] = { ...newChecklist[index], [field]: value };
      return { ...prev, checklist: newChecklist };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Header />
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <ChecklistForm
            checklist={formData.checklist}
            onChange={handleChecklistChange}
          />

          <SampleChecklist />

          <ReflectionSection formData={formData} setFormData={setFormData} />

          <Tips />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default TheftProtectionChecklist;
