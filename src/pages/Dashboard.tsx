
import React from "react";
import { format } from "date-fns";
import { useFitness } from "@/context/FitnessContext";
import { NutritionSummary } from "@/components/dashboard/NutritionSummary";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoalsCard } from "@/components/dashboard/GoalsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { FitnessTip } from "@/components/dashboard/FitnessTip";
import { WorkoutPlan } from "@/components/dashboard/WorkoutPlan";
import { RecentFoodLogs } from "@/components/dashboard/RecentFoodLogs";
import { WeeklyExerciseSummary } from "@/components/dashboard/WeeklyExerciseSummary";
import { WaterIntakeTip } from "@/components/dashboard/WaterIntakeTip";
import { ProgressTracker } from "@/components/dashboard/ProgressTracker";

// Mock data for components
const mockGoals = [
  { id: "1", name: "Lose Weight", progress: 3.2, target: 5, unit: "kg" },
  { id: "2", name: "Daily Protein", progress: 82, target: 120, unit: "g" },
  { id: "3", name: "Weekly Workouts", progress: 3, target: 4, unit: "sessions" },
];

const mockWorkouts = [
  { 
    day: "Monday", 
    isToday: false, 
    isCompleted: true,
    exercises: [
      { name: "Squats", sets: 3, reps: 12 },
      { name: "Push-ups", sets: 3, reps: 15 },
    ]
  },
  { 
    day: "Tuesday", 
    isToday: false,
    isCompleted: true,
    exercises: [
      { name: "Running", sets: 1, reps: 30 },
      { name: "Planks", sets: 3, reps: 60 },
    ]
  },
  { 
    day: "Wednesday", 
    isToday: true,
    exercises: [
      { name: "Deadlifts", sets: 4, reps: 8 },
      { name: "Pull-ups", sets: 3, reps: 10 },
      { name: "Lunges", sets: 3, reps: 12 },
    ]
  },
  { 
    day: "Thursday", 
    isToday: false,
    exercises: [
      { name: "Cycling", sets: 1, reps: 45 },
      { name: "Crunches", sets: 3, reps: 20 },
    ]
  },
  { 
    day: "Friday", 
    isToday: false,
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8 },
      { name: "Rows", sets: 3, reps: 12 },
    ]
  },
];

const mockFoodLogs = [
  { id: "1", name: "Oatmeal with Berries", calories: 320, protein: 12, time: "8:30 AM" },
  { id: "2", name: "Grilled Chicken Salad", calories: 450, protein: 35, time: "12:15 PM" },
  { id: "3", name: "Protein Shake", calories: 180, protein: 25, time: "3:45 PM" },
];

const mockExerciseData = [
  { day: "M", calories: 320, minutes: 35 },
  { day: "T", calories: 420, minutes: 45 },
  { day: "W", calories: 280, minutes: 30, isToday: true },
  { day: "T", calories: 0, minutes: 0 },
  { day: "F", calories: 0, minutes: 0 },
  { day: "S", calories: 0, minutes: 0 },
  { day: "S", calories: 0, minutes: 0 },
];

const mockProgressData = [
  { date: "May 1", value: 75.5 },
  { date: "May 8", value: 75.2 },
  { date: "May 15", value: 74.8 },
  { date: "May 22", value: 74.6 },
  { date: "May 29", value: 74.3 },
  { date: "Jun 5", value: 73.9 },
  { date: "Jun 12", value: 73.5 }
];

export default function Dashboard() {
  const { currentDate } = useFitness();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-2">
        <h1 className="text-3xl font-bold heading-gradient">Dashboard</h1>
        <p className="text-muted-foreground">{format(currentDate, "EEEE, MMMM d, yyyy")}</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="fitness">Fitness</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProgressTracker 
                  title="Weight Trend"
                  unit="kg"
                  data={mockProgressData}
                  percentChange={-1.2}
                  color="green"
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProgressTracker 
                  title="Weekly Workouts"
                  unit="completed"
                  data={[
                    { date: "May 1", value: 2 },
                    { date: "May 8", value: 3 },
                    { date: "May 15", value: 2 },
                    { date: "May 22", value: 4 },
                    { date: "May 29", value: 3 },
                    { date: "Jun 5", value: 2 },
                    { date: "Jun 12", value: 3 }
                  ]}
                  percentChange={0}
                  color="blue"
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProgressTracker 
                  title="Protein Intake"
                  unit="g daily avg"
                  data={[
                    { date: "May 1", value: 95 },
                    { date: "May 8", value: 102 },
                    { date: "May 15", value: 98 },
                    { date: "May 22", value: 110 },
                    { date: "May 29", value: 105 },
                    { date: "Jun 5", value: 112 },
                    { date: "Jun 12", value: 118 }
                  ]}
                  percentChange={5.3}
                  color="primary"
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProgressTracker 
                  title="Calories Burned"
                  unit="weekly"
                  data={[
                    { date: "May 1", value: 1200 },
                    { date: "May 8", value: 1350 },
                    { date: "May 15", value: 1180 },
                    { date: "May 22", value: 1420 },
                    { date: "May 29", value: 1380 },
                    { date: "Jun 5", value: 1250 },
                    { date: "Jun 12", value: 1320 }
                  ]}
                  percentChange={5.6}
                  color="orange"
                />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              <motion.div variants={itemVariants} className="sm:col-span-8 space-y-6">
                <NutritionSummary />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RecentFoodLogs entries={mockFoodLogs} />
                  <WeeklyExerciseSummary 
                    data={mockExerciseData} 
                    totalCalories={1020} 
                    totalMinutes={110}
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="sm:col-span-4 space-y-6">
                <QuickActions />
                <GoalsCard goals={mockGoals} />
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                  <WaterIntakeTip current={1200} target={2500} />
                  <FitnessTip tip="Focus on form rather than weight when resistance training. Proper form ensures you target the right muscles and reduces injury risk." />
                </div>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 h-[300px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Nutrition content will appear here</p>
              </Card>
              <Card className="h-[300px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Macros summary will appear here</p>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="fitness" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 h-[300px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Workouts will appear here</p>
              </Card>
              <WorkoutPlan workout={mockWorkouts} />
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="h-[350px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Weight trend will appear here</p>
              </Card>
              <Card className="h-[350px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Body measurements will appear here</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
