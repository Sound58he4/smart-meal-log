
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { motion } from "framer-motion";
import { useFitness } from "@/context/FitnessContext";

export function AppLayout() {
  const isMobile = useIsMobile();
  const { userProfile } = useFitness();

  // Animation variants
  const mainContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-background/95 transition-colors duration-300">
      {!isMobile && (
        <div className="flex flex-1">
          <Sidebar />
          <motion.main 
            className="flex-1 p-6 md:p-8 overflow-y-auto max-h-screen"
            initial="hidden"
            animate="visible"
            variants={mainContentVariants}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-bold text-lg">
                  {userProfile ? `Welcome, ${userProfile.name.split(' ')[0]}` : 'Welcome'}
                </h2>
                <p className="text-muted-foreground text-sm">Track your health & fitness journey</p>
              </div>
              <ThemeSwitcher />
            </div>
            <Outlet />
          </motion.main>
        </div>
      )}

      {isMobile && (
        <>
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-fitness-primary to-fitness-tertiary flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="font-bold">FitPulse</span>
            </div>
            <ThemeSwitcher />
          </div>
          <motion.main 
            className="flex-1 p-4 pb-20 overflow-y-auto"
            initial="hidden"
            animate="visible"
            variants={mainContentVariants}
          >
            <Outlet />
          </motion.main>
          <MobileNav />
        </>
      )}
    </div>
  );
}
