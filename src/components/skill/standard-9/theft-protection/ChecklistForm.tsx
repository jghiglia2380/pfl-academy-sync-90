const ChecklistForm = ({ checklist, onChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Create Your Identity Protection Checklist
      </h2>

      <p className="text-gray-600 mb-6">
        Think about areas where your personal information might be vulnerable,
        such as online accounts, physical documents, or social media. Then, for
        each vulnerable area, list a specific action you can take to protect
        yourself. Your goal is to create a personalized identity theft
        protection checklist that includes both risks and solutions you can use
        in real life.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="text-left pb-3 text-gray-700 font-medium">
                Vulnerable Area
              </th>
              <th className="text-left pb-3 text-gray-700 font-medium">
                Protection Strategy
              </th>
            </tr>
          </thead>
          <tbody>
            {checklist?.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 pr-4">
                  <input
                    type="text"
                    value={item.area}
                    onChange={(e) => onChange(index, "area", e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter vulnerable area"
                  />
                </td>
                <td className="py-3">
                  <input
                    type="text"
                    value={item.strategy}
                    onChange={(e) =>
                      onChange(index, "strategy", e.target.value)
                    }
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter protection strategy"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChecklistForm;
