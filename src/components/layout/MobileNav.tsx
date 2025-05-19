
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Activity, Calendar, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

export function MobileNav() {
  const { toast } = useToast();
  
  const navVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  const handleQuickAdd = () => {
    toast({
      title: "Quick add feature",
      description: "This feature will be available soon!",
    });
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-t flex justify-around items-center h-16 px-4"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center justify-center",
            isActive ? "text-primary" : "text-muted-foreground"
          )
        }
      >
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </NavLink>

      <NavLink
        to="/meals"
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center justify-center",
            isActive ? "text-primary" : "text-muted-foreground"
          )
        }
      >
        <Calendar size={20} />
        <span className="text-xs mt-1">Meals</span>
      </NavLink>

      <Sheet>
        <SheetTrigger asChild>
          <motion.div 
            className="relative -mt-8"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <Button size="icon" className="h-14 w-14 rounded-full bg-gradient-to-r from-fitness-primary to-fitness-tertiary hover:opacity-90 shadow-lg">
              <Plus size={24} />
            </Button>
          </motion.div>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[40vh]">
          <div className="space-y-4 pt-4">
            <h2 className="text-xl font-bold">Quick Add</h2>
            <p className="text-muted-foreground">Choose what you want to log:</p>
            
            <div className="grid gap-3 pt-4">
              <Button onClick={handleQuickAdd} variant="outline" className="justify-start">
                <Calendar size={18} className="mr-2" />
                Log Meal
              </Button>
              
              <Button onClick={handleQuickAdd} variant="outline" className="justify-start">
                <Activity size={18} className="mr-2" />
                Log Workout
              </Button>
              
              <Button onClick={handleQuickAdd} variant="outline" className="justify-start">
                <User size={18} className="mr-2" />
                Update Metrics
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <NavLink
        to="/progress"
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center justify-center",
            isActive ? "text-primary" : "text-muted-foreground"
          )
        }
      >
        <Activity size={20} />
        <span className="text-xs mt-1">Progress</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center justify-center",
            isActive ? "text-primary" : "text-muted-foreground"
          )
        }
      >
        <User size={20} />
        <span className="text-xs mt-1">Profile</span>
      </NavLink>
    </motion.div>
  );
}
