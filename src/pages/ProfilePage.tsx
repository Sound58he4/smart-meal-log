
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFitness } from "@/context/FitnessContext";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { User, Target, Medal, Calendar } from "lucide-react";

export default function ProfilePage() {
  const { userProfile, setUserProfile } = useFitness();
  const { toast } = useToast();
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };
  
  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Goals updated",
      description: "Your nutrition goals have been updated successfully",
    });
  };
  
  if (!userProfile) return null;

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeInUpVariants}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold heading-gradient">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your personal information and nutrition goals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 overflow-hidden border-none shadow-xl shadow-primary/5">
          <CardHeader className="bg-gradient-to-b from-primary/10 to-transparent text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-4xl font-bold mb-2">
                {userProfile.name.charAt(0)}
              </div>
              <CardTitle className="text-xl mt-2">{userProfile.name}</CardTitle>
              <p className="text-muted-foreground text-sm">Member since 2023</p>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Medal size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Current streak</p>
                  <p className="text-xs text-muted-foreground">7 days in a row</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Calendar size={16} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total logs</p>
                  <p className="text-xs text-muted-foreground">124 days tracked</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Target size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Goals achieved</p>
                  <p className="text-xs text-muted-foreground">8 goals completed</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <User className="mr-2 h-4 w-4" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="goals" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                <Target className="mr-2 h-4 w-4" />
                Nutrition Goals
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card className="overflow-hidden border-none shadow-xl shadow-primary/5">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-2">
                  <CardTitle className="flex items-center">
                    <div className="w-2 h-6 bg-primary rounded-full mr-2"></div>
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input 
                          id="name" 
                          defaultValue={userProfile.name}
                          required
                          className="bg-muted/50 border-muted"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="age" className="text-sm font-medium">Age</label>
                        <Input 
                          id="age" 
                          type="number" 
                          defaultValue={userProfile.age}
                          min={13}
                          max={120}
                          required
                          className="bg-muted/50 border-muted"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="height" className="text-sm font-medium">Height (cm)</label>
                        <Input 
                          id="height" 
                          type="number" 
                          defaultValue={userProfile.height}
                          min={50}
                          max={300}
                          required
                          className="bg-muted/50 border-muted"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="weight" className="text-sm font-medium">Weight (kg)</label>
                        <Input 
                          id="weight" 
                          type="number" 
                          defaultValue={userProfile.weight}
                          min={20}
                          max={500}
                          step={0.1}
                          required
                          className="bg-muted/50 border-muted"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="activityLevel" className="text-sm font-medium">Activity Level</label>
                        <select 
                          id="activityLevel" 
                          defaultValue={userProfile.activityLevel}
                          className="w-full h-10 px-3 rounded-md border border-muted bg-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          required
                        >
                          <option value="sedentary">Sedentary (little or no exercise)</option>
                          <option value="light">Light (light exercise 1-3 days/week)</option>
                          <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                          <option value="active">Active (hard exercise 6-7 days/week)</option>
                          <option value="very active">Very Active (very hard exercise daily)</option>
                        </select>
                      </div>
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
                      >
                        Save Changes
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="goals">
              <Card className="overflow-hidden border-none shadow-xl shadow-secondary/5">
                <CardHeader className="bg-gradient-to-r from-secondary/10 to-transparent pb-2">
                  <CardTitle className="flex items-center">
                    <div className="w-2 h-6 bg-secondary rounded-full mr-2"></div>
                    Nutrition Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleSaveGoals} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="calories" className="text-sm font-medium">Daily Calories</label>
                        <Input 
                          id="calories" 
                          type="number" 
                          defaultValue={userProfile.goals.calories}
                          min={500}
                          max={10000}
                          required
                          className="bg-muted/50 border-muted"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="protein" className="text-sm font-medium">Protein (g)</label>
                        <Input 
                          id="protein" 
                          type="number" 
                          defaultValue={userProfile.goals.protein}
                          min={10}
                          max={500}
                          required
                          className="bg-muted/50 border-muted"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="carbs" className="text-sm font-medium">Carbs (g)</label>
                        <Input 
                          id="carbs" 
                          type="number" 
                          defaultValue={userProfile.goals.carbs}
                          min={10}
                          max={1000}
                          required
                          className="bg-muted/50 border-muted"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="fat" className="text-sm font-medium">Fat (g)</label>
                        <Input 
                          id="fat" 
                          type="number" 
                          defaultValue={userProfile.goals.fat}
                          min={10}
                          max={500}
                          required
                          className="bg-muted/50 border-muted"
                        />
                      </div>
                    </div>
                    
                    <motion.div 
                      className="bg-muted/50 p-4 rounded-md border border-muted"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="font-medium mb-2 text-sm">Recommended Macronutrient Splits</h3>
                      <div className="text-xs text-muted-foreground space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <p>Weight Loss: 30% protein, 35% carbs, 35% fat</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-secondary"></div>
                          <p>Balanced: 25% protein, 50% carbs, 25% fat</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                          <p>Athletic: 30% protein, 55% carbs, 15% fat</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-secondary to-secondary/80 hover:opacity-90"
                      >
                        Update Goals
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
}
