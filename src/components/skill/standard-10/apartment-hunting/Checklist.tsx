import React, { useEffect } from "react";

interface Feature {
  icon: React.ReactNode;
  label: string;
}

interface ChecklistProps {
  features: Feature[];
  formData: any;
  setFormData: (data: any) => void;
}

const Checklist: React.FC<ChecklistProps> = ({
  features,
  formData,
  setFormData,
}) => {
  useEffect(() => {
    // Initialize checklist if not already in formData
    if (!formData.checklist) {
      setFormData((prev) => ({
        ...prev,
        checklist: {},
      }));
    }
  }, [setFormData]);

  const addItem = (
    e: React.FormEvent,
    selectedFeature: string,
    newItem: string
  ) => {
    e.preventDefault();
    if (newItem.trim()) {
      setFormData((prev) => ({
        ...prev,
        checklist: {
          ...prev.checklist,
          [selectedFeature]: [
            ...(prev.checklist[selectedFeature] || []),
            newItem.trim(),
          ],
        },
      }));
    }
  };

  const removeItem = (feature: string, index: number) => {
    setFormData((prev) => {
      const updatedFeatureItems = prev.checklist[feature].filter(
        (_, i) => i !== index
      );

      // If no items left, remove the feature from the checklist
      const updatedChecklist = { ...prev.checklist };
      if (updatedFeatureItems.length === 0) {
        delete updatedChecklist[feature]; // Completely remove the feature key
      } else {
        updatedChecklist[feature] = updatedFeatureItems;
      }

      return { ...prev, checklist: updatedChecklist };
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) =>
          addItem(
            e,
            formData.selectedFeature || features[0].label,
            formData.newItem || ""
          )
        }
        className="mb-6"
      >
        <div className="flex gap-2 mb-3">
          <select
            value={formData.selectedFeature || features[0].label}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                selectedFeature: e.target.value,
              }))
            }
            className="flex-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {features.map((feature, index) => (
              <option key={index} value={feature.label}>
                {feature.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={formData.newItem || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, newItem: e.target.value }))
            }
            placeholder="Add a new item..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-6 text-sm">
        {features.map((feature, featureIndex) => (
          <div key={featureIndex}>
            <div className="flex items-center gap-2 mb-2">
              {feature.icon}
              <h3 className="font-medium">{feature.label}</h3>
            </div>
            <ul className="space-y-2">
              {formData.checklist?.[feature.label]?.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => removeItem(feature.label, itemIndex)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
