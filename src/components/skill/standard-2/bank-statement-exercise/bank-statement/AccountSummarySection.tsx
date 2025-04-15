const AccountSummarySection = ({ summary }) => {
  return (
    <div className="border-t border-b border-gray-200 py-4 mb-6">
      <h2 className="text-xl font-bold mb-4 text-blue-900">Account Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-gray-600">
          <p>Opening Balance</p>
          <p>Withdrawals</p>
          <p>Deposits</p>
        </div>
        <div className="text-right">
          <p className="text-gray-900">${summary.openingBalance.toFixed(2)}</p>
          <p className="text-red-600">-${summary.withdrawals.toFixed(2)}</p>
          <p className="text-green-600">+${summary.deposits.toFixed(2)}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between font-bold">
        <p className="text-blue-900">Closing Balance</p>
        <p className="text-blue-900">${summary.closingBalance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default AccountSummarySection;