import FormSection from "./sections/FormSection";

export default function HorizontalFormLayout({ formData, onChange }) {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:gap-0">
      <FormSection
        title="Student Information"
        description="Enter the student's details for the account application"
        type="student"
        data={formData.student}
        onChange={(newData) => {
          onChange({
            ...formData,
            student: { ...formData.student, ...newData },
          });
        }}
      />

      <FormSection
        title="Parent/Guardian Information"
        description="Enter the parent or guardian's details who will co-sign the account"
        type="guardian"
        data={formData.guardian}
        onChange={(newData) => {
          onChange({
            ...formData,
            guardian: { ...formData.guardian, ...newData },
          });
        }}
        isGuardian
      />
    </div>
  );
}
