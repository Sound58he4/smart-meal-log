
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFitness } from "@/context/FitnessContext";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and goals</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="goals">Nutrition Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input 
                      id="name" 
                      defaultValue={userProfile.name}
                      required
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
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="activityLevel" className="text-sm font-medium">Activity Level</label>
                    <select 
                      id="activityLevel" 
                      defaultValue={userProfile.activityLevel}
                      className="w-full h-10 px-3 rounded-md border border-input bg-transparent"
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
                
                <Button type="submit" className="bg-fitness-primary hover:bg-fitness-primary/90">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Goals</CardTitle>
            </CardHeader>
            <CardContent>
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
                    />
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Recommended Macronutrient Splits</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Weight Loss: 30% protein, 35% carbs, 35% fat</p>
                    <p>• Balanced: 25% protein, 50% carbs, 25% fat</p>
                    <p>• Athletic: 30% protein, 55% carbs, 15% fat</p>
                  </div>
                </div>
                
                <Button type="submit" className="bg-fitness-primary hover:bg-fitness-primary/90">
                  Update Goals
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
