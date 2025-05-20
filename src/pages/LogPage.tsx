
import React, { useState } from "react";
import { format, subDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Check, 
  ChevronDown, 
  Heart, 
  Scale, 
  Smile, 
  Water, 
  Moon, 
  Plus, 
  Search,
  CalendarDays,
  BarChart
} from "lucide-react";

export default function LogPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [mood, setMood] = useState<string>("good");
  const [weight, setWeight] = useState<string>("73.5");
  const [sleep, setSleep] = useState<string>("7.5");
  const [water, setWater] = useState<string>("2000");
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Daily log saved",
      description: `Your log for ${format(date, "MMMM d, yyyy")} has been saved!`,
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

  const moodOptions = [
    { value: "excellent", label: "Excellent", icon: "😄" },
    { value: "good", label: "Good", icon: "🙂" },
    { value: "neutral", label: "Neutral", icon: "😐" },
    { value: "poor", label: "Poor", icon: "🙁" },
    { value: "terrible", label: "Terrible", icon: "😣" },
  ];

  // Mock previous logs
  const previousLogs = [
    { date: subDays(new Date(), 1), weight: 73.7, sleep: 7, water: 1800, mood: "good" },
    { date: subDays(new Date(), 2), weight: 73.8, sleep: 8, water: 2200, mood: "excellent" },
    { date: subDays(new Date(), 3), weight: 74.0, sleep: 6.5, water: 1900, mood: "neutral" },
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-2">
        <h1 className="text-3xl font-bold heading-gradient">Daily Log</h1>
        <p className="text-muted-foreground">Track your daily health metrics</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="new-log">
          <TabsList className="w-full sm:w-auto mb-6">
            <TabsTrigger value="new-log" className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Log
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" /> History
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" /> Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new-log" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Log Entry for {format(date, "MMMM d, yyyy")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <div className="relative">
                            <Scale className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="weight" 
                              type="number" 
                              step="0.1" 
                              value={weight} 
                              onChange={e => setWeight(e.target.value)} 
                              className="pl-10" 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="sleep">Sleep (hours)</Label>
                          <div className="relative">
                            <Moon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="sleep" 
                              type="number" 
                              step="0.5" 
                              value={sleep} 
                              onChange={e => setSleep(e.target.value)} 
                              className="pl-10" 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="water">Water Intake (ml)</Label>
                          <div className="relative">
                            <Water className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="water" 
                              type="number" 
                              step="50" 
                              value={water} 
                              onChange={e => setWater(e.target.value)} 
                              className="pl-10" 
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Mood</Label>
                          <div className="grid grid-cols-5 gap-2">
                            {moodOptions.map(option => (
                              <Button 
                                key={option.value}
                                type="button"
                                variant={mood === option.value ? "default" : "outline"}
                                className={`h-auto py-2 flex flex-col items-center gap-1 ${mood === option.value ? '' : 'border-muted'}`}
                                onClick={() => setMood(option.value)}
                              >
                                <span className="text-xl">{option.icon}</span>
                                <span className="text-xs">{option.label}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="notes">Notes</Label>
                          <textarea 
                            id="notes" 
                            value={notes} 
                            onChange={e => setNotes(e.target.value)} 
                            className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            placeholder="How are you feeling today? Any notable activities or events?"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="w-full sm:w-auto">
                        <Check className="mr-2 h-4 w-4" />
                        Save Log
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Select Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      className="rounded-md"
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      Health Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <ul className="space-y-2">
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Track your weight at the same time each day for consistent measurements.</span>
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Aim for 7-9 hours of quality sleep each night.</span>
                      </li>
                      <li className="flex gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Stay hydrated with at least 2 liters of water daily.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search logs" className="pl-10" />
              </div>
              <Button variant="outline" className="md:w-auto flex items-center gap-2">
                Filter <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {previousLogs.map((log, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CalendarDays className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{format(log.date, "MMM d")}</p>
                            <p className="text-xs text-muted-foreground">{format(log.date, "EEEE")}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Scale className="h-4 w-4 text-muted-foreground" />
                          <span>{log.weight} kg</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4 text-muted-foreground" />
                          <span>{log.sleep} hours</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Water className="h-4 w-4 text-muted-foreground" />
                          <span>{log.water} ml</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Smile className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">{log.mood}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="h-[300px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Weight trends will appear here</p>
              </Card>
              <Card className="h-[300px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Sleep insights will appear here</p>
              </Card>
              <Card className="h-[300px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Water intake trends will appear here</p>
              </Card>
              <Card className="h-[300px] flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Mood correlations will appear here</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
