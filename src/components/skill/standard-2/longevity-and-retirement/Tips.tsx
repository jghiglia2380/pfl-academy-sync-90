export default function Tips() {
  return (
    <div className="bg-blue-50 rounded-lg p-8 mb-8">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">
        Tips for Effective Retirement Planning
      </h3>
      <ul className="space-y-3 text-blue-800">
        <li className="flex items-start">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
          <span>Start early to maximize compounding benefits</span>
        </li>
        <li className="flex items-start">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
          <span>
            Regularly review and adjust your plan to account for changing
            circumstances
          </span>
        </li>
        <li className="flex items-start">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
          <span>Diversify your investments to balance risk and growth</span>
        </li>
      </ul>
    </div>
  );
}
