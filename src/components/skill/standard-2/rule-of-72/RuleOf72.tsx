import { ReflectionSection } from "./ReflectionSection";

const doubleTimeData = [
  { rate: 2, years: 36 },
  { rate: 4, years: 18 },
  { rate: 6, years: 12 },
  { rate: 8, years: 9 },
  { rate: 10, years: 7.2 },
  { rate: 12, years: 6 },
  { rate: 15, years: 4.8 },
];

export function RuleOf72({ formData, setFormData }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Rule of 72 Worksheet
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interest Rate (%)
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doubling Time (Years)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doubleTimeData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.rate}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.years}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReflectionSection formData={formData} setFormData={setFormData} />
    </div>
  );
}
