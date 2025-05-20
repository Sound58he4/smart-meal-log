
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  time: string;
  image?: string;
}

interface RecentFoodLogsProps {
  entries: FoodEntry[];
}

export const RecentFoodLogs = ({ entries }: RecentFoodLogsProps) => {
  const { toast } = useToast();
  
  const handleMoreEntries = () => {
    toast({
      title: "View all entries",
      description: "This feature will be available soon!",
    });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Recent Food Logs
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <motion.div 
          className="space-y-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {entries.map((entry) => (
            <motion.div 
              key={entry.id} 
              className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              <div className="h-10 w-10 rounded-md bg-muted/80 flex items-center justify-center overflow-hidden">
                {entry.image ? (
                  <img src={entry.image} alt={entry.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl">🍽️</span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{entry.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{entry.calories} kcal</span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                  <span>{entry.protein}g protein</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{entry.time}</span>
                <Button size="icon" variant="ghost" className="h-6 w-6">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4"
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
              onClick={handleMoreEntries}
            >
              View All Food Logs
            </Button>
          </motion.div>
        )}
        
        {entries.length === 0 && (
          <motion.div 
            className="flex flex-col items-center justify-center h-32 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground mb-2">No food logged today</p>
            <Button size="sm" onClick={() => toast({ title: "Add food", description: "Food logging will be available soon!" })}>
              Log Food
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
