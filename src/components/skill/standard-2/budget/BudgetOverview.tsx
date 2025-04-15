import BudgetChart from "./BudgetChart";
import BudgetTable from "./BudgetTable";
import BudgetSummary from "./BudgetSummary";
import AddBudgetItemForm from "./AddBudgetItemForm";
import { PiggyBank } from "lucide-react";

function BudgetOverview({ budgetData, setBudgetData }) {
  const handleUpdateAmount = (index: number, newAmount: number) => {
    const newData = [...budgetData];
    newData[index].amount = newAmount;
    setBudgetData(newData);
  };

  const handleAddItem = (newItem) => {
    setBudgetData([...budgetData, newItem]);
  };

  const handleDeleteItem = (index: number) => {
    const newData = budgetData.filter((_, i) => i !== index);
    setBudgetData(newData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <PiggyBank className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Budget Allocation Tool
          </h1>
          <p className="text-xl text-gray-600">
            Track your monthly spending with the 50/30/20 rule
          </p>
        </div>

        <BudgetSummary data={budgetData} />

        <div className="grid md:grid-cols-2 gap-2">
          <div className="bg-white rounded-lg shadow p-2">
            <h2 className="text-2xl font-semibold mb-6">Budget Breakdown</h2>
            <BudgetChart data={budgetData} />
          </div>

          <div className="bg-white rounded-lg shadow p-2">
            <h2 className="text-2xl font-semibold mb-6">Budget Details</h2>
            <AddBudgetItemForm onAdd={handleAddItem} />
            <div className="mt-6">
              <BudgetTable
                data={budgetData}
                onUpdateAmount={handleUpdateAmount}
                onDeleteItem={handleDeleteItem}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetOverview;
