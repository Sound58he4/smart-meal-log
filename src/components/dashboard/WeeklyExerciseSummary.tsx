
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { motion } from "framer-motion";

interface DayData {
  day: string;
  calories: number;
  minutes: number;
  isToday?: boolean;
}

interface WeeklyExerciseSummaryProps {
  data: DayData[];
  totalCalories: number;
  totalMinutes: number;
}

export const WeeklyExerciseSummary = ({ 
  data, 
  totalCalories, 
  totalMinutes 
}: WeeklyExerciseSummaryProps) => {
  // Find max values to normalize bars
  const maxCalories = Math.max(...data.map(d => d.calories));
  const maxMinutes = Math.max(...data.map(d => d.minutes));
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-primary" />
          Weekly Exercise
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold">{totalCalories}</p>
            <p className="text-xs text-muted-foreground">calories burned</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{totalMinutes}</p>
            <p className="text-xs text-muted-foreground">minutes active</p>
          </div>
        </div>
        
        <div className="h-[140px] flex items-end justify-between gap-1">
          {data.map((day, index) => (
            <div 
              key={day.day} 
              className="flex flex-col items-center justify-end h-full"
            >
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${(day.calories / maxCalories) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`w-5 rounded-t-sm ${day.isToday ? 'bg-primary' : 'bg-primary/30'}`}
              />
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + (index * 0.05) }}
                className="mt-2"
              >
                <p className={`text-xs ${day.isToday ? 'font-bold' : ''}`}>{day.day}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
