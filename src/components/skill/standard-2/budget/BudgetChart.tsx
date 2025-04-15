import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
  Needs: '#3b82f6',   // Blue
  Wants: '#f97316',   // Orange
  Savings: '#22c55e', // Green
};

const BudgetChart = ({ data }) => {
  const calculateTotals = () => {
    const totals: { [key: string]: number } = {};
    const grandTotal = data.reduce((sum, item) => sum + item.amount, 0);

    data.forEach((item) => {
      totals[item.category] = (totals[item.category] || 0) + item.amount;
    });

    return Object.entries(totals).map(([category, total]) => ({
      category,
      total,
      percentage: (total / grandTotal) * 100,
      color: COLORS[category as keyof typeof COLORS],
    }));
  };

  const totals = calculateTotals();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold">{data.category}</p>
          <p className="text-gray-600">${data.total.toLocaleString()}</p>
          <p className="text-gray-600">{data.percentage.toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] mt-8">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={totals}
            dataKey="total"
            nameKey="category"
            cx="45%"
            cy="50%"
            outerRadius={120}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={true}
          >
            {totals.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;