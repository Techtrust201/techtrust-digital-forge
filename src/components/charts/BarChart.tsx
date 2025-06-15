
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface CustomBarChartProps {
  data: BarChartData[];
  title?: string;
  height?: number;
  dataKey?: string;
  color?: string;
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({ 
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
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
