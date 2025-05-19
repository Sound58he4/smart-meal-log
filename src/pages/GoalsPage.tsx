
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { BadgeCheck, BarChart3, Calendar, Plus, Target, Utensils, Weight } from "lucide-react";
import { Goal } from "@/types";

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      name: "Weight Loss",
      description: "Reach target weight of 70kg",
      category: "weight",
      target: 70,
      current: 75,
      unit: "kg",
      startDate: new Date(2023, 0, 1),
      targetDate: new Date(2023, 11, 31),
      completed: false
    },
    {
      id: "2",
      name: "Daily Protein",
      description: "Consume at least 150g of protein daily",
      category: "nutrition",
      target: 150,
      current: 130,
      unit: "g",
      startDate: new Date(2023, 0, 1),
      targetDate: new Date(2023, 11, 31),
      completed: false
    },
    {
      id: "3",
      name: "Weekly Workouts",
      description: "Complete 4 strength training sessions per week",
      category: "workout",
      target: 4,
      current: 3,
      unit: "sessions",
      startDate: new Date(2023, 0, 1),
      targetDate: new Date(2023, 11, 31),
      completed: false
    },
    {
      id: "4",
      name: "Run 5K",
      description: "Be able to run 5K without stopping",
      category: "custom",
      target: 5,
      current: 3.2,
      unit: "km",
      startDate: new Date(2023, 0, 1),
      targetDate: new Date(2023, 11, 31),
      completed: false
    }
  ]);

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

  const getCategoryIcon = (category: Goal["category"]) => {
    switch (category) {
      case "weight":
        return <Weight className="h-5 w-5" />;
      case "nutrition":
        return <Utensils className="h-5 w-5" />;
      case "workout":
        return <BarChart3 className="h-5 w-5" />;
      default:
        return <Target className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: Goal["category"]) => {
    switch (category) {
      case "weight":
        return "bg-blue-500/20 text-blue-500";
      case "nutrition":
        return "bg-green-500/20 text-green-500";
      case "workout":
        return "bg-purple-500/20 text-purple-500";
      default:
        return "bg-amber-500/20 text-amber-500";
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    // For weight loss, progress increases as current decreases
    if (current > target) {
      const totalToLose = goals[0].current - target;
      const lost = goals[0].current - current;
      return (lost / totalToLose) * 100;
    }
    // For other goals, progress increases as current increases
    return (current / target) * 100;
  };

  const handleCompleteGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: true } : goal
    ));
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-3xl font-bold heading-gradient">Goals & Achievements</h1>
        <p className="text-muted-foreground">Track your progress toward fitness milestones</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="col-span-1"
        >
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Goals</p>
                  <p className="text-2xl font-bold">{goals.filter(g => !g.completed).length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="col-span-1"
        >
          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{goals.filter(g => g.completed).length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <BadgeCheck className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="col-span-1"
        >
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Completion</p>
                  <p className="text-2xl font-bold">78%</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="col-span-1"
        >
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Streak</p>
                  <p className="text-2xl font-bold">14 days</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6">
        <Card className="overflow-hidden border-none shadow-xl shadow-primary/5">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 pb-2">
            <CardTitle className="text-lg flex items-center">
              <div className="w-2 h-6 bg-primary rounded-full mr-2"></div>
              Your Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-4">
              {goals.map((goal) => (
                <motion.div 
                  key={goal.id}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`bg-card border rounded-lg p-4 ${goal.completed ? "border-green-500/30 bg-green-500/5" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`h-10 w-10 rounded-full ${getCategoryColor(goal.category)} flex items-center justify-center`}>
                      {getCategoryIcon(goal.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            {goal.name}
                            {goal.completed && (
                              <BadgeCheck className="h-4 w-4 text-green-500" />
                            )}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">{goal.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {goal.current}{goal.unit} / {goal.target}{goal.unit}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Target by {new Date(goal.targetDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{Math.min(100, Math.round(getProgressPercentage(goal.current, goal.target)))}%</span>
                        </div>
                        <Progress 
                          value={Math.min(100, getProgressPercentage(goal.current, goal.target))} 
                          className="h-2 bg-muted" 
                        />
                      </div>
                      
                      {!goal.completed && (
                        <div className="mt-4 flex justify-end">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCompleteGoal(goal.id)}
                          >
                            <BadgeCheck className="mr-1 h-4 w-4" />
                            Mark Complete
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <motion.div 
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 cursor-pointer"
              >
                <div className="h-12 w-12 rounded-full bg-muted/80 flex items-center justify-center mb-3">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-primary">Add New Goal</h3>
                <p className="text-xs text-muted-foreground mt-1">Create custom goals to track your progress</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
