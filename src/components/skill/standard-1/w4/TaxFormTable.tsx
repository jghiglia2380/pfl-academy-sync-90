export const TaxFormTable = ({ taxForms }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h2 className="text-xl font-bold mb-4 text-center">Tax Form Reference Chart</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Tax Form</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Purpose</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Who Uses It?</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 border-b">Provided By</th>
            </tr>
          </thead>
          <tbody>
            {taxForms.map((form, index) => (
              <tr key={form.form} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2 text-sm border-b" title={`${form.form}: ${form.purpose}`}>{form.form}</td>
                <td className="px-4 py-2 text-sm border-b">{form.purpose}</td>
                <td className="px-4 py-2 text-sm border-b">{form.users}</td>
                <td className="px-4 py-2 text-sm border-b">{form.provider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};