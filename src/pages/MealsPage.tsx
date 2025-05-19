
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useFitness } from "@/context/FitnessContext";
import { MealSummary } from "@/components/dashboard/MealSummary";
import { QuickAddFood } from "@/components/dashboard/QuickAddFood";
import { motion } from "framer-motion";

export default function MealsPage() {
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

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Meals</h1>
        <p className="text-muted-foreground">Track and log your food intake</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="space-y-6" variants={itemVariants}>
          <Card className="card-hover overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-fitness-primary/10 to-fitness-secondary/10 dark:from-fitness-primary/5 dark:to-fitness-secondary/5">
              <CardTitle className="text-lg">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <QuickAddFood />
          </motion.div>
        </motion.div>
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <MealSummary />
        </motion.div>
      </div>
    </motion.div>
  );
}
