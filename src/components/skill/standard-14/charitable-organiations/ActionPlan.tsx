import CollapsibleSection from "./CollapsibleSection";
import TextInput from "./TextInput";

function ActionPlan({ formData, setFormData }) {
  const handleActionChange = (index, value) => {
    const newActions = [...formData.actions];
    newActions[index] = value;
    setFormData({ ...formData, actions: newActions });
  };

  return (
    <CollapsibleSection title="Action Plan for Verifying Charities">
      <div className="space-y-6">
        {formData.actions?.map((action, index) => (
          <TextInput
            key={index}
            label={`Action ${index + 1}`}
            id={`action-${index + 1}`}
            value={formData.actions[index]}
            onChange={(e) => handleActionChange(index, e.target.value)}
            placeholder={`Enter action ${index + 1}`}
          />
        ))}
      </div>
    </CollapsibleSection>
  );
}

export default ActionPlan;
