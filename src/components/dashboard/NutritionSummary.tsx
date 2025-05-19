
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFitness } from "@/context/FitnessContext";
import { motion } from "framer-motion";

export function NutritionSummary() {
  const { dailyLog, userProfile, progress } = useFitness();

  if (!dailyLog || !userProfile) return null;

  const { calories, protein, carbs, fat } = dailyLog.totalNutrition;
  const goals = userProfile.goals;

  const formatPercentage = (value: number) => {
    return Math.min(Math.round(value), 100);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-background to-muted/30 pb-2">
        <CardTitle className="text-lg flex items-center">
          <div className="w-2 h-6 bg-primary rounded-full mr-2"></div>
          Today's Nutrition
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-sm font-medium">Calories</span>
            <motion.span 
              className="text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {calories.toFixed(0)} / {goals.calories} kcal
            </motion.span>
          </div>
          <Progress 
            value={formatPercentage(progress.caloriePercentage)} 
            className="h-3 rounded-full overflow-hidden"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-sm font-medium">Protein</span>
            <span className="text-sm font-medium">
              {protein.toFixed(1)} / {goals.protein} g
            </span>
          </div>
          <Progress 
            value={formatPercentage(progress.proteinPercentage)} 
            className="h-3 rounded-full [&>div]:bg-blue-500 overflow-hidden" 
          />
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-sm font-medium">Carbs</span>
            <span className="text-sm font-medium">
              {carbs.toFixed(1)} / {goals.carbs} g
            </span>
          </div>
          <Progress 
            value={formatPercentage(progress.carbsPercentage)} 
            className="h-3 rounded-full [&>div]:bg-amber-500 overflow-hidden" 
          />
        </div>

        <div>
          <div className="flex justify-between mb-1.5">
            <span className="text-sm font-medium">Fat</span>
            <span className="text-sm font-medium">
              {fat.toFixed(1)} / {goals.fat} g
            </span>
          </div>
          <Progress 
            value={formatPercentage(progress.fatPercentage)} 
            className="h-3 rounded-full [&>div]:bg-red-500 overflow-hidden" 
          />
        </div>
      </CardContent>
    </Card>
  );
}
