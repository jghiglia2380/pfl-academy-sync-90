import { Transaction, AccountSummary } from '../types/bank';
import { getStatementPeriod } from '../utils/dateUtils';

const period = getStatementPeriod();

export const sampleTransactions: Transaction[] = [
  {
    date: period.shortFormat(new Date(period.start)),
    details: 'Opening Balance',
    balance: 5234.09
  },
  {
    date: period.shortFormat(new Date(period.start.getFullYear(), period.start.getMonth(), 3)),
    details: 'Direct Deposit - Payroll',
    deposits: 2100.00,
    balance: 7334.09
  },
  {
    date: period.shortFormat(new Date(period.start.getFullYear(), period.start.getMonth(), 5)),
    details: 'ATM Withdrawal',
    withdrawals: 200.00,
    balance: 7134.09
  },
  {
    date: period.shortFormat(new Date(period.start.getFullYear(), period.start.getMonth(), 8)),
    details: 'Check #1001 - Rent',
    withdrawals: 1200.00,
    balance: 5934.09
  },
  {
    date: period.shortFormat(new Date(period.start.getFullYear(), period.start.getMonth(), 12)),
    details: 'Grocery Store',
    withdrawals: 156.78,
    balance: 5777.31
  },
  {
    date: period.shortFormat(new Date(period.start.getFullYear(), period.start.getMonth(), 15)),
    details: 'Utility Bill Payment',
    withdrawals: 145.67,
    balance: 5631.64
  },
  {
    date: period.shortFormat(new Date(period.start.getFullYear(), period.start.getMonth(), 17)),
    details: 'Direct Deposit - Payroll',
    deposits: 2100.00,
    balance: 7731.64
  },
  {
    date: period.shortFormat(new Date(period.start.getFullYear(), period.start.getMonth(), 22)),
    details: 'Phone Bill Payment',
    withdrawals: 89.99,
    balance: 7641.65
  },
  {
    date: period.shortFormat(new Date(period.start.getFullYear(), period.start.getMonth(), 25)),
    details: 'Gas Station',
    withdrawals: 45.75,
    balance: 7595.90
  },
  {
    date: period.shortFormat(new Date(period.end)),
    details: 'Internet Service',
    withdrawals: 79.99,
    balance: 7515.91
  }
];

// Calculate account summary from transactions
export const accountSummary: AccountSummary = {
  openingBalance: sampleTransactions[0].balance,
  withdrawals: sampleTransactions.reduce((sum, tx) => sum + (tx.withdrawals || 0), 0),
  deposits: sampleTransactions.reduce((sum, tx) => sum + (tx.deposits || 0), 0),
  closingBalance: sampleTransactions[sampleTransactions.length - 1].balance
};