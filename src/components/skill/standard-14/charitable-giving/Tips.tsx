export default function Tips() {
  return (
    <div className="bg-blue-50 rounded-lg p-8 mb-8">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">Tips for Effective Giving</h3>
      <ul className="space-y-3 text-blue-800">
        <li className="flex items-start">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
          <span>Start small and choose a cause that resonates with your values</span>
        </li>
        <li className="flex items-start">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
          <span>Set realistic goals to ensure your giving is sustainable</span>
        </li>
        <li className="flex items-start">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
          <span>Consider combining monetary donations with volunteering for a more impactful contribution</span>
        </li>
      </ul>
    </div>
  );
}