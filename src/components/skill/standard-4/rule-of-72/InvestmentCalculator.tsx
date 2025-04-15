import { DollarSign, Clock, Percent } from "lucide-react";

export function InvestmentCalculator({ values, onChange, results }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Investment Growth Worksheet
      </h2>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Initial Investment
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                name="initialInvestment"
                value={values.initialInvestment || ""}
                onChange={onChange}
                className="w-32 pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Monthly Contribution
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                name="monthlyContribution"
                value={values.monthlyContribution || ""}
                onChange={onChange}
                className="w-32 pl-7 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent className="w-6 h-6 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Annual Interest Rate
              </span>
            </div>
            <input
              type="number"
              name="annualInterest"
              value={values.annualInterest || ""}
              onChange={onChange}
              className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Time Horizon (Years)
              </span>
            </div>
            <input
              type="number"
              name="timeHorizon"
              value={values.timeHorizon || ""}
              onChange={onChange}
              className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Total without Interest:
            </span>
            <span className="text-lg font-semibold">
              {results.totalWithoutInterest.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total with Interest:</span>
            <span className="text-lg font-semibold text-green-600">
              {results.totalWithInterest.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Interest Gained:</span>
            <span className="text-lg font-semibold text-blue-600">
              {results.interestGained.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Return on Investment:</span>
            <span className="text-lg font-semibold text-purple-600">
              {(
                (results.interestGained / results.totalWithoutInterest) *
                100
              ).toFixed(1)}
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
