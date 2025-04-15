import React from 'react';
import { PiggyBank } from 'lucide-react';

export function Header() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 mb-10">
      <div className="bg-blue-100 p-4 rounded-xl">
        <PiggyBank className="w-12 h-12 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 text-center">
        Saving vs. Investing Comparison Chart
      </h1>
    </div>
  );
}