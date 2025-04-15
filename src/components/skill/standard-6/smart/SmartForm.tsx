import { useEffect, useState } from "react";
import { Header } from "./Header";
import { SmartGoalsIntro } from "./SmartGoalsIntro";
import { SmartGoalInput } from "./SmartGoalInput";

function SmartForm({ section, onGoalsChange, formData, setFormData }) {
  const [errors, setErrors] = useState<string[]>([]);

  const validateSmartGoals = (goals) =>
    Object.values(goals).every((value) => value.trim().length > 0);

  useEffect(() => {
    const isValid = validateSmartGoals(formData);
    setErrors(getEmptyFields(formData));
    onGoalsChange(formData, isValid);
  }, [formData]);

  const getEmptyFields = (goals) =>
    Object.entries(goals)
      .filter(([_, value]) => !value.trim())
      .map(([key]) => key);

  const handleChange = (field, value: string) => {
    const updatedGoals = { ...formData, [field]: value };
    setFormData(updatedGoals);

    const isValid = validateSmartGoals(updatedGoals);
    setErrors(getEmptyFields(updatedGoals));

    // Notify the parent about the updated goals and validation state
    onGoalsChange(updatedGoals, isValid);
  };

  return (
    <div>
      <Header />
      <SmartGoalsIntro />
      <div className="space-y-6">
        {section.form.map((form) => (
          <SmartGoalInput
            key={form.id}
            id={form.id}
            title={form.title}
            prompt={form.prompt}
            placeholder={form.placeholder}
            value={formData[form.id]}
            onChange={(value) => handleChange(form.id, value)}
            error={errors.includes(form.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default SmartForm;
