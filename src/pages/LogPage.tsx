import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useFitness } from "@/context/FitnessContext";
import { motion } from "framer-motion";
import { Activity, BarChart3, BookOpen, Droplet, LineChart, Smile, Sun, Weight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ActivityLog } from "@/types";

export default function LogPage() {
  const { currentDate, setCurrentDate } = useFitness();
  const [date, setDate] = useState<Date | undefined>(currentDate);
  const { toast } = useToast();

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: "1",
      date: new Date(2023, 4, 15),
      weight: 75,
      sleep: 7.5,
      waterIntake: 2400,
      mood: "good",
      notes: "Felt energetic today. Morning run was great."
    },
    {
      id: "2",
      date: new Date(2023, 4, 14),
      weight: 75.3,
      sleep: 6.5,
      waterIntake: 2100,
      mood: "neutral",
      notes: "Busy workday, didn't have much time for exercise."
    },
    {
      id: "3",
      date: new Date(2023, 4, 13),
      weight: 75.5,
      sleep: 8,
      waterIntake: 2500,
      mood: "excellent",
      notes: "Rest day. Focused on stretching and recovery."
    }
  ]);

  const [newLog, setNewLog] = useState<Partial<ActivityLog>>({
    date: new Date(),
    weight: 75,
    sleep: 7,
    waterIntake: 2000,
    mood: "good",
    notes: ""
  });

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      setCurrentDate(newDate);
    }
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add new log
    const newLogEntry: ActivityLog = {
      id: `log-${Date.now()}`,
      date: date || new Date(),
      weight: newLog.weight || 0,
      sleep: newLog.sleep || 0,
      waterIntake: newLog.waterIntake || 0,
      mood: newLog.mood as "excellent" | "good" | "neutral" | "poor" | "terrible" || "neutral",
      notes: newLog.notes || ""
    };
    
    setActivityLogs([newLogEntry, ...activityLogs]);
    
    toast({
      title: "Daily Log Added",
      description: `Log for ${format(date || new Date(), "MMMM d, yyyy")} has been saved.`
    });
    
    // Reset form (but keep the values for easier entry next time)
    setNewLog({
      ...newLog,
      notes: ""
    });
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

  const getMoodEmoji = (mood: string | undefined) => {
    switch (mood) {
      case "excellent": return "😁";
      case "good": return "🙂";
      case "neutral": return "😐";
      case "poor": return "😔";
      case "terrible": return "😣";
      default: return "😐";
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
        <h1 className="text-3xl font-bold heading-gradient">Daily Log</h1>
        <p className="text-muted-foreground">Track your daily metrics and activities</p>
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
          
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-none shadow-xl shadow-primary/5">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-2 h-6 bg-primary rounded-full mr-2"></div>
                  Log Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                      </div>
                      <span className="text-sm">Total Logs</span>
                    </div>
                    <span className="text-lg font-bold">{activityLogs.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <LineChart className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-sm">Logging Streak</span>
                    </div>
                    <span className="text-lg font-bold">3 days</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center mr-3">
                        <Activity className="h-4 w-4 text-amber-500" />
                      </div>
                      <span className="text-sm">Last Log</span>
                    </div>
                    <span className="text-sm font-medium">Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new">Add New Log</TabsTrigger>
              <TabsTrigger value="history">Log History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new" className="mt-6">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <form onSubmit={handleLogSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center">
                          <Weight className="h-4 w-4 mr-1" />
                          Weight (kg)
                        </label>
                        <Input
                          type="number"
                          step="0.1"
                          min="30"
                          max="300"
                          value={newLog.weight}
                          onChange={(e) => setNewLog({ ...newLog, weight: parseFloat(e.target.value) })}
                          className="bg-muted/50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center">
                          <Sun className="h-4 w-4 mr-1" />
                          Sleep (hours)
                        </label>
                        <Input
                          type="number"
                          step="0.5"
                          min="0"
                          max="24"
                          value={newLog.sleep}
                          onChange={(e) => setNewLog({ ...newLog, sleep: parseFloat(e.target.value) })}
                          className="bg-muted/50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center">
                          <Droplet className="h-4 w-4 mr-1" />
                          Water (ml)
                        </label>
                        <Input
                          type="number"
                          step="50"
                          min="0"
                          value={newLog.waterIntake}
                          onChange={(e) => setNewLog({ ...newLog, waterIntake: parseInt(e.target.value) })}
                          className="bg-muted/50"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center">
                          <Smile className="h-4 w-4 mr-1" />
                          Mood
                        </label>
                        <select 
                          value={newLog.mood}
                          onChange={(e) => setNewLog({ ...newLog, mood: e.target.value as any })}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          <option value="excellent">Excellent 😁</option>
                          <option value="good">Good 🙂</option>
                          <option value="neutral">Neutral 😐</option>
                          <option value="poor">Poor 😔</option>
                          <option value="terrible">Terrible 😣</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Notes
                      </label>
                      <textarea
                        value={newLog.notes}
                        onChange={(e) => setNewLog({ ...newLog, notes: e.target.value })}
                        className="w-full h-20 px-3 py-2 rounded-md border border-input bg-background/50 text-sm resize-none"
                        placeholder="How was your day? Any notable events or activities?"
                      ></textarea>
                    </div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                      className="pt-2"
                    >
                      <Button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      >
                        Save Daily Log
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {activityLogs.map((log) => (
                      <motion.div 
                        key={log.id}
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-lg">{getMoodEmoji(log.mood)}</span>
                            </div>
                            <div>
                              <h3 className="font-medium">{format(log.date, "MMMM d, yyyy")}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{format(log.date, "EEEE")}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <Button variant="ghost" size="sm">
                              <BarChart3 className="h-4 w-4" />
                              <span className="ml-1">Details</span>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="bg-muted/50 p-2 rounded text-center">
                            <p className="text-xs text-muted-foreground">Weight</p>
                            <p className="font-medium">{log.weight} kg</p>
                          </div>
                          <div className="bg-muted/50 p-2 rounded text-center">
                            <p className="text-xs text-muted-foreground">Sleep</p>
                            <p className="font-medium">{log.sleep} hrs</p>
                          </div>
                          <div className="bg-muted/50 p-2 rounded text-center">
                            <p className="text-xs text-muted-foreground">Water</p>
                            <p className="font-medium">{log.waterIntake} ml</p>
                          </div>
                        </div>
                        
                        {log.notes && (
                          <div className="mt-3 bg-background p-3 rounded-md text-sm">
                            <p className="text-xs text-muted-foreground mb-1">Notes:</p>
                            <p>{log.notes}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
}
