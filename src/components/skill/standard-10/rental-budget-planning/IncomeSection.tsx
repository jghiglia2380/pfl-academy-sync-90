import { Plus, Trash2 } from 'lucide-react';

interface IncomeSectionProps {
  incomes: any[];
  newIncomeSource: string;
  newIncomeAmount: string;
  onAddIncome: () => void;
  onRemoveIncome: (index: number) => void;
  onSourceChange: (value: string) => void;
  onAmountChange: (value: string) => void;
}

export function IncomeSection({
  incomes,
  newIncomeSource,
  newIncomeAmount,
  onAddIncome,
  onRemoveIncome,
  onSourceChange,
  onAmountChange,
}: IncomeSectionProps) {
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Income Source"
          value={newIncomeSource}
          onChange={(e) => onSourceChange(e.target.value)}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newIncomeAmount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <button
          onClick={onAddIncome}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add
        </button>
      </div>

      {incomes.map((income, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2 border-b last:border-0"
        >
          <span className="text-gray-700">{income.source}</span>
          <div className="flex items-center gap-4">
            <span className="font-semibold">{formatCurrency(income.amount)}</span>
            <button
              onClick={() => onRemoveIncome(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4 text-right">
        <p className="text-lg font-semibold">
          Total Monthly Income: {formatCurrency(totalIncome)}
        </p>
      </div>
    </div>
  );
}