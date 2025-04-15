import React from 'react';
import { Trash2 } from 'lucide-react';
import { calculateTotal, formatPercentage } from './utils/budgetCalculations';

interface BudgetTableProps {
  data: any[];
  onUpdateAmount: (index: number, newAmount: number) => void;
  onDeleteItem: (index: number) => void;
}

const BudgetTable: React.FC<BudgetTableProps> = ({ 
  data, 
  onUpdateAmount,
  onDeleteItem
}) => {
  const total = calculateTotal(data);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Line Item
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount ($)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              % of Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.lineItem}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => onUpdateAmount(index, Number(e.target.value))}
                  className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatPercentage(item.amount, total)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => onDeleteItem(index)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
          <tr className="bg-gray-50 font-semibold">
            <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Total
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              ${total.toLocaleString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              100%
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;