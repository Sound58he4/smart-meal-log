
import React from "react";
import { format } from "date-fns";
import { useFitness } from "@/context/FitnessContext";
import { NutritionSummary } from "@/components/dashboard/NutritionSummary";
import { MealSummary } from "@/components/dashboard/MealSummary";
import { QuickAddFood } from "@/components/dashboard/QuickAddFood";

export default function Dashboard() {
  const { currentDate, userProfile } = useFitness();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome back{userProfile ? `, ${userProfile.name.split(' ')[0]}` : ''}!</h1>
        <p className="text-muted-foreground">{format(currentDate, "EEEE, MMMM d, yyyy")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <NutritionSummary />
          <MealSummary />
        </div>
        <div>
          <QuickAddFood />
        </div>
      </div>
    </div>
  );
}
