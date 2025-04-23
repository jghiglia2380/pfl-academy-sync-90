import React from 'react';
import { Bar } from 'recharts';

interface BarChartProps {
  data: Array<{
    [key: string]: any;
  }>;
  xField: string;
  yField: string;
  height?: number;
  width?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  xField,
  yField,
  height = 300,
  width = 600
}) => {
  return (
    <div className="w-full" style={{ height, width }}>
      <ResponsiveContainer>
        <RechartsBarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xField} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={yField}
            fill="#8884d8"
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}; 