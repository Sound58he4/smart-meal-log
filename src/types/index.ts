
export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface FoodItem {
  id: string;
  name: string;
  servingSize: string;
  nutrition: NutritionData;
  image?: string;
}

export interface MealEntry {
  id: string;
  foodItem: FoodItem;
  quantity: number;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  timestamp: Date;
}

export interface DailyLog {
  date: Date;
  meals: MealEntry[];
  totalNutrition: NutritionData;
}

export interface UserGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface UserProfile {
  name: string;
  weight: number;
  height: number;
  age: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very active";
  goals: UserGoals;
}
