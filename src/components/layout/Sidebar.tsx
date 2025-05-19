
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Activity, Calendar, Settings, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/meals", label: "Meals", icon: Calendar },
  { path: "/progress", label: "Progress", icon: Activity },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-card p-4 flex flex-col h-screen">
      <div className="flex items-center gap-2 py-4 mb-6">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-fitness-primary to-fitness-secondary flex items-center justify-center">
          <span className="text-white font-bold">F</span>
        </div>
        <span className="text-lg font-bold">FitTrack AI</span>
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                isActive
                  ? "bg-gradient-to-r from-fitness-primary to-fitness-secondary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              )
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <Button className="gap-2 mt-6 bg-fitness-tertiary hover:bg-fitness-tertiary/90">
        <Plus size={16} />
        <span>Add Meal</span>
      </Button>
    </div>
  );
}
