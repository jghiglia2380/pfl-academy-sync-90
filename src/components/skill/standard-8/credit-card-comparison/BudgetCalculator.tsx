import { useEffect } from "react";
import { DollarSignIcon } from "lucide-react";

export default function BudgetCalculator({ formData, setFormData }) {
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      budget: prev.budget || { groceries: "", travel: "", gas: "" },
    }));
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatInput = (value) => {
    const cleanValue = value.replace(/[^\d.]/g, "");
    const number = parseFloat(cleanValue);
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("en-US").format(number);
  };

  const calculateRewards = () => {
    const groceryRewards =
      (Number(formData.budget?.groceries.replace(/,/g, "")) || 0) * 0.03;
    const travelRewards =
      (Number(formData.budget?.travel.replace(/,/g, "")) || 0) * 0.015;
    const gasRewards =
      (Number(formData.budget?.gas.replace(/,/g, "")) || 0) * 0.02;

    const bestCard = Math.max(groceryRewards, travelRewards, gasRewards);

    return {
      groceryCard: formatCurrency(groceryRewards),
      travelCard: formatCurrency(travelRewards),
      gasCard: formatCurrency(gasRewards),
      recommended:
        bestCard === groceryRewards
          ? "Grocery"
          : bestCard === travelRewards
          ? "Travel"
          : "Gas",
    };
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      budget: { ...prev.budget, [field]: formatInput(value) },
    }));
  };

  const rewards = calculateRewards();

  return (
    <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Monthly Budget Calculator</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["groceries", "travel", "gas"].map((category) => (
          <div key={category}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
              Spending
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSignIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.budget?.[category] || ""}
                onChange={(e) => handleInputChange(category, e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter amount"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-4">Monthly Rewards Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white rounded border">
            <p className="font-medium">Grocery Rewards Card</p>
            <p className="text-2xl font-bold text-green-600">
              {rewards.groceryCard}
            </p>
          </div>
          <div className="p-3 bg-white rounded border">
            <p className="font-medium">Travel Rewards Card</p>
            <p className="text-2xl font-bold text-green-600">
              {rewards.travelCard}
            </p>
          </div>
          <div className="p-3 bg-white rounded border">
            <p className="font-medium">Gas Rewards Card</p>
            <p className="text-2xl font-bold text-green-600">
              {rewards.gasCard}
            </p>
          </div>
        </div>
        {(formData.budget?.groceries ||
          formData.budget?.travel ||
          formData.budget?.gas) && (
          <div className="mt-4 text-center">
            <p className="font-medium">
              Based on your spending, the {rewards.recommended} Rewards Card
              would provide the most value.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
