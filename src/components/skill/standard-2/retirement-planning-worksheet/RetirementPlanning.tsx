import { useState } from "react";
import { Calculator, Info, HelpCircle, Wallet } from "lucide-react";
import RetirementTable from "./RetirementTable";
import ReflectionCalculator from "./ReflectionCalculator";

function RetirementPlanning({ section, formData, setFormData }) {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Wallet className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Retirement Planning Worksheet
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare retirement planning options and analyze their benefits,
            risks, and tax implications to make informed financial decisions.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Calculator className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Retirement Options Comparison
              </h2>
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {showDetails ? "Show Summary" : "Show Details"}
            </button>
          </div>
          <RetirementTable
            showDetails={showDetails}
            retirementOptions={section.retirementOptions}
          />
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Reflection Question
              </h2>
            </div>
            <ReflectionCalculator
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
          <p className="flex items-start">
            <Info className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
            *Expected value assumes consistent max contributions and a 7% annual
            return, compounded annually. Results may vary based on actual market
            performance and personal circumstances.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RetirementPlanning;
