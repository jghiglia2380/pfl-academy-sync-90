export function MaritalStatus({ formData, setFormData }) {
  // Handle checkbox toggle
  const handleChange = () => {
    setFormData((prev) => ({
      ...prev,
      maritalStatus: prev.maritalStatus === "single" ? "" : "single", // Toggle selection
    }));
  };

  return (
    <div className="section-box">
      <div className="section-title">Student Marital Status</div>

      <div className="marital-status">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="maritalStatus"
            checked={formData.maritalStatus === "single"}
            onChange={handleChange}
          />
          Single
        </label>
      </div>
    </div>
  );
}
