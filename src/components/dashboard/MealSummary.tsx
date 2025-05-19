
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFitness } from "@/context/FitnessContext";
import { Separator } from "@/components/ui/separator";
import { Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export function MealSummary() {
  const { dailyLog, removeMealEntry } = useFitness();

  if (!dailyLog || dailyLog.meals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Today's Meals</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-muted-foreground">
          No meals logged today. Add your first meal!
        </CardContent>
      </Card>
    );
  }

  // Group meals by type
  const mealGroups = {
    breakfast: dailyLog.meals.filter(meal => meal.mealType === "breakfast"),
    lunch: dailyLog.meals.filter(meal => meal.mealType === "lunch"),
    dinner: dailyLog.meals.filter(meal => meal.mealType === "dinner"),
    snack: dailyLog.meals.filter(meal => meal.mealType === "snack"),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Today's Meals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(mealGroups).map(([mealType, meals]) => {
          if (meals.length === 0) return null;
          
          return (
            <div key={mealType} className="space-y-2">
              <h3 className="font-medium capitalize">{mealType}</h3>
              <div className="space-y-3">
                {meals.map(meal => (
                  <div key={meal.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {meal.foodItem.image ? (
                        <img 
                          src={meal.foodItem.image} 
                          alt={meal.foodItem.name}
                          className="h-10 w-10 rounded-md object-cover" 
                        />
                      ) : (
                        <div className="h-10 w-10 bg-muted rounded-md" />
                      )}
                      <div>
                        <p className="font-medium">{meal.foodItem.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{meal.quantity} × {meal.foodItem.servingSize}</span>
                          <span className="px-1">•</span>
                          <span>{meal.foodItem.nutrition.calories * meal.quantity} kcal</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground hidden md:flex items-center">
                        <Clock size={12} className="mr-1" />
                        {format(new Date(meal.timestamp), "h:mm a")}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeMealEntry(meal.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
