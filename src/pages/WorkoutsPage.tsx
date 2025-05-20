
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Dumbbell, 
  Clock, 
  Calendar, 
  Filter, 
  Plus, 
  Search, 
  ChevronDown,
  MoreHorizontal,
  Heart,
  ArrowRight,
  BarChart3,
  Target
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { ProgressRing } from "@/components/ui/ProgressRing";

// Mock data
const workoutPlans = [
  {
    id: "1",
    name: "Strength Builder",
    description: "4-week progressive strength program",
    level: "Intermediate",
    category: "strength",
    duration: "45-60 min",
    frequency: "4x / week",
    progress: 35,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Cardio Blast",
    description: "High-intensity interval training",
    level: "Advanced",
    category: "cardio",
    duration: "30 min",
    frequency: "3x / week",
    progress: 60,
    image: "https://images.unsplash.com/photo-1606889464198-fcb18894cf50?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Beginner's Fitness",
    description: "Introduction to fitness training",
    level: "Beginner",
    category: "general",
    duration: "30-40 min",
    frequency: "3x / week",
    progress: 80,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Core Crusher",
    description: "Core and abs focused workouts",
    level: "Intermediate",
    category: "strength",
    duration: "20 min",
    frequency: "4x / week",
    progress: 15,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop"
  },
];

const recentWorkouts = [
  {
    id: "w1",
    name: "Upper Body Strength",
    date: new Date(2025, 4, 19), // May 19, 2025
    duration: 48,
    caloriesBurned: 320,
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8, 8, 6, 6" },
      { name: "Pull-ups", sets: 3, reps: "10, 8, 8" },
      { name: "Shoulder Press", sets: 3, reps: "12, 10, 10" },
      { name: "Bicep Curls", sets: 3, reps: "12, 12, 10" },
    ]
  },
  {
    id: "w2",
    name: "HIIT Cardio",
    date: new Date(2025, 4, 17), // May 17, 2025
    duration: 32,
    caloriesBurned: 380,
    exercises: [
      { name: "Sprints", sets: 8, reps: "30s work, 30s rest" },
      { name: "Burpees", sets: 4, reps: "15, 15, 12, 12" },
      { name: "Mountain Climbers", sets: 4, reps: "45s each" },
    ]
  },
];

export default function WorkoutsPage() {
  const { toast } = useToast();
  const [filterValue, setFilterValue] = useState("");

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

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} will be available soon!`,
    });
  };

  const filteredWorkoutPlans = filterValue 
    ? workoutPlans.filter(plan => 
        plan.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        plan.description.toLowerCase().includes(filterValue.toLowerCase()) ||
        plan.level.toLowerCase().includes(filterValue.toLowerCase()) ||
        plan.category.toLowerCase().includes(filterValue.toLowerCase())
      )
    : workoutPlans;

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-2">
        <h1 className="text-3xl font-bold heading-gradient">Workouts</h1>
        <p className="text-muted-foreground">Manage your workout plans and track your exercise history</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="plans">
          <TabsList className="w-full sm:w-auto mb-6">
            <TabsTrigger value="plans">My Plans</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plans" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search plans..." 
                  className="pl-10"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="sm:w-auto flex items-center gap-2"
                  onClick={() => handleAction("Filter")}
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
                <Button 
                  className="flex-1 sm:w-auto"
                  onClick={() => handleAction("Create new workout plan")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Create Plan</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkoutPlans.map((plan, index) => (
                <motion.div 
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden h-full">
                    <div className="h-40 relative">
                      <img 
                        src={plan.image} 
                        alt={plan.name} 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-3 right-3 bg-primary">
                        {plan.level}
                      </Badge>
                      <div className="absolute bottom-3 right-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleAction("Edit plan")}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Share plan")}>
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Delete plan")} className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{plan.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{plan.frequency}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{plan.progress}%</span>
                        </div>
                        <Progress value={plan.progress} />
                      </div>
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => handleAction("Start workout")}
                      >
                        Continue Plan
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {filteredWorkoutPlans.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center p-10 text-center">
                  <Dumbbell className="h-10 w-10 text-muted mb-2" />
                  <h3 className="text-lg font-medium">No workout plans found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or create a new plan</p>
                  <Button onClick={() => handleAction("Create new workout plan")}>
                    Create New Plan
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search history..." className="pl-10" />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="sm:w-auto flex items-center gap-2"
                  onClick={() => handleAction("Filter history")}
                >
                  <Filter className="h-4 w-4" />
                  Filter
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button 
                  className="flex-1 sm:w-auto"
                  onClick={() => handleAction("Log workout manually")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Log Workout
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentWorkouts.map((workout, index) => (
                <motion.div
                  key={workout.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{workout.name}</CardTitle>
                          <CardDescription>
                            {workout.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAction("View details")}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Edit workout")}>
                              Edit Workout
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Delete workout")} className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-muted/30 p-3 rounded-md flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="font-medium">{workout.duration} mins</p>
                          </div>
                        </div>
                        
                        <div className="bg-muted/30 p-3 rounded-md flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                            <Heart className="h-5 w-5 text-red-500" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Calories</p>
                            <p className="font-medium">{workout.caloriesBurned} kcal</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-2">
                        <p className="text-sm font-medium">Exercises:</p>
                        <div className="grid grid-cols-1 gap-2">
                          {workout.exercises.map((exercise, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span>{exercise.name}</span>
                              <span className="text-muted-foreground">{exercise.sets} sets × {exercise.reps}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-4">
              <Button 
                variant="outline" 
                className="w-full max-w-md"
                onClick={() => handleAction("View all history")}
              >
                View All History
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="explore" className="space-y-6">
            <div className="bg-gradient-to-r from-primary/30 to-primary/5 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Discover New Workouts</h2>
                <p className="text-muted-foreground max-w-md">Find workout plans tailored to your goals and fitness level</p>
              </div>
              <Button size="lg" onClick={() => handleAction("Explore workouts")}>
                Browse Library <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 h-[350px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Featured workouts will appear here</p>
              </Card>
              <Card className="h-[350px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Categories will appear here</p>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">This Week</p>
                      <div className="flex items-end gap-1">
                        <p className="text-2xl font-bold">4</p>
                        <p className="text-sm text-muted-foreground mb-1">workouts</p>
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Time</p>
                      <div className="flex items-end gap-1">
                        <p className="text-2xl font-bold">3.5</p>
                        <p className="text-sm text-muted-foreground mb-1">hours</p>
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Calories Burned</p>
                      <div className="flex items-end gap-1">
                        <p className="text-2xl font-bold">1,250</p>
                        <p className="text-sm text-muted-foreground mb-1">kcal</p>
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <div className="flex items-end gap-1">
                        <p className="text-2xl font-bold">32%</p>
                        <p className="text-sm text-muted-foreground mb-1">complete</p>
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Target className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="h-[350px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Workout activity chart will appear here</p>
              </Card>
              <Card className="h-[350px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Exercise distribution will appear here</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
