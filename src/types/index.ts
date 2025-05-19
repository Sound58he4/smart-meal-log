
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

// New types for workout tracking
export interface Exercise {
  id: string;
  name: string;
  category: "strength" | "cardio" | "flexibility" | "balance";
  muscleGroups: string[];
  image?: string;
}

export interface ExerciseSet {
  id: string;
  weight?: number; // kg
  reps?: number;
  duration?: number; // seconds
  distance?: number; // meters
  completed: boolean;
}

export interface WorkoutEntry {
  id: string;
  exercise: Exercise;
  sets: ExerciseSet[];
  notes: string;
  timestamp: Date;
}

export interface WorkoutLog {
  id: string;
  name: string;
  date: Date;
  exercises: WorkoutEntry[];
  duration: number; // minutes
  caloriesBurned: number;
}

// New types for activity logging
export interface ActivityLog {
  id: string;
  date: Date;
  weight?: number;
  sleep?: number; // hours
  waterIntake?: number; // ml
  mood?: "excellent" | "good" | "neutral" | "poor" | "terrible";
  notes?: string;
}

// New types for goal tracking
export interface Goal {
  id: string;
  name: string;
  description: string;
  category: "weight" | "nutrition" | "workout" | "custom";
  target: number;
  current: number;
  unit: string;
  startDate: Date;
  targetDate: Date;
  completed: boolean;
}
