import React from "react";

interface TransactionTableProps {
  transactions: any[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-blue-50">
          <th className="text-left py-2 px-4 text-blue-900">Date</th>
          <th className="text-left py-2 px-4 text-blue-900">Details</th>
          <th className="text-right py-2 px-4 text-blue-900">Withdrawals</th>
          <th className="text-right py-2 px-4 text-blue-900">Deposits</th>
          <th className="text-right py-2 px-4 text-blue-900">Balance</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index} className="border-b border-gray-100">
            <td className="py-2 px-4 text-gray-600">{transaction.date}</td>
            <td className="py-2 px-4 text-gray-600">{transaction.details}</td>
            <td className="text-right py-2 px-4 text-red-600">
              {transaction.withdrawals}
            </td>
            <td className="text-right py-2 px-4 text-green-600">
              {transaction.deposits}
            </td>
            <td className="text-right py-2 px-4 font-medium">
              {transaction.balance}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
