import { useState } from "react";

export default function ComparisonTable({
  factors,
  selectedFactors,
  onFactorSelect,
}) {
  const toggleFactor = (factorName: string) => {
    if (selectedFactors.includes(factorName)) {
      onFactorSelect(selectedFactors.filter((f) => f !== factorName));
    } else {
      onFactorSelect([...selectedFactors, factorName]);
    }
  };

  function Tooltip({ content, children }) {
    const [show, setShow] = useState(false);

    return (
      <div className="relative inline-block">
        <div
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="cursor-help"
        >
          {children}
        </div>
        {show && (
          <div className="absolute z-10 w-48 px-2 py-1 -mt-1 text-sm text-white bg-gray-700 rounded-lg shadow-lg">
            {content}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Comparison Table</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4">Factor</th>
              <th className="text-left py-3 px-4">Online Purchase</th>
              <th className="text-left py-3 px-4">Local Store Purchase</th>
              <th className="text-left py-3 px-4">Important?</th>
            </tr>
          </thead>
          <tbody>
            {factors.map((factor) => (
              <tr key={factor.name} className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">
                  <Tooltip
                    content={`Compare ${factor.name.toLowerCase()} between options`}
                  >
                    {factor.name}
                  </Tooltip>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium">{factor.online.value}</div>
                  <div className="text-sm text-gray-500">
                    {factor.online.detail}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="font-medium">{factor.store.value}</div>
                  <div className="text-sm text-gray-500">
                    {factor.store.detail}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={selectedFactors?.includes(factor.name)}
                      onChange={() => toggleFactor(factor.name)}
                    />
                    <span className="ml-2 text-gray-700">
                      Mark as important
                    </span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
