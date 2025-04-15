export default function ComparisonTable({
  housingData,
  onDataChange,
  showHints,
}) {
  const formatCurrency = (value) => {
    const number = parseFloat(value);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Criteria
            </th>
            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Renting an Apartment
            </th>
            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Leasing a Condo
            </th>
            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Buying a House
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-3 text-sm font-medium text-gray-900">
              Monthly Payment
            </td>
            {["apartment", "condo", "house"].map((type) => (
              <td key={type} className="px-4 py-3 align-top">
                <input
                  type="text"
                  value={formatCurrency(housingData[type].payment)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    onDataChange(type, "payment", value);
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm font-medium text-gray-900">Pro</td>
            {["apartment", "condo", "house"].map((type) => (
              <td key={type} className="px-4 py-3 align-top">
                <input
                  type="text"
                  value={housingData[type].pro}
                  onChange={(e) => onDataChange(type, "pro", e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter a pro..."
                />
                {showHints && (
                  <p className="mt-1 text-xs text-gray-500">
                    Hint:{" "}
                    {type === "apartment"
                      ? "Affordable short-term option"
                      : type === "condo"
                      ? "Access to amenities"
                      : "Long-term investment"}
                  </p>
                )}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm font-medium text-gray-900">Con</td>
            {["apartment", "condo", "house"].map((type) => (
              <td key={type} className="px-4 py-3 align-top">
                <input
                  type="text"
                  value={housingData[type].con}
                  onChange={(e) => onDataChange(type, "con", e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter a con..."
                />
                {showHints && (
                  <p className="mt-1 text-xs text-gray-500">
                    Hint:{" "}
                    {type === "apartment"
                      ? "Limited customization"
                      : type === "condo"
                      ? "Higher fees"
                      : "Large down payment"}
                  </p>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
