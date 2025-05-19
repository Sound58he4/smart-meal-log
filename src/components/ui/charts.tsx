
import * as React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Bar,
  BarChart as RechartsBarChart,
  Area,
  AreaChart as RechartsAreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart
} from "recharts";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

interface ChartProps {
  data: ChartData;
}

export function BarChart({ data }: ChartProps) {
  // Transform data from our format to Recharts format
  const chartData = data.labels.map((label, index) => {
    const dataPoint: Record<string, any> = { name: label };
    
    data.datasets.forEach((dataset) => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    
    return dataPoint;
  });

  const config = data.datasets.reduce((acc, dataset) => {
    return {
      ...acc,
      [dataset.label]: {
        label: dataset.label,
        color: dataset.backgroundColor || "#3DD7C3",
      },
    };
  }, {});

  return (
    <ChartContainer config={config}>
      <RechartsBarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        {data.datasets.map((dataset, index) => (
          <Bar 
            key={index} 
            dataKey={dataset.label}
            fill={dataset.backgroundColor || "#3DD7C3"} 
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}

export function AreaChart({ data }: ChartProps) {
  // Transform data from our format to Recharts format
  const chartData = data.labels.map((label, index) => {
    const dataPoint: Record<string, any> = { name: label };
    
    data.datasets.forEach((dataset) => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    
    return dataPoint;
  });

  const config = data.datasets.reduce((acc, dataset) => {
    return {
      ...acc,
      [dataset.label]: {
        label: dataset.label,
        color: dataset.borderColor || dataset.backgroundColor || "#3DD7C3",
      },
    };
  }, {});

  return (
    <ChartContainer config={config}>
      <RechartsAreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
        {data.datasets.map((dataset, index) => (
          <Area 
            key={index} 
            type="monotone"
            dataKey={dataset.label}
            stroke={dataset.borderColor || "#3DD7C3"}
            fill={dataset.backgroundColor || "rgba(61, 215, 195, 0.5)"} 
            fillOpacity={0.5}
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
}
