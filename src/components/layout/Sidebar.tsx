
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Activity, Calendar, Settings, User, Plus, BadgeCheck, Dumbbell, BookOpen, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/meals", label: "Nutrition", icon: Calendar },
  { path: "/workouts", label: "Workouts", icon: Dumbbell },
  { path: "/progress", label: "Progress", icon: Activity },
  { path: "/goals", label: "Goals", icon: Target },
  { path: "/log", label: "Daily Log", icon: BookOpen },
  { path: "/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const { toast } = useToast();
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };
  
  const handleQuickAdd = () => {
    toast({
      title: "Quick add feature",
      description: "This feature will be available soon!",
    });
  };

  return (
    <div className="w-64 border-r bg-card/50 backdrop-blur-sm p-4 flex flex-col h-screen">
      <motion.div 
        className="flex items-center gap-3 py-4 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-fitness-primary via-fitness-tertiary to-fitness-secondary flex items-center justify-center">
          <span className="text-white font-bold text-xl">F</span>
        </div>
        <span className="text-xl font-bold tracking-tight">FitPulse</span>
      </motion.div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item, i) => (
          <motion.div
            key={item.path}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-white font-medium shadow-md shadow-primary/20"
                    : "text-foreground hover:bg-muted"
                )
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button className="w-full gap-2 bg-gradient-to-r from-fitness-primary to-fitness-tertiary hover:opacity-90">
              <Plus size={16} />
              <span>Quick Add</span>
            </Button>
          </motion.div>
        </SheetTrigger>
        <SheetContent>
          <div className="space-y-4 pt-8">
            <h2 className="text-xl font-bold">Quick Add</h2>
            <p className="text-muted-foreground">Choose what you want to log:</p>
            
            <div className="grid gap-4 pt-4">
              <Button onClick={handleQuickAdd} variant="outline" className="justify-start h-12 text-left">
                <Calendar size={18} className="mr-2" />
                <div>
                  <div className="font-medium">Log Meal</div>
                  <div className="text-xs text-muted-foreground">Track food & calories</div>
                </div>
              </Button>
              
              <Button onClick={handleQuickAdd} variant="outline" className="justify-start h-12 text-left">
                <Dumbbell size={18} className="mr-2" />
                <div>
                  <div className="font-medium">Log Workout</div>
                  <div className="text-xs text-muted-foreground">Track exercise & sets</div>
                </div>
              </Button>
              
              <Button onClick={handleQuickAdd} variant="outline" className="justify-start h-12 text-left">
                <BookOpen size={18} className="mr-2" />
                <div>
                  <div className="font-medium">Daily Log</div>
                  <div className="text-xs text-muted-foreground">Track metrics & notes</div>
                </div>
              </Button>
              
              <Button onClick={handleQuickAdd} variant="outline" className="justify-start h-12 text-left">
                <Target size={18} className="mr-2" />
                <div>
                  <div className="font-medium">Set Goal</div>
                  <div className="text-xs text-muted-foreground">Create new fitness goal</div>
                </div>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
