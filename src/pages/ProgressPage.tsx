import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Activity, 
  ArrowDown, 
  ArrowUp, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  LineChart, 
  Ruler, 
  Scale, 
  Share2, 
  Target, 
  Tape, 
  TrendingDown,
  TrendingUp,
  Dumbbell,
  HeartPulse,
  Apple,
  Camera
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format, subDays, subMonths } from "date-fns";

export default function ProgressPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<string>("1m");
  
  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `${action} will be available soon!`,
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
  
  // Mock data for body measurements (most recent)
  const bodyMeasurements = {
    weight: {
      current: 73.5,
      change: -1.8,
      unit: "kg"
    },
    bodyFat: {
      current: 18.2,
      change: -0.7,
      unit: "%"
    },
    chest: {
      current: 95.2,
      change: -0.4,
      unit: "cm"
    },
    waist: {
      current: 82.3,
      change: -1.2,
      unit: "cm"
    },
    hips: {
      current: 94.8,
      change: -0.3,
      unit: "cm"
    },
    arms: {
      current: 35.1,
      change: 0.3,
      unit: "cm"
    },
    thighs: {
      current: 56.4,
      change: -0.6,
      unit: "cm"
    }
  };
  
  // Photos for the body transformation section
  const progressPhotos = [
    {
      id: "1",
      date: format(subMonths(new Date(), 2), "MMM d, yyyy"),
      weight: 75.3,
    },
    {
      id: "2", 
      date: format(subMonths(new Date(), 1), "MMM d, yyyy"),
      weight: 74.2,
    },
    {
      id: "3",
      date: format(new Date(), "MMM d, yyyy"),
      weight: 73.5,
    }
  ];
  
  // Mock data points for the weight chart (30 days)
  const generateWeightData = () => {
    const data = [];
    let weight = 75.3;
    for (let i = 30; i >= 0; i--) {
      // Random fluctuation between -0.3 and +0.2
      const fluctuation = Math.random() * 0.5 - 0.3;
      // Overall trend downward
      const trend = i > 5 ? -0.05 : 0; // Plateau in the last 5 days
      weight += fluctuation + trend;
      weight = Math.round(weight * 10) / 10; // Round to 1 decimal place
      
      data.push({
        date: format(subDays(new Date(), i), "MMM d"),
        value: weight
      });
    }
    return data;
  };
  
  const weightData = generateWeightData();
  
  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-2">
        <h1 className="text-3xl font-bold heading-gradient">Progress Tracking</h1>
        <p className="text-muted-foreground">Monitor your body changes and fitness improvements</p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="body">
          <TabsList className="w-full sm:w-auto mb-6">
            <TabsTrigger value="body" className="flex items-center gap-2">
              <Ruler className="h-4 w-4" /> Body
            </TabsTrigger>
            <TabsTrigger value="weight" className="flex items-center gap-2">
              <Scale className="h-4 w-4" /> Weight
            </TabsTrigger>
            <TabsTrigger value="workouts" className="flex items-center gap-2">
              <Activity className="h-4 w-4" /> Performance
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Camera className="h-4 w-4" /> Photos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="body" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm py-2 flex items-center gap-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  Last updated: {format(new Date(), "MMM d, yyyy")}
                </Badge>
                <Badge variant="outline" className="text-sm py-2">
                  Compared to 1 month ago
                </Badge>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => handleAction("Export data")}
                >
                  <Share2 className="h-4 w-4" />
                  Export
                </Button>
                <Button 
                  onClick={() => handleAction("Log new measurements")}
                >
                  Log Measurements
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{bodyMeasurements.weight.current}</p>
                        <p className="text-sm text-muted-foreground">{bodyMeasurements.weight.unit}</p>
                        
                        {bodyMeasurements.weight.change < 0 ? (
                          <div className="flex items-center text-green-500 text-sm">
                            <ArrowDown className="h-3 w-3 mr-0.5" />
                            {Math.abs(bodyMeasurements.weight.change)}
                          </div>
                        ) : bodyMeasurements.weight.change > 0 ? (
                          <div className="flex items-center text-red-500 text-sm">
                            <ArrowUp className="h-3 w-3 mr-0.5" />
                            {bodyMeasurements.weight.change}
                          </div>
                        ) : (
                          <div className="text-muted-foreground text-sm">0</div>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Scale className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Body Fat</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{bodyMeasurements.bodyFat.current}</p>
                        <p className="text-sm text-muted-foreground">{bodyMeasurements.bodyFat.unit}</p>
                        
                        {bodyMeasurements.bodyFat.change < 0 ? (
                          <div className="flex items-center text-green-500 text-sm">
                            <ArrowDown className="h-3 w-3 mr-0.5" />
                            {Math.abs(bodyMeasurements.bodyFat.change)}
                          </div>
                        ) : bodyMeasurements.bodyFat.change > 0 ? (
                          <div className="flex items-center text-red-500 text-sm">
                            <ArrowUp className="h-3 w-3 mr-0.5" />
                            {bodyMeasurements.bodyFat.change}
                          </div>
                        ) : (
                          <div className="text-muted-foreground text-sm">0</div>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Tape className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Waist</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{bodyMeasurements.waist.current}</p>
                        <p className="text-sm text-muted-foreground">{bodyMeasurements.waist.unit}</p>
                        
                        {bodyMeasurements.waist.change < 0 ? (
                          <div className="flex items-center text-green-500 text-sm">
                            <ArrowDown className="h-3 w-3 mr-0.5" />
                            {Math.abs(bodyMeasurements.waist.change)}
                          </div>
                        ) : bodyMeasurements.waist.change > 0 ? (
                          <div className="flex items-center text-red-500 text-sm">
                            <ArrowUp className="h-3 w-3 mr-0.5" />
                            {bodyMeasurements.waist.change}
                          </div>
                        ) : (
                          <div className="text-muted-foreground text-sm">0</div>
                        )}
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Ruler className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Target Weight</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">70.0</p>
                        <p className="text-sm text-muted-foreground">kg</p>
                        <div className="text-amber-500 text-sm">3.5 to go</div>
                      </div>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <Target className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Body Measurements</CardTitle>
                  <CardDescription>Your latest measurements and changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(bodyMeasurements).map(([key, data]) => (
                      key !== "weight" && key !== "bodyFat" && (
                        <div key={key} className="flex justify-between items-center border-b pb-2 last:border-0">
                          <div>
                            <p className="capitalize">{key}</p>
                            <div className="flex items-baseline gap-1">
                              <span className="text-lg font-medium">{data.current}</span>
                              <span className="text-xs text-muted-foreground">{data.unit}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            {data.change < 0 ? (
                              <div className="flex items-center text-green-500">
                                <TrendingDown className="h-4 w-4 mr-1" />
                                {Math.abs(data.change)} {data.unit}
                              </div>
                            ) : data.change > 0 ? (
                              <div className="flex items-center text-blue-500">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                {data.change} {data.unit}
                              </div>
                            ) : (
                              <div className="text-muted-foreground">No change</div>
                            )}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4" onClick={() => handleAction("View measurement history")}>
                    View Full History
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Measurement History</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px] flex items-center justify-center bg-muted/50">
                  <p className="text-muted-foreground">Measurement history chart will appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="weight" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <span>{selectedPeriod === "1m" ? "1 Month" : selectedPeriod === "3m" ? "3 Months" : selectedPeriod === "6m" ? "6 Months" : "1 Year"}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedPeriod("1m")}>1 Month</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedPeriod("3m")}>3 Months</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedPeriod("6m")}>6 Months</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedPeriod("1y")}>1 Year</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  onClick={() => handleAction("Log weight")}
                >
                  Log Weight
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5" /> Weight Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px] flex items-center justify-center bg-muted/50">
                    <p className="text-muted-foreground">Weight trend chart will appear here</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="h-auto">
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Current Weight</p>
                    <p className="text-2xl font-bold">{bodyMeasurements.weight.current} {bodyMeasurements.weight.unit}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Starting Weight</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-lg font-medium">75.3 {bodyMeasurements.weight.unit}</p>
                      <p className="text-xs text-muted-foreground">(30 days ago)</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Change</p>
                    <p className="text-lg font-medium text-green-500">-1.8 {bodyMeasurements.weight.unit} (-2.4%)</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Average Weekly Change</p>
                    <p className="text-lg font-medium text-green-500">-0.46 {bodyMeasurements.weight.unit}/week</p>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" className="w-full" onClick={() => handleAction("Set weight target")}>
                      Set Target Weight
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Lowest Weight</p>
                      <p className="text-2xl font-bold">73.2 kg</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <TrendingDown className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Highest Weight</p>
                      <p className="text-2xl font-bold">75.5 kg</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Weigh-ins</p>
                      <p className="text-2xl font-bold">28</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <CalendarIcon className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Target Date</p>
                      <p className="text-2xl font-bold">Jul 1</p>
                      <p className="text-xs text-muted-foreground">42 days remaining</p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <Target className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="workouts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-base">Calendar</CardTitle>
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
            
              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Track your workout performance over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Bench Press</p>
                        <Dumbbell className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-2xl font-bold mt-1">85 kg</p>
                      <div className="flex items-center mt-auto text-xs text-green-500">
                        <ArrowUp className="h-3 w-3 mr-0.5" />
                        5 kg in 30 days
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Squat</p>
                        <Dumbbell className="h-4 w-4 text-blue-500" />
                      </div>
                      <p className="text-2xl font-bold mt-1">120 kg</p>
                      <div className="flex items-center mt-auto text-xs text-green-500">
                        <ArrowUp className="h-3 w-3 mr-0.5" />
                        10 kg in 30 days
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg flex flex-col">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">5K Run</p>
                        <HeartPulse className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="text-2xl font-bold mt-1">24:32</p>
                      <div className="flex items-center mt-auto text-xs text-green-500">
                        <ArrowDown className="h-3 w-3 mr-0.5" />
                        1:18 in 30 days
                      </div>
                    </div>
                  </div>
                  
                  <Card className="h-[250px] flex items-center justify-center bg-muted/50">
                    <p className="text-muted-foreground">Performance tracking chart will appear here</p>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="photos" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold">Progress Photos</h2>
              <Button 
                onClick={() => handleAction("Add new photos")}
              >
                <Camera className="h-4 w-4 mr-2" />
                Add New Photos
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {progressPhotos.map((photo, index) => (
                <motion.div 
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden">
                    <div className="h-[300px] bg-muted flex items-center justify-center">
                      <Camera className="h-16 w-16 text-muted-foreground/30" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{photo.date}</p>
                          <p className="text-sm text-muted-foreground">{photo.weight} kg</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleAction("View photo")}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Photo Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center text-xs">1</div>
                    <span>Take photos in the same location and lighting each time</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center text-xs">2</div>
                    <span>Wear the same or similar clothing for accurate comparisons</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center text-xs">3</div>
                    <span>Take front, side, and back photos for complete documentation</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="rounded-full h-5 w-5 bg-primary/10 text-primary flex items-center justify-center text-xs">4</div>
                    <span>Aim to take new photos every 2-4 weeks for noticeable changes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
