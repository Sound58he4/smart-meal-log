
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ProgressRing } from "@/components/ui/ProgressRing";
import {
  Target,
  Plus,
  CalendarDays,
  ArrowUpRight,
  BarChart3,
  Dumbbell,
  Apple,
  Weight,
  Trophy,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  CircleSlash,
  ArrowRight,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Mock data for goals
const activeGoals = [
  {
    id: "1",
    name: "Lose Weight",
    category: "weight",
    target: 10,
    unit: "kg",
    current: 3.5,
    startDate: new Date(2025, 3, 1), // April 1, 2025
    targetDate: new Date(2025, 6, 1), // July 1, 2025
    progress: 35,
    color: "green",
    icon: Weight,
  },
  {
    id: "2",
    name: "Increase Protein Intake",
    category: "nutrition",
    target: 120,
    unit: "g daily",
    current: 95,
    startDate: new Date(2025, 4, 1), // May 1, 2025
    targetDate: new Date(2025, 5, 1), // June 1, 2025
    progress: 79,
    color: "blue",
    icon: Apple,
  },
  {
    id: "3",
    name: "Complete 20 Workouts",
    category: "workout",
    target: 20,
    unit: "workouts",
    current: 8,
    startDate: new Date(2025, 4, 10), // May 10, 2025
    targetDate: new Date(2025, 5, 10), // June 10, 2025
    progress: 40,
    color: "purple",
    icon: Dumbbell,
  },
  {
    id: "4",
    name: "Run 100km",
    category: "workout",
    target: 100,
    unit: "km",
    current: 42.5,
    startDate: new Date(2025, 4, 1), // May 1, 2025
    targetDate: new Date(2025, 5, 30), // June 30, 2025
    progress: 42.5,
    color: "orange",
    icon: Target,
  },
];

const completedGoals = [
  {
    id: "5",
    name: "30-Day Yoga Challenge",
    category: "workout",
    target: 30,
    unit: "days",
    current: 30,
    startDate: new Date(2025, 3, 1), // April 1, 2025
    targetDate: new Date(2025, 3, 30), // April 30, 2025
    completedDate: new Date(2025, 3, 30), // April 30, 2025
    progress: 100,
    color: "purple",
    icon: Dumbbell,
  },
  {
    id: "6",
    name: "Drink More Water",
    category: "nutrition",
    target: 2500,
    unit: "ml daily",
    current: 2500,
    startDate: new Date(2025, 2, 15), // March 15, 2025
    targetDate: new Date(2025, 3, 15), // April 15, 2025
    completedDate: new Date(2025, 3, 12), // April 12, 2025 (completed early)
    progress: 100,
    color: "blue",
    icon: Apple,
  },
];

export default function GoalsPage() {
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState("");
  
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
  
  const getColorClass = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-500/10 text-green-500';
      case 'blue': return 'bg-blue-500/10 text-blue-500';
      case 'purple': return 'bg-purple-500/10 text-purple-500';
      case 'orange': return 'bg-orange-500/10 text-orange-500';
      default: return 'bg-primary/10 text-primary';
    }
  };
  
  const filteredActiveGoals = searchValue 
    ? activeGoals.filter(goal => 
        goal.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        goal.category.toLowerCase().includes(searchValue.toLowerCase())
      )
    : activeGoals;
    
  const filteredCompletedGoals = searchValue 
    ? completedGoals.filter(goal => 
        goal.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        goal.category.toLowerCase().includes(searchValue.toLowerCase())
      )
    : completedGoals;
  
  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-2">
        <h1 className="text-3xl font-bold heading-gradient">Goals</h1>
        <p className="text-muted-foreground">Set and track your health and fitness goals</p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="active">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="active" className="flex items-center gap-2">
                <Target className="h-4 w-4" /> Active
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Completed
              </TabsTrigger>
              <TabsTrigger value="suggested" className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4" /> Suggested
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1">
                <Input 
                  placeholder="Search goals..." 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                onClick={() => handleAction("Create new goal")}
                className="whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </div>
          </div>
          
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Goals</p>
                      <p className="text-2xl font-bold">{activeGoals.length}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Progress</p>
                      <p className="text-2xl font-bold">
                        {Math.round(activeGoals.reduce((acc, goal) => acc + goal.progress, 0) / activeGoals.length)}%
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold">{completedGoals.length}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Upcoming Due</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActiveGoals.map((goal, index) => (
                <motion.div 
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-8 w-8 rounded-full ${getColorClass(goal.color)} flex items-center justify-center`}>
                            <goal.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{goal.name}</CardTitle>
                            <CardDescription className="capitalize">{goal.category}</CardDescription>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAction("Edit goal")}>
                              Edit Goal
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Mark as complete")}>
                              Mark as Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Delete goal")} className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex justify-between items-center mb-5">
                        <div className="flex items-center gap-1 text-sm">
                          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                          <p className="text-muted-foreground">Due {goal.targetDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                        </div>
                        <Badge variant="outline" className="font-normal">
                          {Math.round((goal.targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="mr-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold">{goal.current}</span>
                            <span className="text-sm text-muted-foreground">/ {goal.target} {goal.unit}</span>
                          </div>
                          <div className="flex items-baseline mt-2">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="ml-auto text-sm font-medium">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="mt-1" />
                        </div>
                        <ProgressRing 
                          progress={goal.progress} 
                          size={70} 
                          strokeWidth={6} 
                          color={`stroke-${goal.color}-500`}
                          bgColor={`stroke-${goal.color}-500/10`}
                          showPercentage={false}
                        >
                          {goal.progress < 100 ? (
                            <span className="text-sm font-medium">{goal.progress}%</span>
                          ) : (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                        </ProgressRing>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-4"
                        onClick={() => handleAction("Update progress")}
                      >
                        Update Progress
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {filteredActiveGoals.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center p-10 text-center">
                  <Target className="h-10 w-10 text-muted mb-2" />
                  <h3 className="text-lg font-medium">No active goals found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or create a new goal</p>
                  <Button onClick={() => handleAction("Create new goal")}>
                    Create New Goal
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompletedGoals.map((goal, index) => (
                <motion.div 
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full opacity-90 bg-muted/30">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-8 w-8 rounded-full ${getColorClass(goal.color)} flex items-center justify-center`}>
                            <goal.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <CardTitle className="text-base">{goal.name}</CardTitle>
                              <Badge className="ml-2 bg-green-500" variant="default">
                                Completed
                              </Badge>
                            </div>
                            <CardDescription className="capitalize">{goal.category}</CardDescription>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleAction("View goal details")}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Create similar")}>
                              Create Similar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Delete goal")} className="text-destructive">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex justify-between items-center mb-5">
                        <div className="flex items-center gap-1 text-sm">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                          <p className="text-muted-foreground">Completed {goal.completedDate?.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="mr-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold">{goal.current}</span>
                            <span className="text-sm text-muted-foreground">/ {goal.target} {goal.unit}</span>
                          </div>
                          <div className="flex items-baseline mt-2">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="ml-auto text-sm font-medium">100%</span>
                          </div>
                          <Progress value={100} className="mt-1" />
                        </div>
                        <ProgressRing 
                          progress={100} 
                          size={70} 
                          strokeWidth={6} 
                          color="stroke-green-500"
                          bgColor="stroke-green-500/10"
                          showPercentage={false}
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </ProgressRing>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {filteredCompletedGoals.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center p-10 text-center">
                  <Trophy className="h-10 w-10 text-muted mb-2" />
                  <h3 className="text-lg font-medium">No completed goals found</h3>
                  <p className="text-muted-foreground mb-4">Complete some goals to see them here</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="suggested" className="space-y-6">
            <Card className="bg-gradient-to-r from-primary/20 to-primary/5 mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="md:flex-1">
                    <h3 className="text-xl font-bold mb-2">Goal Suggestions</h3>
                    <p className="text-muted-foreground">Based on your activity and progress, we've created personalized goal suggestions for you.</p>
                  </div>
                  <Button onClick={() => handleAction("Get AI suggestions")}>
                    Get AI Suggestions <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="h-[200px] flex items-center justify-center bg-muted/50">
                <div className="flex flex-col items-center text-center p-6">
                  <CircleSlash className="h-12 w-12 text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">No goal suggestions available yet</p>
                  <Button variant="outline" className="mt-4" onClick={() => handleAction("Generate suggestions")}>
                    Generate Suggestions
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
