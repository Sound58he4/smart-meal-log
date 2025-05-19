
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Activity, Calendar, Settings, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/meals", label: "Meals", icon: Calendar },
  { path: "/progress", label: "Progress", icon: Activity },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
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

  return (
    <div className="w-64 border-r bg-card p-4 flex flex-col h-screen">
      <motion.div 
        className="flex items-center gap-2 py-4 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-fitness-primary to-fitness-secondary flex items-center justify-center">
          <span className="text-white font-bold">F</span>
        </div>
        <span className="text-lg font-bold">FitTrack AI</span>
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
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  isActive
                    ? "bg-gradient-to-r from-fitness-primary to-fitness-secondary text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button className="gap-2 mt-6 bg-fitness-tertiary hover:bg-fitness-tertiary/90 w-full">
          <Plus size={16} />
          <span>Add Meal</span>
        </Button>
      </motion.div>
    </div>
  );
}
