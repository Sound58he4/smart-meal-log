
import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppLayout() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {!isMobile && (
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      )}

      {isMobile && (
        <>
          <main className="flex-1 p-4 pb-20">
            <Outlet />
          </main>
          <MobileNav />
        </>
      )}
    </div>
  );
}
