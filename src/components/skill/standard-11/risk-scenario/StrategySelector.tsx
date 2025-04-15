interface Props {
  strategies: any[];
  selectedStrategy: any | null;
  explanation: string;
  onStrategySelect: (strategy: any) => void;
  onExplanationChange: (explanation: string) => void;
}

function StrategySelector({ strategies, selectedStrategy, explanation, onStrategySelect, onExplanationChange }: Props) {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-gray-700">
        Step 3: Choose a Risk Management Strategy
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {strategies.map((strategy) => (
          <div
            key={strategy.id}
            className={`relative rounded-lg border p-4 cursor-pointer hover:border-indigo-500 ${
              selectedStrategy === strategy.id ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300'
            }`}
            onClick={() => onStrategySelect(strategy.id)}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{strategy.label}</span>
              <span className="mt-1 text-sm text-gray-500">{strategy.description}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <label htmlFor="explanation" className="block text-sm font-medium text-gray-700">
          Explain why this strategy is the best approach for your scenario
        </label>
        <textarea
          id="explanation"
          value={explanation}
          onChange={(e) => onExplanationChange(e.target.value)}
          rows={3}
          className="mt-1 shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
          placeholder="Be specific about how this strategy addresses the risk and mitigates potential harm..."
        />
      </div>
    </div>
  );
}

export default StrategySelector;