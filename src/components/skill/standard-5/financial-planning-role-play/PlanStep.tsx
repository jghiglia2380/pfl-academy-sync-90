import { savingsProducts, investmentProducts } from './constants';

type PlanStepProps = {
  selectedSavings: string;
  setSelectedSavings: (product: string) => void;
  selectedInvestment: string;
  setSelectedInvestment: (product: string) => void;
  savingsJustification: string;
  setSavingsJustification: (text: string) => void;
  investmentJustification: string;
  setInvestmentJustification: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function PlanStep({
  selectedSavings,
  setSelectedSavings,
  selectedInvestment,
  setSelectedInvestment,
  savingsJustification,
  setSavingsJustification,
  investmentJustification,
  setInvestmentJustification,
  onSubmit
}: PlanStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select a Savings Product</label>
        <select
          value={selectedSavings}
          onChange={(e) => setSelectedSavings(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Choose a product...</option>
          {savingsProducts.map((product) => (
            <option key={product} value={product}>{product}</option>
          ))}
        </select>
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">Justification</label>
          <textarea
            value={savingsJustification}
            onChange={(e) => setSavingsJustification(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={2}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Select an Investment Product</label>
        <select
          value={selectedInvestment}
          onChange={(e) => setSelectedInvestment(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Choose a product...</option>
          {investmentProducts.map((product) => (
            <option key={product} value={product}>{product}</option>
          ))}
        </select>
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">Justification</label>
          <textarea
            value={investmentJustification}
            onChange={(e) => setInvestmentJustification(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={2}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Continue
      </button>
    </form>
  );
}