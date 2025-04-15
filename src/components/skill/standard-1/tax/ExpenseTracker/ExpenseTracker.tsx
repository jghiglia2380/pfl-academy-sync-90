import { Receipt } from "lucide-react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import { calculateExpenseSummary } from "../utils/expenseCalculations";

const ExpenseTracker = ({ formData, setFormData }) => {
  const { expenses, timeframe } = formData;

  const getFilteredExpenses = () => {
    const now = new Date();
    const filtered = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      if (timeframe === "month") {
        return (
          expenseDate.getMonth() === now.getMonth() &&
          expenseDate.getFullYear() === now.getFullYear()
        );
      } else if (timeframe === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return expenseDate >= weekAgo;
      }
      return true;
    });

    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const handleAddExpense = (expense) => {
    setFormData({ ...formData, expenses: [...expenses, expense] });
  };

  const handleDeleteExpense = (id) => {
    setFormData({
      ...formData,
      expenses: expenses.filter((expense) => expense.id !== id),
    });
  };

  const handleSetTimeframe = (newTimeframe) => {
    setFormData({ ...formData, timeframe: newTimeframe });
  };

  const filteredExpenses = getFilteredExpenses();
  const summary = calculateExpenseSummary(filteredExpenses);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Receipt className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Expense Tracker
          </h1>
          <p className="text-xl text-gray-600">
            Track your daily expenses and monitor your spending habits
          </p>
        </div>

        <div className="mb-8">
          <AddExpenseForm onAdd={handleAddExpense} />
        </div>

        <div className="mb-8">
          <div className="flex justify-end mb-4">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                onClick={() => handleSetTimeframe("all")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg border
                  ${
                    timeframe === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                All Time
              </button>
              <button
                onClick={() => handleSetTimeframe("month")}
                className={`px-4 py-2 text-sm font-medium border-t border-b
                  ${
                    timeframe === "month"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                This Month
              </button>
              <button
                onClick={() => handleSetTimeframe("week")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border
                  ${
                    timeframe === "week"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                This Week
              </button>
            </div>
          </div>

          <ExpenseSummary
            summary={summary}
            title={`${
              timeframe === "all"
                ? "All Time"
                : timeframe === "month"
                ? "This Month"
                : "This Week"
            } Summary`}
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-6">Expense History</h2>
          <ExpenseList
            expenses={filteredExpenses}
            onDelete={handleDeleteExpense}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
