
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  bgColor?: string;
  showPercentage?: boolean;
  children?: React.ReactNode;
}

export const ProgressRing = ({
  progress,
  size = 80,
  strokeWidth = 6,
  className,
  color = "stroke-primary",
  bgColor = "stroke-muted",
  showPercentage = true,
  children,
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          className={cn("fill-none transition-all duration-300", bgColor)}
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          className={cn("fill-none transition-all duration-300", color)}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute flex items-center justify-center">
        {children ? (
          children
        ) : (
          showPercentage && (
            <motion.span 
              className="text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.round(progress)}%
            </motion.span>
          )
        )}
      </div>
    </div>
  );
};
