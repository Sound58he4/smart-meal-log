
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";
import { motion } from "framer-motion";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface WaterIntakeTipProps {
  current: number; // in ml
  target: number; // in ml
}

export const WaterIntakeTip = ({ current, target }: WaterIntakeTipProps) => {
  const { toast } = useToast();
  const percentComplete = Math.min(100, (current / target) * 100);
  
  const handleAddWater = () => {
    toast({
      title: "Water logged",
      description: "250ml of water added to your daily intake!",
    });
  };
  
  const waveVariants = {
    animate: {
      y: [0, -3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-blue-500/5 pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Droplets className="h-4 w-4 text-blue-500" />
            Water Intake
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 flex flex-col items-center gap-4">
          <div className="relative">
            <ProgressRing 
              progress={percentComplete} 
              size={100} 
              strokeWidth={8}
              color="stroke-blue-500"
              bgColor="stroke-blue-500/10"
            >
              <motion.div 
                className="relative w-12 h-12 flex items-center justify-center"
                variants={waveVariants}
                animate="animate"
              >
                <Droplets className="h-10 w-10 text-blue-500" />
              </motion.div>
            </ProgressRing>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold">{current}ml</p>
            <p className="text-sm text-muted-foreground">of {target}ml goal</p>
          </div>
          
          <Button 
            onClick={handleAddWater}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            <Droplets className="mr-2 h-4 w-4" /> Add Glass (250ml)
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
