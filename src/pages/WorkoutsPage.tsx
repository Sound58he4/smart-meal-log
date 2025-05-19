
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useFitness } from "@/context/FitnessContext";
import { motion } from "framer-motion";
import { Dumbbell, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function WorkoutsPage() {
  const { currentDate, setCurrentDate } = useFitness();
  const [date, setDate] = useState<Date | undefined>(currentDate);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setCurrentDate(newDate);
    }
  };

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

  // Sample workout routines
  const workoutRoutines = [
    { 
      id: "1", 
      name: "Full Body Strength", 
      exercises: 8, 
      duration: "45 min", 
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=100&auto=format" 
    },
    { 
      id: "2", 
      name: "HIIT Cardio", 
      exercises: 6, 
      duration: "30 min", 
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=100&auto=format" 
    },
    { 
      id: "3", 
      name: "Yoga Flow", 
      exercises: 10, 
      duration: "60 min", 
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=100&auto=format" 
    }
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-3xl font-bold heading-gradient">Workouts</h1>
        <p className="text-muted-foreground">Plan and track your exercise routines</p>
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <div className="bg-card rounded-lg p-3 flex items-center gap-2 mb-6">
          <div className="bg-muted rounded-md p-2">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <Input 
            placeholder="Find exercises or routines..." 
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-0" 
          />
          <div className="bg-muted rounded-md p-2">
            <Filter size={18} className="text-muted-foreground" />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="space-y-6" variants={itemVariants}>
          <Card className="overflow-hidden border-none shadow-xl shadow-primary/5">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 pb-2">
              <CardTitle className="text-lg flex items-center">
                <div className="w-2 h-6 bg-secondary rounded-full mr-2"></div>
                Schedule Your Workout
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
                className="rounded-md"
              />
            </CardContent>
          </Card>
          
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-none shadow-xl shadow-primary/5">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-2 h-6 bg-secondary rounded-full mr-2"></div>
                  Today's Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Active Calories</span>
                    <span className="text-lg font-bold text-primary">320 kcal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Active Time</span>
                    <span className="text-lg font-bold text-secondary">45 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Workouts</span>
                    <span className="text-lg font-bold text-accent">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <Card className="overflow-hidden border-none shadow-xl shadow-primary/5 mb-6">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 pb-2">
              <CardTitle className="text-lg flex items-center">
                <div className="w-2 h-6 bg-primary rounded-full mr-2"></div>
                Workout Routines
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workoutRoutines.map((routine) => (
                  <motion.div 
                    key={routine.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-3 p-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-muted">
                        {routine.image && (
                          <img 
                            src={routine.image} 
                            alt={routine.name} 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{routine.name}</h3>
                        <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                          <span>{routine.exercises} exercises</span>
                          <span>•</span>
                          <span>{routine.duration}</span>
                          <span>•</span>
                          <span>{routine.level}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-2"
                        >
                          Start Workout
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 cursor-pointer"
                >
                  <div className="h-12 w-12 rounded-full bg-muted/80 flex items-center justify-center mb-3">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-primary">Create Custom Workout</h3>
                  <p className="text-xs text-muted-foreground mt-1">Design your own exercise routine</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-none shadow-xl shadow-primary/5">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 pb-2">
              <CardTitle className="text-lg flex items-center">
                <div className="w-2 h-6 bg-accent rounded-full mr-2"></div>
                Recent Workouts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Dumbbell className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Full Body Strength</h4>
                        <p className="text-xs text-muted-foreground">Yesterday at 6:30 PM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">45 min</p>
                      <p className="text-xs text-muted-foreground">320 kcal</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div className="bg-background p-2 rounded">
                      <p className="text-xs text-muted-foreground">Squat</p>
                      <p className="font-medium">3 × 12 × 45kg</p>
                    </div>
                    <div className="bg-background p-2 rounded">
                      <p className="text-xs text-muted-foreground">Bench Press</p>
                      <p className="font-medium">3 × 10 × 60kg</p>
                    </div>
                    <div className="bg-background p-2 rounded">
                      <p className="text-xs text-muted-foreground">Deadlift</p>
                      <p className="font-medium">3 × 8 × 80kg</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Dumbbell className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-medium">HIIT Cardio</h4>
                        <p className="text-xs text-muted-foreground">3 days ago at 7:15 AM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">30 min</p>
                      <p className="text-xs text-muted-foreground">280 kcal</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div className="bg-background p-2 rounded">
                      <p className="text-xs text-muted-foreground">Burpees</p>
                      <p className="font-medium">3 × 15 reps</p>
                    </div>
                    <div className="bg-background p-2 rounded">
                      <p className="text-xs text-muted-foreground">Mountain Climbers</p>
                      <p className="font-medium">3 × 30 secs</p>
                    </div>
                    <div className="bg-background p-2 rounded">
                      <p className="text-xs text-muted-foreground">Jump Squats</p>
                      <p className="font-medium">3 × 20 reps</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
