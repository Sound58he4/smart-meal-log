
import React from "react";
import { format } from "date-fns";
import { useFitness } from "@/context/FitnessContext";
import { NutritionSummary } from "@/components/dashboard/NutritionSummary";
import { MealSummary } from "@/components/dashboard/MealSummary";
import { QuickAddFood } from "@/components/dashboard/QuickAddFood";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Award, Calendar, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { currentDate, userProfile, dailyLog } = useFitness();

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
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-3xl font-bold heading-gradient">Dashboard</h1>
        <p className="text-muted-foreground">{format(currentDate, "EEEE, MMMM d, yyyy")}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          variants={itemVariants}
          className="col-span-1"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="bg-gradient-to-br from-[#FF5757]/10 to-[#FF5757]/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Calories Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">
                    {dailyLog ? dailyLog.totalNutrition.calories.toFixed(0) : 0}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    kcal / {userProfile?.goals.calories || 0} goal
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-[#FF5757]/20 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-[#FF5757]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="col-span-1"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="bg-gradient-to-br from-[#58B9FF]/10 to-[#58B9FF]/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Meals Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">
                    {dailyLog ? dailyLog.meals.length : 0}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    meals logged
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-[#58B9FF]/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-[#58B9FF]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="col-span-1"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="bg-gradient-to-br from-[#8C52FF]/10 to-[#8C52FF]/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Weekly Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-xs text-muted-foreground">days in a row</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-[#8C52FF]/20 flex items-center justify-center">
                  <Award className="h-5 w-5 text-[#8C52FF]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="col-span-1"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Weight Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">{userProfile?.weight || 0}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">↓ 1.2</span> kg this month
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2 space-y-6"
          variants={itemVariants}
        >
          <NutritionSummary />
          <MealSummary />
        </motion.div>
        <motion.div variants={itemVariants}>
          <QuickAddFood />
        </motion.div>
      </div>
    </motion.div>
  );
}
