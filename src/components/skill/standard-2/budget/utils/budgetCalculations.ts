
export const CATEGORY_COLORS = {
  Needs: '#3b82f6',   // Blue
  Wants: '#f97316',   // Orange
  Savings: '#22c55e', // Green
} as const;

export const calculateTotal = (data): number => {
  return data.reduce((sum, item) => sum + item.amount, 0);
};

export const calculateCategoryTotal = (data, category: string): number => {
  return data
    .filter(item => item.category === category)
    .reduce((sum, item) => sum + item.amount, 0);
};

export const formatPercentage = (amount: number, total: number): string => {
  return ((amount / total) * 100).toFixed(1) + '%';
};

export const calculateCategoryTotals = (data) => {
  const totals: { [key: string]: number } = {};
  const grandTotal = calculateTotal(data);

  data.forEach((item) => {
    totals[item.category] = (totals[item.category] || 0) + item.amount;
  });

  return Object.entries(totals).map(([category, total]) => ({
    category,
    total,
    percentage: (total / grandTotal) * 100,
    color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS],
  }));
};