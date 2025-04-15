import React from "react";

interface BudgetTableProps {
  expenses: any[];
  adjustments: Record<string, number>;
  onAmountChange: (id: string, amount: number) => void;
  showAnnual: boolean;
  setShowAnnual: (show: boolean) => void;
}

export const BudgetTable: React.FC<BudgetTableProps> = ({
  expenses,
  adjustments,
  onAmountChange,
  showAnnual,
  setShowAnnual,
}) => {
  const getAdjustedAmount = (expense) => {
    const adjustment = adjustments[expense.id] || 0;
    return Math.round(expense.monthlyAmount + adjustment);
  };

  const getDisplayAmount = (amount: number) => {
    return showAnnual ? amount * 12 : amount;
  };

  const total = expenses.reduce((sum, expense) => {
    return sum + getAdjustedAmount(expense);
  }, 0);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAnnual(!showAnnual)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Show {showAnnual ? "Monthly" : "Annual"} Costs
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expense Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {showAnnual ? "Annual" : "Monthly"} Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Saving Strategies
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => {
              const amount = getAdjustedAmount(expense);
              const displayAmount = getDisplayAmount(amount);

              return (
                <tr key={expense.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {expense.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={formatCurrency(displayAmount)}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          const newAmount = showAnnual
                            ? Math.round(Number(value) / 12)
                            : Math.round(Number(value));
                          onAmountChange(expense.id, newAmount);
                        }}
                        className="w-32 px-2 py-1 border rounded"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc pl-4 space-y-1">
                      {expense.savingsTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
            <tr className="bg-gray-50 font-semibold">
              <td className="px-6 py-4 whitespace-nowrap text-sm">Total</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {formatCurrency(getDisplayAmount(total))}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
