
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Activity, Calendar, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t flex justify-around items-center h-16 px-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center justify-center",
            isActive ? "text-fitness-primary" : "text-gray-500"
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
            isActive ? "text-fitness-primary" : "text-gray-500"
          )
        }
      >
        <Calendar size={20} />
        <span className="text-xs mt-1">Meals</span>
      </NavLink>

      <div className="-mt-8">
        <Button size="icon" className="h-14 w-14 rounded-full bg-fitness-tertiary hover:bg-fitness-tertiary/90">
          <Plus size={24} />
        </Button>
      </div>

      <NavLink
        to="/progress"
        className={({ isActive }) =>
          cn(
            "flex flex-col items-center justify-center",
            isActive ? "text-fitness-primary" : "text-gray-500"
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
            isActive ? "text-fitness-primary" : "text-gray-500"
          )
        }
      >
        <User size={20} />
        <span className="text-xs mt-1">Profile</span>
      </NavLink>
    </div>
  );
}
