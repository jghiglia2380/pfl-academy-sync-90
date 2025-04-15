import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function CreditLawsTable({ creditLaws }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedLaws = [...creditLaws].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Law Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("purpose")}
            >
              Purpose
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("yearEnacted")}
            >
              Year Enacted
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("enforcementAgency")}
            >
              Enforcement Agency
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Expand</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedLaws.map((law) => (
            <React.Fragment key={law.id}>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {law.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {law.purpose}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {law.yearEnacted}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {law.enforcementAgency}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() =>
                      setExpandedRow(expandedRow === law.id ? null : law.id)
                    }
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {expandedRow === law.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </td>
              </tr>
              {expandedRow === law.id && (
                <tr className="bg-gray-50">
                  <td colSpan="5" className="px-6 py-4 text-sm text-gray-500">
                    <strong>Example:</strong> {law.example}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CreditLawsTable;
