const Instructions = () => (
  <div className="mt-4 text-sm text-gray-600">
    <p className="font-bold mb-2">Instructions:</p>
    <ul className="list-disc ml-5">
      <li>Record all transactions from your bank statement in chronological order</li>
      <li>For each transaction, subtract withdrawals and add deposits to calculate the new balance</li>
      <li>Compare your final balance with the bank statement's closing balance</li>
      <li>Mark off each transaction as you record it to ensure nothing is missed</li>
    </ul>
  </div>
);

export default Instructions;