import React from "react";
import { ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";

interface LoanTableProps {
  loans: any[];
  expandedRow: string | null;
  setExpandedRow: (type: string | null) => void;
  sortField: keyof any | null;
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof any) => void;
  selectedLoans: string[];
  toggleLoanSelection: (type: string) => void;
  selectedScenario: string;
}

const LoanTable: React.FC<LoanTableProps> = ({
  loans,
  expandedRow,
  setExpandedRow,
  sortField,
  sortDirection,
  handleSort,
  selectedLoans,
  toggleLoanSelection,
  selectedScenario,
}) => {
  const sortedLoans = [...loans].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField].toString();
    const bValue = b[sortField].toString();
    return sortDirection === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const getScenarioRecommendation = (loanType: string) => {
    switch (selectedScenario) {
      case "car":
        return loanType === "Car Loans" ? "Highly Recommended" : "";
      case "education":
        return loanType === "Student Loans" ? "Highly Recommended" : "";
      case "home":
        return loanType === "Mortgages" ? "Highly Recommended" : "";
      case "emergency":
        return ["Personal Loans", "Credit Cards"].includes(loanType)
          ? "Possible Option"
          : "";
      default:
        return "";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-8 px-3 py-3"></th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("type")}
            >
              <div className="flex items-center">
                Loan Type
                <ArrowUpDown className="h-4 w-4 ml-1" />
              </div>
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("apr")}
            >
              <div className="flex items-center">
                Interest Rates (APR)
                <ArrowUpDown className="h-4 w-4 ml-1" />
              </div>
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort("terms")}
            >
              <div className="flex items-center">
                Loan Terms
                <ArrowUpDown className="h-4 w-4 ml-1" />
              </div>
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Potential Fees
            </th>
            <th
              scope="col"
              className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ideal Scenario
            </th>
            <th scope="col" className="relative px-3 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedLoans.map((loan) => (
            <React.Fragment key={loan.type}>
              <tr
                className={
                  expandedRow === loan.type ? "bg-blue-50" : "hover:bg-gray-50"
                }
              >
                <td className="px-3 py-4">
                  <input
                    type="checkbox"
                    checked={selectedLoans?.includes(loan.type)}
                    onChange={() => toggleLoanSelection(loan.type)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {loan.type}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {loan.apr}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                  {loan.terms}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {loan.fees.join(", ")}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {loan.idealScenario}
                  {selectedScenario && (
                    <div
                      className={`mt-1 text-xs font-medium ${
                        getScenarioRecommendation(loan.type).includes("Highly")
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {getScenarioRecommendation(loan.type)}
                    </div>
                  )}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() =>
                      setExpandedRow(
                        expandedRow === loan.type ? null : loan.type
                      )
                    }
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {expandedRow === loan.type ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </td>
              </tr>
              {expandedRow === loan.type && (
                <tr className="bg-blue-50">
                  <td colSpan={7} className="px-3 py-4">
                    <div className="text-sm text-gray-700">
                      <h4 className="font-medium mb-2">Details</h4>
                      <p className="mb-3">{loan.description}</p>
                      <div className="bg-white p-4 rounded-md border border-blue-200">
                        <h5 className="font-medium text-blue-800 mb-2">
                          Example Calculation
                        </h5>
                        <p>{loan.example}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanTable;
