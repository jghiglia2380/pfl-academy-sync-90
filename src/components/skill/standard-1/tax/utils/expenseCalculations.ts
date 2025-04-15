
export const calculateExpenseSummary = (expenses) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const needsTotal = expenses
    .filter(expense => expense.category === 'Needs')
    .reduce((sum, expense) => sum + expense.amount, 0);
  const wantsTotal = expenses
    .filter(expense => expense.category === 'Wants')
    .reduce((sum, expense) => sum + expense.amount, 0);
  const savingsTotal = expenses
    .filter(expense => expense.category === 'Savings')
    .reduce((sum, expense) => sum + expense.amount, 0);

  return {
    total,
    needsTotal,
    wantsTotal,
    savingsTotal,
    needsPercentage: total ? (needsTotal / total) * 100 : 0,
    wantsPercentage: total ? (wantsTotal / total) * 100 : 0,
    savingsPercentage: total ? (savingsTotal / total) * 100 : 0,
  };
};

export const groupExpensesByDate = (expenses) => {
  return expenses.reduce((groups, expense) => {
    const date = expense.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(expense);
    return groups;
  }, {} as { [key] });
};

export const calculateDailyTotals = (expenses) => {
  const grouped = groupExpensesByDate(expenses);
  return Object.entries(grouped).map(([date, dayExpenses]) => ({
    date,
    total: dayExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    expenses: dayExpenses,
  }));
};

export const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};