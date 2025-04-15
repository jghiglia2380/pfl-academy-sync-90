import { PiggyBank } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-12">
      <PiggyBank className="w-16 h-16 text-blue-600 mx-auto mb-4" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Financial Planning Role-Play</h1>
      <p className="text-xl text-gray-600">Learn financial planning through interactive scenarios</p>
    </div>
  );
}