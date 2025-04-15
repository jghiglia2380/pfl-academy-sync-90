import { Transaction } from "../types/bank";
import { RegisterEntry } from "../types/checkRegister";

export const validateEntries = (
  entries: RegisterEntry[],
  bankTransactions: Transaction[]
): boolean => {
  if (entries.length < 5 || bankTransactions.length < 5) return false;

  return entries.every((entry, index) => {
    const bankTx = bankTransactions[index];
    if (!bankTx.withdrawal) bankTx.withdrawal = "";
    if (!bankTx.deposits) bankTx.deposits = "";

    return (
      entry.date === bankTx.date &&
      parseFloat(entry.balance) === parseFloat(bankTx.balance.toString()) &&
      (entry.withdrawal === "" ||
        parseFloat(entry.withdrawal) === (bankTx.withdrawals || 0)) &&
      (entry.deposit === "" ||
        parseFloat(entry.deposit) === (bankTx.deposits || 0))
    );
  });
};
