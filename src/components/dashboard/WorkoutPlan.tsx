
import { Calendar, Dumbbell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

interface WorkoutDay {
  day: string;
  exercises: Exercise[];
  isToday: boolean;
  isCompleted?: boolean;
}

interface WorkoutPlanProps {
  workout: WorkoutDay[];
  title?: string;
}

export const WorkoutPlan = ({ 
  workout,
  title = "This Week's Plan" 
}: WorkoutPlanProps) => {
  const { toast } = useToast();
  
  const handleStart = () => {
    toast({
      title: "Start Workout",
      description: "Workout tracking will be available soon!",
    });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 }
  };
  
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 h-[calc(100%-60px)] overflow-y-auto">
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {workout.map((day, index) => (
            <motion.div 
              key={day.day}
              variants={itemVariants}
              className={`p-3 rounded-md ${day.isToday ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/60'} ${day.isCompleted ? 'opacity-60' : ''}`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <p className="font-medium flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {day.day}
                    {day.isToday && (
                      <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </p>
                </div>
                {day.isToday && !day.isCompleted && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="h-7 text-xs border-primary/20 hover:bg-primary/20"
                    onClick={handleStart}
                  >
                    Start
                  </Button>
                )}
                {day.isCompleted && (
                  <span className="text-xs text-green-500 flex items-center">
                    Completed
                  </span>
                )}
              </div>
              
              <div className="space-y-1 text-sm">
                {day.exercises.map((exercise, i) => (
                  <motion.div 
                    key={`${day.day}-${exercise.name}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex justify-between items-center text-muted-foreground"
                  >
                    <span>{exercise.name}</span>
                    <span>{exercise.sets} × {exercise.reps}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};
