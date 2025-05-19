
import React from "react";
import { format } from "date-fns";
import { useFitness } from "@/context/FitnessContext";
import { NutritionSummary } from "@/components/dashboard/NutritionSummary";
import { MealSummary } from "@/components/dashboard/MealSummary";
import { QuickAddFood } from "@/components/dashboard/QuickAddFood";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { currentDate, userProfile } = useFitness();

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
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Welcome back{userProfile ? `, ${userProfile.name.split(' ')[0]}` : ''}!</h1>
        <p className="text-muted-foreground">{format(currentDate, "EEEE, MMMM d, yyyy")}</p>
      </motion.div>

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
