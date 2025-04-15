const TaxSystemDefinitions = ({ taxSystems }) => {
  return (
    <div className="mb-12 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Tax System Definitions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(taxSystems).map(([key, system]) => (
          <div key={key} className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 capitalize">
              {system.type} Tax System
            </h3>
            <p className="text-gray-700 mb-4">{system.description}</p>
            <ul className="space-y-2">
              {system.keyPoints.map((point, index) => (
                <li key={index} className="text-gray-600 flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxSystemDefinitions;