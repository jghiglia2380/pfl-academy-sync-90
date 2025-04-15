import * as Icons from "lucide-react";
import { Tooltip } from "./ui/Tooltip";

export default function ChecklistSection({
  section,
  accentColor,
  formData,
  setFormData,
}) {
  // Ensure formData stores checked items for this section
  const checkedItems = new Set(formData[section.id] || []);

  // Toggle checkbox and update formData globally
  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }

    // Update formData globally
    setFormData((prev) => ({
      ...prev,
      [section.id]: Array.from(newChecked), // Store as an array
    }));
  };

  return (
    <div className="mb-8">
      <h3 className={`text-xl font-semibold`} style={{ color: accentColor }}>
        {section.title}
      </h3>
      <div className="space-y-4">
        {section.items.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons];

          return (
            <div
              key={item.id}
              className="flex items-start space-x-3 bg-white p-4 rounded-lg border"
            >
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => toggleItem(item.id)}
                  className={`mt-1 h-4 w-4 text-${accentColor}-600 rounded focus:ring-${accentColor}-500`}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-5 w-5 text-${accentColor}-500`} />
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    {item.tooltip && (
                      <Tooltip content={item.tooltip}>
                        <Icons.HelpCircle className="h-4 w-4 text-gray-400" />
                      </Tooltip>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
