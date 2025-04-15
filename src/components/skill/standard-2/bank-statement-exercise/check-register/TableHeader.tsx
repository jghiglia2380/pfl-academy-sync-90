const TableHeader = () => (
  <thead>
    <tr className="bg-blue-50">
      <th className="border border-blue-200 py-2 px-1 text-left text-blue-900">
        Date
      </th>
      <th className="border border-blue-200 px-1 py-2 text-left text-blue-900">
        <div className="whitespace-normal">Transaction Type</div>
      </th>
      <th className="border border-blue-200 px-1 py-2 text-left text-blue-900">
        Check #
      </th>
      <th className="border border-blue-200 px-1 py-2 text-left text-blue-900">
        Description
      </th>
      <th className="border border-blue-200 px-1 py-2 text-left text-blue-900">
        <div className="whitespace-normal">Withdrawal (-)</div>
      </th>
      <th className="border border-blue-200 px-1 py-2 text-left text-blue-900">
        <div className="whitespace-normal">Deposit (+)</div>
      </th>
      <th className="border border-blue-200 px-1 py-2 text-left text-blue-900">
        Balance
      </th>
    </tr>
  </thead>
);

export default TableHeader;
