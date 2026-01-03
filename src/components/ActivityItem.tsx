import { motion } from "framer-motion";
import { Package, Coins } from "lucide-react";

interface ActivityItemProps {
  type: string;
  weight: string;
  tokens: number;
  time: string;
}

const ActivityItem = ({ type, weight, tokens, time }: ActivityItemProps) => {
  const typeColors: Record<string, string> = {
    Plastic: "bg-blue-500/10 text-blue-600 border-blue-200",
    Glass: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    Paper: "bg-amber-500/10 text-amber-600 border-amber-200",
    Metal: "bg-slate-500/10 text-slate-600 border-slate-200",
  };

  const color = typeColors[type] || typeColors.Plastic;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card hover:shadow-card transition-all"
    >
      <div className={`p-2 rounded-lg ${color} border`}>
        <Package className="w-5 h-5" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{type} Recycling</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">DEMO</span>
        </div>
        <p className="text-sm text-muted-foreground">{weight}</p>
      </div>

      <div className="text-right">
        <div className="flex items-center gap-1 text-forest font-semibold">
          <Coins className="w-4 h-4" />
          <span>+{tokens} URB</span>
        </div>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </motion.div>
  );
};

export default ActivityItem;
