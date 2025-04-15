function RiskTypeSelector({ riskTypes, selectedRiskType, onSelect }) {
  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-gray-700">
        Step 1: Choose a Type of Risk
      </label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {riskTypes.map((type) => (
          <div
            key={type.id}
            className={`relative rounded-lg border p-4 cursor-pointer hover:border-indigo-500 ${
              selectedRiskType === type.id ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300'
            }`}
            onClick={() => onSelect(type.id)}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{type.label}</span>
              <span className="mt-1 text-sm text-gray-500">{type.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RiskTypeSelector;