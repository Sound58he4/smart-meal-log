
import React, { createContext, useContext, useState, useEffect } from "react";
import { DailyLog, FoodItem, MealEntry, NutritionData, UserGoals, UserProfile } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

interface FitnessContextType {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  dailyLog: DailyLog | null;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  searchFoods: (query: string) => Promise<FoodItem[]>;
  addMealEntry: (foodItem: FoodItem, quantity: number, mealType: MealEntry["mealType"]) => void;
  removeMealEntry: (entryId: string) => void;
  aiAnalyzeImage: (imageData: string) => Promise<FoodItem[]>;
  progress: {
    caloriePercentage: number;
    proteinPercentage: number;
    carbsPercentage: number;
    fatPercentage: number;
  };
}

// Sample food database
const foodDatabase: FoodItem[] = [
  {
    id: "1",
    name: "Apple",
    servingSize: "1 medium (182g)",
    nutrition: { calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=100&auto=format"
  },
  {
    id: "2",
    name: "Grilled Chicken Breast",
    servingSize: "100g",
    nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    image: "https://images.unsplash.com/photo-1626082929543-5bfd85ea6ff6?q=80&w=100&auto=format"
  },
  {
    id: "3",
    name: "Brown Rice",
    servingSize: "1 cup cooked (195g)",
    nutrition: { calories: 216, protein: 5, carbs: 45, fat: 1.8 },
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=100&auto=format"
  },
  {
    id: "4",
    name: "Avocado",
    servingSize: "1/2 medium (68g)",
    nutrition: { calories: 114, protein: 1.3, carbs: 6, fat: 10.5 },
    image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=100&auto=format"
  },
  {
    id: "5",
    name: "Salmon",
    servingSize: "100g",
    nutrition: { calories: 208, protein: 20, carbs: 0, fat: 13 },
    image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=100&auto=format"
  },
];

// Sample user profile
const defaultUserProfile: UserProfile = {
  name: "John Doe",
  weight: 75, // kg
  height: 175, // cm
  age: 30,
  activityLevel: "moderate",
  goals: {
    calories: 2200,
    protein: 150,
    carbs: 225,
    fat: 70,
  },
};

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(defaultUserProfile);
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);
  const { toast } = useToast();

  // Initialize daily log
  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    setDailyLog({
      date: currentDate,
      meals: [],
      totalNutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    });
  }, [currentDate]);

  // Calculate progress percentages
  const progress = {
    caloriePercentage: userProfile && dailyLog ? (dailyLog.totalNutrition.calories / userProfile.goals.calories) * 100 : 0,
    proteinPercentage: userProfile && dailyLog ? (dailyLog.totalNutrition.protein / userProfile.goals.protein) * 100 : 0,
    carbsPercentage: userProfile && dailyLog ? (dailyLog.totalNutrition.carbs / userProfile.goals.carbs) * 100 : 0,
    fatPercentage: userProfile && dailyLog ? (dailyLog.totalNutrition.fat / userProfile.goals.fat) * 100 : 0,
  };

  // Search foods function
  const searchFoods = async (query: string): Promise<FoodItem[]> => {
    // In a real app, this would be an API call
    return foodDatabase.filter(food => 
      food.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Add meal entry
  const addMealEntry = (foodItem: FoodItem, quantity: number, mealType: MealEntry["mealType"]) => {
    if (!dailyLog) return;
    
    const newEntry: MealEntry = {
      id: uuidv4(),
      foodItem,
      quantity,
      mealType,
      timestamp: new Date(),
    };
    
    // Calculate nutrition for this entry
    const entryNutrition: NutritionData = {
      calories: foodItem.nutrition.calories * quantity,
      protein: foodItem.nutrition.protein * quantity,
      carbs: foodItem.nutrition.carbs * quantity,
      fat: foodItem.nutrition.fat * quantity,
    };
    
    // Update total nutrition
    const updatedTotalNutrition: NutritionData = {
      calories: dailyLog.totalNutrition.calories + entryNutrition.calories,
      protein: dailyLog.totalNutrition.protein + entryNutrition.protein,
      carbs: dailyLog.totalNutrition.carbs + entryNutrition.carbs,
      fat: dailyLog.totalNutrition.fat + entryNutrition.fat,
    };
    
    setDailyLog({
      ...dailyLog,
      meals: [...dailyLog.meals, newEntry],
      totalNutrition: updatedTotalNutrition,
    });
    
    toast({
      title: "Meal added",
      description: `Added ${foodItem.name} to your ${mealType}`,
    });
  };
  
  // Remove meal entry
  const removeMealEntry = (entryId: string) => {
    if (!dailyLog) return;
    
    const entryToRemove = dailyLog.meals.find(meal => meal.id === entryId);
    if (!entryToRemove) return;
    
    // Subtract this entry's nutrition from the total
    const updatedTotalNutrition: NutritionData = {
      calories: dailyLog.totalNutrition.calories - (entryToRemove.foodItem.nutrition.calories * entryToRemove.quantity),
      protein: dailyLog.totalNutrition.protein - (entryToRemove.foodItem.nutrition.protein * entryToRemove.quantity),
      carbs: dailyLog.totalNutrition.carbs - (entryToRemove.foodItem.nutrition.carbs * entryToRemove.quantity),
      fat: dailyLog.totalNutrition.fat - (entryToRemove.foodItem.nutrition.fat * entryToRemove.quantity),
    };
    
    setDailyLog({
      ...dailyLog,
      meals: dailyLog.meals.filter(meal => meal.id !== entryId),
      totalNutrition: updatedTotalNutrition,
    });
    
    toast({
      title: "Meal removed",
      description: `Removed ${entryToRemove.foodItem.name} from your log`,
    });
  };
  
  // AI image analysis (mock implementation)
  const aiAnalyzeImage = async (imageData: string): Promise<FoodItem[]> => {
    // In a real app, this would call an AI service API
    // For now, return random food items from our database to simulate AI detection
    toast({
      title: "AI Processing",
      description: "Analyzing your food image...",
    });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return 1-3 random food items
    const numberOfItems = Math.floor(Math.random() * 3) + 1;
    const results: FoodItem[] = [];
    
    for (let i = 0; i < numberOfItems; i++) {
      const randomIndex = Math.floor(Math.random() * foodDatabase.length);
      results.push(foodDatabase[randomIndex]);
    }
    
    return results;
  };

  return (
    <FitnessContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        dailyLog,
        userProfile,
        setUserProfile,
        searchFoods,
        addMealEntry,
        removeMealEntry,
        aiAnalyzeImage,
        progress,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (context === undefined) {
    throw new Error("useFitness must be used within a FitnessProvider");
  }
  return context;
};
