
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface CustomLineChartProps {
  data: LineChartData[];
  title?: string;
  height?: number;
  dataKey?: string;
  color?: string;
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({ 
  data, 
  title, 
  height = 300, 
  dataKey = 'value',
  color = '#8884d8'
}) => {
  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
