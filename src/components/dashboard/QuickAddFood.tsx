
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFitness } from "@/context/FitnessContext";
import { Camera, Search } from "lucide-react";
import { FoodItem } from "@/types";
import { useToast } from "@/components/ui/use-toast";

export function QuickAddFood() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mealType, setMealType] = useState<"breakfast" | "lunch" | "dinner" | "snack">("snack");
  const { searchFoods, addMealEntry, aiAnalyzeImage } = useFitness();
  const { toast } = useToast();

  const handleSearch = async () => {
    if (searchQuery.trim().length === 0) return;
    
    setIsSearching(true);
    try {
      const results = await searchFoods(searchQuery);
      setSearchResults(results);
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Failed to search for foods",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setSearchResults([]);
  };

  const handleAddMeal = () => {
    if (!selectedFood) return;
    
    addMealEntry(selectedFood, quantity, mealType);
    
    // Reset form
    setSelectedFood(null);
    setQuantity(1);
    setSearchQuery("");
  };

  const handleCameraClick = () => {
    // In a real app, this would open the camera
    toast({
      title: "Camera Feature",
      description: "The camera feature would open here to take a photo of your food.",
    });
    
    // Simulate AI food recognition after a delay
    setTimeout(async () => {
      const results = await aiAnalyzeImage("");
      if (results.length > 0) {
        setSelectedFood(results[0]);
        toast({
          title: "Food Recognized",
          description: `AI detected: ${results.map(r => r.name).join(", ")}`,
        });
      }
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Add Food</CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedFood ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Search for a food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  <Search size={18} />
                </Button>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={handleCameraClick}
              >
                <Camera size={18} />
              </Button>
            </div>

            {isSearching && (
              <div className="flex justify-center py-4">
                <div className="animate-pulse-light text-sm">Searching...</div>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="border rounded-md overflow-hidden">
                {searchResults.map((food) => (
                  <div
                    key={food.id}
                    className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleFoodSelect(food)}
                  >
                    {food.image ? (
                      <img
                        src={food.image}
                        alt={food.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-muted rounded-md" />
                    )}
                    <div>
                      <p className="font-medium">{food.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {food.nutrition.calories} kcal per {food.servingSize}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {selectedFood.image ? (
                <img
                  src={selectedFood.image}
                  alt={selectedFood.name}
                  className="h-16 w-16 rounded-md object-cover"
                />
              ) : (
                <div className="h-16 w-16 bg-muted rounded-md" />
              )}
              <div>
                <p className="font-medium">{selectedFood.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedFood.nutrition.calories} kcal per {selectedFood.servingSize}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Servings
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min={0.5}
                  step={0.5}
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="mealType" className="text-sm font-medium">
                  Meal Type
                </label>
                <select
                  id="mealType"
                  className="w-full h-10 px-3 rounded-md border border-input bg-transparent"
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value as any)}
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setSelectedFood(null)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-fitness-primary hover:bg-fitness-primary/90"
                onClick={handleAddMeal}
              >
                Add to Log
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
