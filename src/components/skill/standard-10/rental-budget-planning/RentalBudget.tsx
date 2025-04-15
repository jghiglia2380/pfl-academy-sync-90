import { useEffect } from "react";
import { Header } from "./Header";
import { IncomeSection } from "./IncomeSection";
import { ExpenseSection } from "./ExpenseSection";
import { BudgetSummary } from "./BudgetSummary";

function RentalBudget({ section, onExerciseComplete, formData, setFormData }) {
  // Initialize form data if missing
  useEffect(() => {
    if (formData.reflection && formData.aiResponse) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  const addIncome = () => {
    if (formData.newIncomeSource && formData.newIncomeAmount) {
      setFormData((prev) => ({
        ...prev,
        incomes: [
          ...prev.incomes,
          {
            source: prev.newIncomeSource,
            amount: parseFloat(prev.newIncomeAmount),
          },
        ],
        newIncomeSource: "",
        newIncomeAmount: "",
      }));
    }
  };

  const removeIncome = (index) => {
    setFormData((prev) => ({
      ...prev,
      incomes: prev.incomes.filter((_, i) => i !== index),
    }));
  };

  const addExpense = (category, description) => {
    setFormData((prev) => ({
      ...prev,
      expenses: [...prev.expenses, { category, amount: 0, description }],
    }));
  };

  const updateExpense = (index, amount) => {
    setFormData((prev) => {
      const updatedExpenses = [...prev.expenses];
      updatedExpenses[index].amount = amount;
      return { ...prev, expenses: updatedExpenses };
    });
  };

  const removeExpense = (index) => {
    setFormData((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((_, i) => i !== index),
    }));
  };

  const handleReflectionChange = (val) => {
    setFormData((prev) => ({ ...prev, reflection: val }));
    onExerciseComplete(val.trim() !== "");
  };

  const totalIncome = formData.incomes.reduce(
    (sum, income) => sum + income.amount,
    0
  );
  const totalExpenses = formData.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />

        <IncomeSection
          incomes={formData.incomes}
          newIncomeSource={formData.newIncomeSource}
          newIncomeAmount={formData.newIncomeAmount}
          onAddIncome={addIncome}
          onRemoveIncome={removeIncome}
          onSourceChange={(val) =>
            setFormData((prev) => ({ ...prev, newIncomeSource: val }))
          }
          onAmountChange={(val) =>
            setFormData((prev) => ({ ...prev, newIncomeAmount: val }))
          }
        />

        <ExpenseSection
          expenses={formData.expenses}
          onAddExpense={addExpense}
          onUpdateExpense={updateExpense}
          onRemoveExpense={removeExpense}
        />

        <BudgetSummary
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}

export default RentalBudget;
