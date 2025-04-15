import { CheckboxItem } from "./CheckboxItem";

export const StudentDependencyStatus = ({ formData, setFormData }) => {
  // Handle checkbox changes and update global form state
  const handleCheckboxChange = (key) => (checked) => {
    setFormData((prev) => ({
      ...prev,
      dependencyStatus: {
        ...prev.dependencyStatus,
        [key]: checked,
      },
    }));
  };

  // Handle notes field update
  const handleNotesChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      dependencyNotes: e.target.value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gray-300 p-2 mb-4">
        <h2 className="text-lg font-bold">
          SECTION 2 - STUDENT DEPENDENCY STATUS
        </h2>
      </div>

      <div className="mb-4 text-sm">
        <p>
          If you can check ANY of the following boxes, you will not have to
          provide parental information. Skip to page 4.
        </p>
        <p>
          If you check NONE of the following boxes, you will be asked to provide
          parental information. Go to the next page.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-[1px] bg-gray-300">
        {Object.keys(formData.dependencyStatus || {}).map((key) => (
          <CheckboxItem
            key={key}
            text={key.replace(/([A-Z])/g, " $1")}
            checked={formData.dependencyStatus?.[key] || false}
            onChange={handleCheckboxChange(key)}
          />
        ))}
      </div>

      <div className="mt-4 border border-gray-300 p-4">
        <h3 className="font-bold mb-2">NOTES:</h3>
        <textarea
          value={formData.dependencyNotes || ""}
          onChange={handleNotesChange}
          className="w-full h-32 p-2 border border-gray-300"
        />
      </div>
    </div>
  );
};
