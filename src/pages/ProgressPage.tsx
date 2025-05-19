
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFitness } from "@/context/FitnessContext";
import { BarChart, AreaChart } from "@/components/ui/charts";
import { format, subDays } from "date-fns";

export default function ProgressPage() {
  const { userProfile } = useFitness();

  // Generate fake data for charts
  const generateRecentDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      days.push(format(subDays(new Date(), i), "EEE"));
    }
    return days;
  };

  const days = generateRecentDays();

  const calorieData = {
    labels: days,
    datasets: [
      {
        data: [2100, 1950, 2350, 2020, 2180, 1800, 2200],
        backgroundColor: "rgba(255, 87, 87, 0.7)",
        label: "Calories",
      },
    ],
  };

  const nutrientsData = {
    labels: days,
    datasets: [
      {
        data: [120, 140, 155, 130, 145, 125, 150],
        borderColor: "#58B9FF",
        backgroundColor: "rgba(88, 185, 255, 0.3)",
        label: "Protein (g)",
        fill: true,
      },
      {
        data: [200, 180, 240, 190, 220, 175, 210],
        borderColor: "#FFBF3C",
        backgroundColor: "rgba(255, 191, 60, 0.3)",
        label: "Carbs (g)",
        fill: true,
      },
      {
        data: [65, 55, 75, 60, 70, 50, 65],
        borderColor: "#FF5757",
        backgroundColor: "rgba(255, 87, 87, 0.3)",
        label: "Fat (g)",
        fill: true,
      },
    ],
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
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
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-3xl font-bold heading-gradient">Progress Tracking</h1>
        <p className="text-muted-foreground">Monitor your nutrition history</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card className="overflow-hidden border-none shadow-xl shadow-primary/5">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-2">
              <CardTitle className="text-lg flex items-center">
                <div className="w-2 h-6 bg-primary rounded-full mr-2"></div>
                Weekly Calories
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80 pt-4">
              <BarChart data={calorieData} />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card className="overflow-hidden border-none shadow-xl shadow-secondary/5">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5 pb-2">
              <CardTitle className="text-lg flex items-center">
                <div className="w-2 h-6 bg-secondary rounded-full mr-2"></div>
                Nutrients Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80 pt-4">
              <AreaChart data={nutrientsData} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="overflow-hidden border-none shadow-xl shadow-accent/5">
          <CardHeader className="bg-gradient-to-r from-accent/10 to-accent/5 pb-2">
            <CardTitle className="text-lg flex items-center">
              <div className="w-2 h-6 bg-accent rounded-full mr-2"></div>
              Your Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <motion.div 
                className="p-4 bg-background rounded-lg border shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm text-muted-foreground">Daily Average</p>
                <p className="text-2xl font-bold text-primary animate-bounce-subtle">2,057</p>
                <p className="text-xs text-muted-foreground">calories</p>
              </motion.div>
              
              <motion.div 
                className="p-4 bg-background rounded-lg border shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm text-muted-foreground">Protein Goal</p>
                <p className="text-2xl font-bold text-[#58B9FF] animate-bounce-subtle">
                  {userProfile?.goals.protein}g
                </p>
                <p className="text-xs text-muted-foreground">daily target</p>
              </motion.div>
              
              <motion.div 
                className="p-4 bg-background rounded-lg border shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm text-muted-foreground">Carb Goal</p>
                <p className="text-2xl font-bold text-[#FFBF3C] animate-bounce-subtle">
                  {userProfile?.goals.carbs}g
                </p>
                <p className="text-xs text-muted-foreground">daily target</p>
              </motion.div>
              
              <motion.div 
                className="p-4 bg-background rounded-lg border shadow-sm"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-sm text-muted-foreground">Fat Goal</p>
                <p className="text-2xl font-bold text-[#FF5757] animate-bounce-subtle">
                  {userProfile?.goals.fat}g
                </p>
                <p className="text-xs text-muted-foreground">daily target</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
