
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFitness } from "@/context/FitnessContext";

export function NutritionSummary() {
  const { dailyLog, userProfile, progress } = useFitness();

  if (!dailyLog || !userProfile) return null;

  const { calories, protein, carbs, fat } = dailyLog.totalNutrition;
  const goals = userProfile.goals;

  const formatPercentage = (value: number) => {
    return Math.min(Math.round(value), 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Today's Nutrition</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Calories</span>
            <span className="text-sm font-medium">
              {calories.toFixed(0)} / {goals.calories} kcal
            </span>
          </div>
          <Progress value={formatPercentage(progress.caloriePercentage)} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Protein</span>
            <span className="text-sm font-medium">
              {protein.toFixed(1)} / {goals.protein} g
            </span>
          </div>
          <Progress value={formatPercentage(progress.proteinPercentage)} className="h-2 bg-muted" 
            indicatorClassName="bg-blue-500" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Carbs</span>
            <span className="text-sm font-medium">
              {carbs.toFixed(1)} / {goals.carbs} g
            </span>
          </div>
          <Progress value={formatPercentage(progress.carbsPercentage)} className="h-2 bg-muted" 
            indicatorClassName="bg-amber-500" />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Fat</span>
            <span className="text-sm font-medium">
              {fat.toFixed(1)} / {goals.fat} g
            </span>
          </div>
          <Progress value={formatPercentage(progress.fatPercentage)} className="h-2 bg-muted" 
            indicatorClassName="bg-red-500" />
        </div>
      </CardContent>
    </Card>
  );
}
