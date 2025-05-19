
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
import { useTheme } from "next-themes";

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
  className?: string;
}

export function BarChart({ data, className }: ChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
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
    <ChartContainer config={config} className={className}>
      <RechartsBarChart 
        data={chartData} 
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        className="animate-fade-in"
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={isDark ? "#333" : "#e0e0e0"} 
        />
        <XAxis 
          dataKey="name" 
          tick={{ fill: isDark ? "#e0e0e0" : "#333" }}
          stroke={isDark ? "#555" : "#e0e0e0"} 
        />
        <YAxis 
          tick={{ fill: isDark ? "#e0e0e0" : "#333" }}
          stroke={isDark ? "#555" : "#e0e0e0"} 
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend wrapperStyle={{ color: isDark ? "#e0e0e0" : "#333" }} />
        {data.datasets.map((dataset, index) => (
          <Bar 
            key={index} 
            dataKey={dataset.label}
            fill={dataset.backgroundColor || "#3DD7C3"}
            className="transition-all duration-300"
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
}

export function AreaChart({ data, className }: ChartProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
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
    <ChartContainer config={config} className={className}>
      <RechartsAreaChart 
        data={chartData} 
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        className="animate-fade-in"
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={isDark ? "#333" : "#e0e0e0"} 
        />
        <XAxis 
          dataKey="name" 
          tick={{ fill: isDark ? "#e0e0e0" : "#333" }}
          stroke={isDark ? "#555" : "#e0e0e0"} 
        />
        <YAxis 
          tick={{ fill: isDark ? "#e0e0e0" : "#333" }}
          stroke={isDark ? "#555" : "#e0e0e0"} 
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend wrapperStyle={{ color: isDark ? "#e0e0e0" : "#333" }} />
        {data.datasets.map((dataset, index) => (
          <Area 
            key={index} 
            type="monotone"
            dataKey={dataset.label}
            stroke={dataset.borderColor || "#3DD7C3"}
            fill={dataset.backgroundColor || "rgba(61, 215, 195, 0.5)"} 
            fillOpacity={0.5}
            animationDuration={1500}
            animationEasing="ease-in-out"
            className="transition-all duration-300"
          />
        ))}
      </RechartsAreaChart>
    </ChartContainer>
  );
}
