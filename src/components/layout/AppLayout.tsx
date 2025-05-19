
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { motion } from "framer-motion";

export function AppLayout() {
  const isMobile = useIsMobile();

  // Animation variants
  const mainContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {!isMobile && (
        <div className="flex flex-1">
          <Sidebar />
          <motion.main 
            className="flex-1 p-4 md:p-6"
            initial="hidden"
            animate="visible"
            variants={mainContentVariants}
          >
            <div className="flex justify-end mb-4">
              <ThemeSwitcher />
            </div>
            <Outlet />
          </motion.main>
        </div>
      )}

      {isMobile && (
        <>
          <div className="flex justify-end p-4">
            <ThemeSwitcher />
          </div>
          <motion.main 
            className="flex-1 p-4 pb-20"
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
