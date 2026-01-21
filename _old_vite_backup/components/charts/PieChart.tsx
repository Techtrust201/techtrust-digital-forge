import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

interface CustomPieChartProps {
  data: PieChartData[];
  title?: string;
  height?: number;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  title,
  height = 300,
}) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const renderTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: { payload: PieChartData; name: string; value: number }[];
  }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const percent = ((value / total) * 100).toFixed(1);
      return (
        <div className="bg-white border shadow-md rounded px-3 py-2 text-sm">
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-gray-600">
            {value.toLocaleString()} visites • {percent}%
          </p>
        </div>
      );
    }
    return null;
  };

  const legendFormatter = (value: string, _entry?: unknown) => {
    const item = data.find((d) => d.name === value);
    if (!item) return value;
    const percent = ((item.value / total) * 100).toFixed(1);
    return `${value} – ${percent}%`;
  };

  return (
    <div>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={renderTooltip} />
          <Legend
            formatter={legendFormatter}
            iconType="circle"
            layout="vertical"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
