
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFitness } from "@/context/FitnessContext";
import { BarChart, AreaChart } from "@/components/ui/chart";
import { format, subDays } from "date-fns";

export default function ProgressPage() {
  const { userProfile } = useFitness();

  // Generate fake data for charts
  const generateRecentDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      days.push(format(subDays(new Date(), i), "EEE"));
    }
    return days;
  };

  const days = generateRecentDays();

  const calorieData = {
    labels: days,
    datasets: [
      {
        data: [2100, 1950, 2350, 2020, 2180, 1800, 2200],
        backgroundColor: "rgba(61, 215, 195, 0.6)",
        label: "Calories",
      },
    ],
  };

  const nutrientsData = {
    labels: days,
    datasets: [
      {
        data: [120, 140, 155, 130, 145, 125, 150],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        label: "Protein (g)",
        fill: true,
      },
      {
        data: [200, 180, 240, 190, 220, 175, 210],
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.5)",
        label: "Carbs (g)",
        fill: true,
      },
      {
        data: [65, 55, 75, 60, 70, 50, 65],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        label: "Fat (g)",
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your Progress</h1>
        <p className="text-muted-foreground">Track your nutrition history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Calories</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <BarChart data={calorieData} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nutrients Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <AreaChart data={nutrientsData} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Daily Average</p>
              <p className="text-2xl font-bold text-fitness-primary">2,057</p>
              <p className="text-xs text-muted-foreground">calories</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Protein Goal</p>
              <p className="text-2xl font-bold text-blue-500">
                {userProfile?.goals.protein}g
              </p>
              <p className="text-xs text-muted-foreground">daily</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Carb Goal</p>
              <p className="text-2xl font-bold text-amber-500">
                {userProfile?.goals.carbs}g
              </p>
              <p className="text-xs text-muted-foreground">daily</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-muted-foreground">Fat Goal</p>
              <p className="text-2xl font-bold text-red-500">
                {userProfile?.goals.fat}g
              </p>
              <p className="text-xs text-muted-foreground">daily</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
