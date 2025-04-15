const ComparisonTool = ({ loan1, loan2 }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Loan Comparison</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-3">{loan1.type}</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">APR Range</dt>
              <dd className="text-sm text-gray-900">{loan1.apr}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Terms</dt>
              <dd className="text-sm text-gray-900">{loan1.terms}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Key Features</dt>
              <dd className="text-sm text-gray-900">{loan1.description}</dd>
            </div>
          </dl>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-3">{loan2.type}</h3>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">APR Range</dt>
              <dd className="text-sm text-gray-900">{loan2.apr}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Terms</dt>
              <dd className="text-sm text-gray-900">{loan2.terms}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Key Features</dt>
              <dd className="text-sm text-gray-900">{loan2.description}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default ComparisonTool;