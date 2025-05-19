
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FitnessProvider } from "./context/FitnessContext";
import { AppLayout } from "./components/layout/AppLayout";
import { ThemeProvider } from "next-themes";
import Dashboard from "./pages/Dashboard";
import MealsPage from "./pages/MealsPage";
import ProgressPage from "./pages/ProgressPage";
import ProfilePage from "./pages/ProfilePage";
import WorkoutsPage from "./pages/WorkoutsPage";
import GoalsPage from "./pages/GoalsPage";
import LogPage from "./pages/LogPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <FitnessProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="meals" element={<MealsPage />} />
                <Route path="progress" element={<ProgressPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="workouts" element={<WorkoutsPage />} />
                <Route path="goals" element={<GoalsPage />} />
                <Route path="log" element={<LogPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FitnessProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
