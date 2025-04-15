import { Plus, Trash2, DollarSign, Home } from 'lucide-react';

interface ExpenseSectionProps {
  expenses: any[];
  onAddExpense: (category: string, description: string) => void;
  onUpdateExpense: (index: number, amount: number) => void;
  onRemoveExpense: (index: number) => void;
}

export function ExpenseSection({
  expenses,
  onAddExpense,
  onUpdateExpense,
  onRemoveExpense,
}: ExpenseSectionProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Step 2: Create a Basic Rental Budget
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Home size={20} />
            Housing Costs
          </h3>
          <button
            onClick={() => onAddExpense('housing', 'Basic monthly rent payment')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-2"
          >
            <Plus size={16} />
            Add Rent
          </button>
          <button
            onClick={() => onAddExpense('housing', 'Monthly utilities (electricity, water, gas)')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-2"
          >
            <Plus size={16} />
            Add Utilities
          </button>
          <button
            onClick={() => onAddExpense('housing', "Renter's insurance")}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Renter's Insurance
          </button>
        </div>

        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <DollarSign size={20} />
            Personal Expenses
          </h3>
          <button
            onClick={() => onAddExpense('personal', 'Monthly grocery budget')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-2"
          >
            <Plus size={16} />
            Add Groceries
          </button>
          <button
            onClick={() => onAddExpense('personal', 'Transportation costs')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-2"
          >
            <Plus size={16} />
            Add Transportation
          </button>
          <button
            onClick={() => onAddExpense('personal', 'Entertainment')}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Entertainment
          </button>
        </div>
      </div>

      {expenses.map((expense, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2 border-b last:border-0"
        >
          <div>
            <p className="text-gray-700">{expense.description}</p>
            <p className="text-sm text-gray-500">{expense.category}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">$</span>
              <input
                type="number"
                value={expense.amount || ''}
                onChange={(e) => onUpdateExpense(index, parseFloat(e.target.value) || 0)}
                className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => onRemoveExpense(index)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 text-right">
        <p className="text-lg font-semibold">
          Total Monthly Expenses: {formatCurrency(totalExpenses)}
        </p>
      </div>
    </div>
  );
}