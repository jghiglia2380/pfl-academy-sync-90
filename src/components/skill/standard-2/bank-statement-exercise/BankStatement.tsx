import AccountSummarySection from './bank-statement/AccountSummarySection';
import TransactionTable from './bank-statement/TransactionTable';
import { accountSummary, sampleTransactions } from './data/sampleTransactions';
import { getStatementPeriod } from './utils/dateUtils';

const BankStatement = () => {
  const period = getStatementPeriod();

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg">
      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-blue-900">Choice Bank</h2>
          <div className="text-sm text-gray-600">
            <p>Jefferson Choice Bank</p>
            <p>West Virginia</p>
            <p>P.O Box 990180</p>
            <p>Country Roads, WV 70826-0180</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-blue-900">Statement Period</p>
          <p className="text-gray-600">
            {period.format(period.start)} through {period.format(period.end)}
          </p>
          <p className="mt-2">
            <span className="font-bold text-blue-900">Primary Account:</span>
            <span className="text-gray-600"> 000009585814855</span>
          </p>
        </div>
      </div>

      <AccountSummarySection summary={accountSummary} />
      
      <div>
        <h2 className="text-xl font-bold mb-4 text-blue-900">Your Transaction Details</h2>
        <TransactionTable transactions={sampleTransactions} />
      </div>
    </div>
  );
};

export default BankStatement;