import React, { useEffect } from "react";

function ComparisonTool({ laws, formData, setFormData }) {
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedLaws: prev.selectedLaws || [],
    }));
  }, []);

  const handleLawToggle = (lawId) => {
    setFormData((prev) => {
      const selected = prev.selectedLaws || [];
      if (selected.includes(lawId)) {
        return { ...prev, selectedLaws: selected.filter((id) => id !== lawId) };
      }
      if (selected.length < 2) {
        return { ...prev, selectedLaws: [...selected, lawId] };
      }
      return prev;
    });
  };

  const selectedLawsData = laws.filter((law) =>
    formData.selectedLaws?.includes(law.id)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Law Comparison Tool
      </h2>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          Select up to two laws to compare:
        </p>
        <div className="flex flex-wrap gap-2">
          {laws.map((law) => (
            <button
              key={law.id}
              onClick={() => handleLawToggle(law.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                formData.selectedLaws?.includes(law.id)
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {law.name}
            </button>
          ))}
        </div>
      </div>

      {selectedLawsData.length === 2 && (
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feature
                </th>
                {selectedLawsData.map((law) => (
                  <th
                    key={law.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {law.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Purpose
                </td>
                {selectedLawsData.map((law) => (
                  <td key={law.id} className="px-6 py-4 text-sm text-gray-500">
                    {law.purpose}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Year Enacted
                </td>
                {selectedLawsData.map((law) => (
                  <td key={law.id} className="px-6 py-4 text-sm text-gray-500">
                    {law.yearEnacted}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Enforcement Agency
                </td>
                {selectedLawsData.map((law) => (
                  <td key={law.id} className="px-6 py-4 text-sm text-gray-500">
                    {law.enforcementAgency}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ComparisonTool;
