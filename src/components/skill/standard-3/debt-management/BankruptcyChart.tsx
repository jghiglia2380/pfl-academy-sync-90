interface ChartRow {
  factor: string;
  pros: string;
  cons: string;
}

const chartData: ChartRow[] = [
  {
    factor: "Impact on Credit Score",
    pros: "Eliminates most unsecured debt, allowing for a fresh start",
    cons: "Severely damages credit (stays on record for 7-10 years)",
  },
  {
    factor: "Legal Costs",
    pros: "May be less costly than years of high-interest payments",
    cons: "Filing fees, attorney costs, and court proceedings required",
  },
  {
    factor: "Ability to Start Over",
    pros: "Stops collections, lawsuits, and wage garnishment",
    cons: "Future loans, housing applications, and credit access become more difficult",
  },
  {
    factor: "Alternatives",
    pros: "Other options (like debt settlement) can help avoid bankruptcy",
    cons: "Some alternatives still negatively impact credit and may not fully resolve debt",
  },
  {
    factor: "Other Considerations",
    pros: "Reduces stress from overwhelming debt and financial hardship",
    cons: "Can affect job opportunities, housing approvals, and financial reputation",
  },
];

const BankruptcyChart = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Step 2: Bankruptcy Pros and Cons
      </h2>

      <p className="text-gray-600 mb-6">
        Below is a structured table outlining the pros and cons of filing for
        bankruptcy. Consider factors such as credit score impact, legal costs,
        ability to start over, and alternative strategies.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                Factor
              </th>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                Pros
              </th>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                Cons
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chartData.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                  {row.factor}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">{row.pros}</td>
                <td className="px-4 py-4 text-sm text-gray-700">{row.cons}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankruptcyChart;
