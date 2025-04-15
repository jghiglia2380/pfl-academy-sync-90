import React from 'react';
import { Calculator } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-4 rounded-full">
          <Calculator className="w-12 h-12 text-blue-600" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Budgeting for College Costs Activity
      </h1>
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-gray-600 mb-4">
          Budgeting is an essential skill for managing money, especially when preparing for college.
        </p>
        <p className="text-gray-600">
          In this activity, you'll help Alex, a fictional first-year college student, create a detailed budget 
          by analyzing expenses and exploring strategies to minimize borrowing.
        </p>
      </div>
    </div>
  );
};