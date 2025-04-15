interface GamblingType {
  type: string;
  cost: string;
  enjoyment: 'Low' | 'Medium' | 'High';
  risks: string;
}

interface GamblingTypeInputProps {
  types: GamblingType[];
  onChange: (types: GamblingType[]) => void;
}

export function GamblingTypeInput({ types, onChange }: GamblingTypeInputProps) {
  const handleChange = (index: number, field: keyof GamblingType, value: string) => {
    const newTypes = [...types];
    newTypes[index] = { ...newTypes[index], [field]: value };
    onChange(newTypes);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left">Gambling Type</th>
            <th className="px-4 py-2 text-left">Cost of Participation</th>
            <th className="px-4 py-2 text-left">Enjoyment Level</th>
            <th className="px-4 py-2 text-left">Potential Risks</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={type.type}
                  onChange={(e) => handleChange(index, 'type', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter type"
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={type.cost}
                  onChange={(e) => handleChange(index, 'cost', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="$"
                />
              </td>
              <td className="px-4 py-2">
                <select
                  value={type.enjoyment}
                  onChange={(e) => handleChange(index, 'enjoyment', e.target.value as 'Low' | 'Medium' | 'High')}
                  className="w-full p-2 border rounded"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={type.risks}
                  onChange={(e) => handleChange(index, 'risks', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter risks"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}