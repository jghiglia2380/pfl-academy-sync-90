interface Props {
  currentScenario: string;
  onScenarioChange: (scenario: string) => void;
}

export default function ScenarioSelector({ 
  currentScenario, 
  onScenarioChange 
}: Props) {
  return (
    <div className="mb-8">
      <label htmlFor="scenario" className="block text-sm font-medium text-gray-700 mb-2">
        Choose a Scenario:
      </label>
      <select
        id="scenario"
        value={currentScenario}
        onChange={(e) => onScenarioChange(e.target.value)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="default">Default - Laptop ($800 online / $850 in-store)</option>
        <option value="urgent">Urgent Need - Project due tomorrow</option>
        <option value="premium">Premium Model - ($1,200 online / $1,250 in-store)</option>
        <option value="shipping">With Shipping - ($20 shipping fee online)</option>
      </select>
    </div>
  );
}