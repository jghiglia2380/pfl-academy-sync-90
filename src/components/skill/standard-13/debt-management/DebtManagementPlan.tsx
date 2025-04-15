import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const DebtManagementPlan = ({ formData, setFormData }) => {
  const [showExample, setShowExample] = useState(false);

  const examplePlan = `1. Cut all non-essential subscriptions and dining out to save $300/month.

2. Contact creditors to negotiate lower interest rates.

3. Use the snowball method to pay off smaller debts first while paying minimums on larger debts.

4. Allocate $500/month to high-interest credit card debt.

5. Take on a weekend part-time job to generate an additional $400/month for debt repayment.`;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Step 1: Create a Debt Management Plan
      </h2>

      <p className="text-gray-600 mb-4">
        Imagine you have significant credit card debt and medical bills. Create
        a detailed debt management plan that includes specific actions you would
        take to pay off your debt. Consider strategies like:
      </p>

      <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
        <li>
          Cutting discretionary spending (e.g., dining out, subscriptions)
        </li>
        <li>
          Contacting creditors to negotiate lower payments or interest rates
        </li>
        <li>Setting a detailed budget to stay on track</li>
        <li>Prioritizing high-interest debts for faster paydown</li>
        <li>
          Outlining steps to increase your income (e.g., taking on a part-time
          job)
        </li>
      </ul>

      <div className="mb-6">
        <button
          onClick={() => setShowExample(!showExample)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          {showExample ? (
            <ChevronUp className="w-4 h-4 mr-1" />
          ) : (
            <ChevronDown className="w-4 h-4 mr-1" />
          )}
          {showExample ? "Hide Example" : "Show Example"}
        </button>

        {showExample && (
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <div className="font-normal text-blue-600 text-sm whitespace-pre-line">
              {examplePlan}
            </div>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="plan"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Debt Management Plan
        </label>
        <textarea
          id="plan"
          rows={6}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.plan}
          onChange={(e) => {
            setFormData({ ...formData, plan: e.target.value });
          }}
          placeholder="Write your debt management plan here..."
        />
      </div>
    </div>
  );
};

export default DebtManagementPlan;
