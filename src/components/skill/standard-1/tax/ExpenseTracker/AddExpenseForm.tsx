import React, { useState } from 'react';
import { Expense } from '../../types/expense';
import { PlusCircle } from 'lucide-react';

interface AddExpenseFormProps {
  onAdd: (expense: Expense) => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAdd }) => {
  const [expense, setExpense] = useState<Omit<Expense, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    category: 'Needs',
    item: '',
    amount: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expense.item && expense.amount > 0) {
      onAdd({
        ...expense,
        id: crypto.randomUUID(),
      });
      setExpense({
        ...expense,
        item: '',
        amount: 0,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
      <input
        type="date"
        value={expense.date}
        onChange={(e) => setExpense({ ...expense, date: e.target.value })}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <select
        value={expense.category}
        onChange={(e) => setExpense({ ...expense, category: e.target.value as Expense['category'] })}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Needs">Needs</option>
        <option value="Wants">Wants</option>
        <option value="Savings">Savings</option>
      </select>
      
      <input
        type="text"
        value={expense.item}
        onChange={(e) => setExpense({ ...expense, item: e.target.value })}
        placeholder="Item Description"
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <input
        type="number"
        value={expense.amount || ''}
        onChange={(e) => setExpense({ ...expense, amount: Number(e.target.value) })}
        placeholder="Amount"
        min="0"
        step="0.01"
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <button
        type="submit"
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <PlusCircle className="h-5 w-5" />
        <span>Add</span>
      </button>
    </form>
  );
};

export default AddExpenseForm;