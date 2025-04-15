import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface AddBudgetItemFormProps {
  onAdd: (item) => void;
}

const AddBudgetItemForm: React.FC<AddBudgetItemFormProps> = ({ onAdd }) => {
  const [newItem, setNewItem] = useState({
    category: 'Needs',
    lineItem: '',
    amount: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.lineItem && newItem.amount > 0) {
      onAdd(newItem);
      setNewItem({
        category: 'Needs',
        lineItem: '',
        amount: 0,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
      <select
        value={newItem.category}
        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Needs">Needs</option>
        <option value="Wants">Wants</option>
        <option value="Savings">Savings</option>
      </select>
      
      <input
        type="text"
        value={newItem.lineItem}
        onChange={(e) => setNewItem({ ...newItem, lineItem: e.target.value })}
        placeholder="Line Item Name"
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="number"
        value={newItem.amount || ''}
        onChange={(e) => setNewItem({ ...newItem, amount: Number(e.target.value) })}
        placeholder="Amount"
        min="0"
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <button
        type="submit"
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <PlusCircle className="h-5 w-5" />
        <span>Add Item</span>
      </button>
    </form>
  );
};

export default AddBudgetItemForm;