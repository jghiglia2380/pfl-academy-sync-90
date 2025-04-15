import React, { useEffect } from "react";
import { CarIcon, ShoppingCartIcon, PlaneIcon } from "lucide-react";

interface CardData {
  id: number;
  name: string;
  annualFee: number;
  apr: string;
  rewards: string;
  benefits: string;
  idealFor: string;
  icon: React.ReactNode;
  details: string;
}

const cards: CardData[] = [
  {
    id: 1,
    name: "Grocery Rewards Card",
    annualFee: 95,
    apr: "14.99%",
    rewards: "3% cashback on groceries",
    benefits: "Extended warranty on electronics purchases",
    idealFor: "Heavy grocery shoppers",
    icon: <ShoppingCartIcon className="w-6 h-6" />,
    details:
      "Extended warranty on electronics purchases covers up to $500 per claim. Perfect for families who spend significantly on groceries.",
  },
  {
    id: 2,
    name: "Travel Rewards Card",
    annualFee: 0,
    apr: "17.99%",
    rewards: "1.5 points per $1 on travel purchases",
    benefits: "Free checked bags on flights",
    idealFor: "Frequent travelers",
    icon: <PlaneIcon className="w-6 h-6" />,
    details:
      "Earn points on every purchase, with bonus points on travel. Free checked bag benefit can save up to $60 per round trip.",
  },
  {
    id: 3,
    name: "Gas Rewards Card",
    annualFee: 0,
    apr: "19.99%",
    rewards: "2% cashback on gas",
    benefits: "Roadside assistance",
    idealFor: "Individuals who drive frequently",
    icon: <CarIcon className="w-6 h-6" />,
    details:
      "24/7 roadside assistance includes towing, tire changes, and jump starts. Great for commuters and ride-share drivers.",
  },
];

const scenarios = [
  { id: 1, name: "You spend $500 monthly on groceries" },
  { id: 2, name: "You travel for work frequently" },
  { id: 3, name: "You have a long daily commute" },
];

function CreditCardComparison({ formData, setFormData }) {
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedCard: prev.selectedCard || null,
      sortBy: prev.sortBy || null,
      selectedScenario: prev.selectedScenario || 0,
    }));
  }, []);

  const sortCards = (cardsToSort: CardData[]) => {
    if (!formData.sortBy) return cardsToSort;

    return [...cardsToSort].sort((a, b) => {
      if (formData.sortBy === "fee") return a.annualFee - b.annualFee;
      if (formData.sortBy === "apr")
        return parseFloat(a.apr) - parseFloat(b.apr);
      return 0;
    });
  };

  const getBestCardForScenario = (scenarioId: number) => {
    switch (scenarioId) {
      case 1:
        return 1; // Grocery card
      case 2:
        return 2; // Travel card
      case 3:
        return 3; // Gas card
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => setFormData((prev) => ({ ...prev, sortBy: "fee" }))}
            className={`px-4 py-2 rounded ${
              formData.sortBy === "fee"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Sort by Annual Fee
          </button>
          <button
            onClick={() => setFormData((prev) => ({ ...prev, sortBy: "apr" }))}
            className={`px-4 py-2 rounded ${
              formData.sortBy === "apr"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Sort by APR
          </button>
        </div>

        <select
          className="border rounded-md px-4 py-2"
          value={formData.selectedScenario}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              selectedScenario: Number(e.target.value),
            }))
          }
        >
          <option value={0}>Select a scenario</option>
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortCards(cards).map((card) => {
          const isRecommended =
            formData.selectedScenario > 0 &&
            getBestCardForScenario(formData.selectedScenario) === card.id;

          return (
            <div
              key={card.id}
              className={`relative border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                formData.selectedCard?.id === card.id
                  ? "ring-2 ring-blue-500"
                  : ""
              } ${isRecommended ? "ring-2 ring-green-500" : ""}`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, selectedCard: card }))
              }
            >
              {isRecommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Recommended
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                {card.icon}
                <h3 className="text-lg font-semibold">{card.name}</h3>
              </div>

              <div className="space-y-2 text-gray-600">
                <p>
                  <span className="font-medium">Annual Fee:</span> $
                  {card.annualFee}
                </p>
                <p>
                  <span className="font-medium">APR:</span> {card.apr}
                </p>
                <p>
                  <span className="font-medium">Rewards:</span> {card.rewards}
                </p>
                <p>
                  <span className="font-medium">Benefits:</span> {card.benefits}
                </p>
                <p>
                  <span className="font-medium">Ideal For:</span>{" "}
                  {card.idealFor}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {formData.selectedCard && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Detailed Information</h4>
          <p className="text-gray-600">{formData.selectedCard.details}</p>
        </div>
      )}
    </div>
  );
}

export default CreditCardComparison;
