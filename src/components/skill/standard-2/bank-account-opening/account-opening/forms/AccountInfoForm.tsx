import { CreditCard, Building } from 'lucide-react';

export default function AccountInfoForm({ data, onChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Initial Deposit Amount</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              value={data.initialDeposit}
              onChange={(e) => onChange({ initialDeposit: parseFloat(e.target.value) })}
              className="block w-full pl-7 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="50.00"
              min="25"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Minimum deposit: $25</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deposit Method
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onChange({ depositMethod: 'debit' })}
              className={`p-4 border rounded-lg flex items-center justify-center space-x-2 ${
                data.depositMethod === 'debit' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <CreditCard className="h-5 w-5" />
              <span>Debit Card</span>
            </button>
            
            <button
              type="button"
              onClick={() => onChange({ depositMethod: 'bank' })}
              className={`p-4 border rounded-lg flex items-center justify-center space-x-2 ${
                data.depositMethod === 'bank' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Building className="h-5 w-5" />
              <span>Bank Transfer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}