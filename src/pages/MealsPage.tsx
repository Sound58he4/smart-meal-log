
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useFitness } from "@/context/FitnessContext";
import { MealSummary } from "@/components/dashboard/MealSummary";
import { QuickAddFood } from "@/components/dashboard/QuickAddFood";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

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
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-3xl font-bold heading-gradient">Meals & Nutrition</h1>
        <p className="text-muted-foreground">Track and log your food intake</p>
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <div className="bg-card rounded-lg p-3 flex items-center gap-2 mb-6">
          <div className="bg-muted rounded-md p-2">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <Input 
            placeholder="Search foods..." 
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
                Select Date
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
