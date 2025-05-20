
import { LampWallUp, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface FitnessTipProps {
  tip: string;
  title?: string;
}

export const FitnessTip = ({ tip, title = "Today's Fitness Tip" }: FitnessTipProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="overflow-hidden border border-primary/10">
        <CardHeader className="bg-primary/5 pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Lightbulb className="h-4 w-4 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 text-sm">
          <p className="text-muted-foreground">{tip}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
