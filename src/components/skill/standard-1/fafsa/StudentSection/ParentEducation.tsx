export function ParentEducation({ formData, setFormData }) {
  // Handle selection and update global form state
  const handleChange = (parent, value) => {
    setFormData((prev) => ({ ...prev, [parent]: value }));
  };

  return (
    <div className="section-box">
      <div className="parent-education">
        {/* Parent 1 Education */}
        <div className="parent-question">
          <div className="font-bold">
            What is the highest school Parent 1 completed?
          </div>
        </div>

        <div>
          <label className="checkbox-label">
            <input
              type="radio"
              name="parent1Education"
              value="middle"
              className="mr-1"
              checked={formData["parent1Education"] === "middle"}
              onChange={() => handleChange("parent1Education", "middle")}
            />
            Middle school/Jr. high
          </label>
          <label className="checkbox-label mt-2">
            <input
              type="radio"
              name="parent1Education"
              value="high"
              className="mr-1"
              checked={formData["parent1Education"] === "high"}
              onChange={() => handleChange("parent1Education", "high")}
            />
            High school
          </label>
        </div>

        <div>
          <label className="checkbox-label">
            <input
              type="radio"
              name="parent1Education"
              value="college"
              className="mr-1"
              checked={formData["parent1Education"] === "college"}
              onChange={() => handleChange("parent1Education", "college")}
            />
            College or beyond
          </label>
          <label className="checkbox-label mt-2">
            <input
              type="radio"
              name="parent1Education"
              value="other"
              className="mr-1"
              checked={formData["parent1Education"] === "other"}
              onChange={() => handleChange("parent1Education", "other")}
            />
            Other/unknown
          </label>
        </div>

        {/* Parent 2 Education */}
        <div className="parent-question mt-4">
          <div className="font-bold">
            What is the highest school Parent 2 completed?
          </div>
        </div>

        <div>
          <label className="checkbox-label">
            <input
              type="radio"
              name="parent2Education"
              value="middle"
              className="mr-1"
              checked={formData["parent2Education"] === "middle"}
              onChange={() => handleChange("parent2Education", "middle")}
            />
            Middle school/Jr. high
          </label>
          <label className="checkbox-label mt-2">
            <input
              type="radio"
              name="parent2Education"
              value="high"
              className="mr-1"
              checked={formData["parent2Education"] === "high"}
              onChange={() => handleChange("parent2Education", "high")}
            />
            High school
          </label>
        </div>

        <div>
          <label className="checkbox-label">
            <input
              type="radio"
              name="parent2Education"
              value="college"
              className="mr-1"
              checked={formData["parent2Education"] === "college"}
              onChange={() => handleChange("parent2Education", "college")}
            />
            College or beyond
          </label>
          <label className="checkbox-label mt-2">
            <input
              type="radio"
              name="parent2Education"
              className="mr-1"
              value="other"
              checked={formData["parent2Education"] === "other"}
              onChange={() => handleChange("parent2Education", "other")}
            />
            Other/unknown
          </label>
        </div>
      </div>
    </div>
  );
}
