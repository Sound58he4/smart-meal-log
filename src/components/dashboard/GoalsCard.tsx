
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Target, TrendingUp, Award } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  progress: number;
  target: number;
  unit: string;
  dueDate?: Date;
}

interface GoalsCardProps {
  goals: Goal[];
}

export const GoalsCard = ({ goals }: GoalsCardProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Goals in Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {goals.map((goal) => (
            <motion.div 
              key={goal.id} 
              className="flex items-center justify-between gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex-1">
                <h4 className="font-medium text-sm">{goal.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {goal.progress} / {goal.target} {goal.unit}
                  {goal.dueDate && ` • Due ${goal.dueDate.toLocaleDateString()}`}
                </p>
              </div>
              <ProgressRing 
                progress={(goal.progress / goal.target) * 100} 
                size={44} 
                strokeWidth={4} 
                showPercentage={false}
              >
                {goal.progress >= goal.target ? (
                  <Award className="h-4 w-4 text-primary" />
                ) : (
                  <TrendingUp className="h-3 w-3 text-primary" />
                )}
              </ProgressRing>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};
