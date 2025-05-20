
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Plus, Apple, Dumbbell, BarChart3, Water, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const QuickActions = () => {
  const { toast } = useToast();
  
  const handleAction = (action: string) => {
    toast({
      title: `${action} action`,
      description: `${action} will be available soon!`,
    });
  };
  
  const actions = [
    { icon: Apple, label: "Log Food", color: "bg-green-500/10 text-green-500" },
    { icon: Dumbbell, label: "Log Workout", color: "bg-blue-500/10 text-blue-500" },
    { icon: Water, label: "Log Water", color: "bg-cyan-500/10 text-cyan-500" },
    { icon: BarChart3, label: "View Reports", color: "bg-purple-500/10 text-purple-500" },
    { icon: Clock, label: "Set Reminder", color: "bg-amber-500/10 text-amber-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <motion.div 
          className="flex flex-wrap gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {actions.map((action) => (
            <motion.div 
              key={action.label} 
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="flex flex-col h-auto gap-2 p-3 border border-transparent hover:border-primary/20"
                onClick={() => handleAction(action.label)}
              >
                <div className={`${action.color} h-10 w-10 rounded-full flex items-center justify-center`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-xs">{action.label}</span>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};
