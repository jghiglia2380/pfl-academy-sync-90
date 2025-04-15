import { useEffect } from "react";
import { Download, Filter, Wallet } from "lucide-react";
import ComparisonTool from "./ComparisonTool";
import ReflectionPrompt from "./ReflectionPrompt";
import LoanTable from "./LoanTable";

function LoanComparison({ section, formData, setFormData }) {
  useEffect(() => {
    // Ensure default state is set if not already in formData
    setFormData((prev) => ({
      ...prev,
      expandedRow: prev.expandedRow || null,
      sortField: prev.sortField || null,
      sortDirection: prev.sortDirection || "asc",
      selectedLoans: prev.selectedLoans || [],
      selectedScenario: prev.selectedScenario || "",
    }));
  }, []);

  const handleSort = (field) => {
    setFormData((prev) => ({
      ...prev,
      sortField: prev.sortField === field ? prev.sortField : field,
      sortDirection:
        prev.sortField === field
          ? prev.sortDirection === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };

  const toggleLoanSelection = (loanType) => {
    setFormData((prev) => ({
      ...prev,
      selectedLoans: prev.selectedLoans?.includes(loanType)
        ? prev.selectedLoans.filter((loan) => loan !== loanType)
        : [...prev.selectedLoans, loanType].slice(-2),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex justify-center items-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Wallet className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Loan Comparison Exercise
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compare different types of loans and understand their features,
            costs, and best use cases to make informed borrowing decisions.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.selectedScenario}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    selectedScenario: e.target.value,
                  }))
                }
              >
                <option value="">Select a scenario...</option>
                <option value="car">Buying a car</option>
                <option value="education">Paying for education</option>
                <option value="home">Purchasing a home</option>
                <option value="emergency">Emergency expenses</option>
              </select>
            </div>
          </div>

          <LoanTable
            loans={section.loanTypes}
            expandedRow={formData.expandedRow}
            setExpandedRow={(value) =>
              setFormData((prev) => ({ ...prev, expandedRow: value }))
            }
            sortField={formData.sortField}
            sortDirection={formData.sortDirection}
            handleSort={handleSort}
            selectedLoans={formData.selectedLoans}
            toggleLoanSelection={toggleLoanSelection}
            selectedScenario={formData.selectedScenario}
          />
        </div>

        {formData.selectedLoans?.length === 2 && (
          <ComparisonTool
            loan1={section.loanTypes.find(
              (loan) => loan.type === formData.selectedLoans[0]
            )}
            loan2={section.loanTypes.find(
              (loan) => loan.type === formData.selectedLoans[1]
            )}
          />
        )}

        <ReflectionPrompt formData={formData} setFormData={setFormData} />

        <footer className="mt-12 border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                APR (Annual Percentage Rate)
              </h3>
              <p className="text-gray-600 text-sm">
                The yearly interest rate charged on a loan, including fees.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Origination Fees
              </h3>
              <p className="text-gray-600 text-sm">
                Fees charged for processing a loan application.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Revolving Credit
              </h3>
              <p className="text-gray-600 text-sm">
                A credit line that remains open for repeated borrowing.
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Note: Loan rates and terms may vary based on lender policies, credit
            scores, and market conditions.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default LoanComparison;
