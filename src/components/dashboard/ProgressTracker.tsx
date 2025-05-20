
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ChevronUp, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressData {
  date: string;
  value: number;
}

interface ProgressTrackerProps {
  title: string;
  unit: string;
  data: ProgressData[];
  percentChange: number;
  timeFrame?: string;
  color?: "primary" | "green" | "red" | "blue" | "purple" | "orange";
}

export const ProgressTracker = ({
  title,
  unit,
  data,
  percentChange,
  timeFrame = "from last week",
  color = "primary"
}: ProgressTrackerProps) => {
  const colorVariants = {
    primary: "text-primary",
    green: "text-green-500",
    red: "text-red-500",
    blue: "text-blue-500", 
    purple: "text-purple-500",
    orange: "text-orange-500"
  };
  
  const bgColorVariants = {
    primary: "bg-primary/10",
    green: "bg-green-500/10",
    red: "bg-red-500/10",
    blue: "bg-blue-500/10",
    purple: "bg-purple-500/10",
    orange: "bg-orange-500/10"
  };
  
  const colorClass = colorVariants[color];
  const bgColorClass = bgColorVariants[color];
  
  // Find min and max for scaling
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  
  // Create normalized data points for the spark line
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = range === 0 
      ? 50 // If all values are the same, draw a straight line
      : 100 - (((d.value - min) / range) * 80 + 10); // Scale to 10%-90% of height
    return `${x},${y}`;
  }).join(' ');
  
  const currentValue = data[data.length - 1].value;
  
  return (
    <Card className={cn("h-full overflow-hidden", bgColorClass)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold">
              {currentValue}
              <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>
            </p>
            <div className="flex items-center mt-1 text-xs">
              {percentChange > 0 ? (
                <><ChevronUp className="h-3 w-3 text-green-500" /> <span className="text-green-500">{Math.abs(percentChange)}%</span></>
              ) : percentChange < 0 ? (
                <><ChevronDown className="h-3 w-3 text-red-500" /> <span className="text-red-500">{Math.abs(percentChange)}%</span></>
              ) : (
                <span className="text-muted-foreground">0%</span>
              )}
              <span className="ml-1 text-muted-foreground">{timeFrame}</span>
            </div>
          </div>
          <div className="h-9 w-9 rounded-full bg-background flex items-center justify-center">
            <TrendingUp className={cn("h-5 w-5", colorClass)} />
          </div>
        </div>
        
        <div className="h-12 mt-2 relative">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.polyline
              points={points}
              fill="none"
              strokeWidth="2"
              className={cn("stroke-current", colorClass)}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {/* Add dots at each data point */}
            {data.map((_, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = range === 0 
                ? 50
                : 100 - (((values[i] - min) / range) * 80 + 10);
              
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="1.5"
                  className={cn("fill-current", colorClass)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + (i * 0.1) }}
                />
              );
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};
