interface ParentInfoNeededProps {
  parent: number;
  formData: any;
  setFormData: (data: any) => void;
}

const ParentInfoNeeded = ({
  parent,
  formData,
  setFormData,
}: ParentInfoNeededProps) => {
  const parentKey = `parent${parent}`; // Dynamic key for parent data

  // Handle checkbox change
  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        isDislocatedWorker: !prev[parentKey]?.isDislocatedWorker, // Toggle boolean value
      },
    }));
  };

  return (
    <div className="border border-purple-900 p-4">
      <h3 className="text-purple-900 font-bold mb-2">
        Providing parent {parent} information? You will need:
      </h3>
      <div className="space-y-2">
        <p>Parent {parent} (father/mother/stepparent) Social Security Number</p>
        <p>Parent {parent} (father/mother/stepparent) name</p>
        <p>Parent {parent} (father/mother/stepparent) date of birth</p>
        <label className="grid grid-cols-[20px,1fr] items-center gap-2">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={formData[parentKey]?.isDislocatedWorker || false} // Prefill checkbox state
            onChange={handleCheckboxChange} // Update global form state
          />
          <span>Check here if parent {parent} is a dislocated worker</span>
        </label>
      </div>
    </div>
  );
};

export default ParentInfoNeeded;
