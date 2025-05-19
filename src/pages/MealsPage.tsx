
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useFitness } from "@/context/FitnessContext";
import { MealSummary } from "@/components/dashboard/MealSummary";
import { QuickAddFood } from "@/components/dashboard/QuickAddFood";

export default function MealsPage() {
  const { currentDate, setCurrentDate } = useFitness();
  const [date, setDate] = useState<Date | undefined>(currentDate);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setCurrentDate(newDate);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meals</h1>
        <p className="text-muted-foreground">Track and log your food intake</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
              />
            </CardContent>
          </Card>
          <QuickAddFood />
        </div>
        <div className="lg:col-span-2">
          <MealSummary />
        </div>
      </div>
    </div>
  );
}
