import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: "default" | "forest" | "tech";
}

const StatCard = ({ title, value, subtitle, icon: Icon, trend, variant = "default" }: StatCardProps) => {
  const iconBgClass = {
    default: "bg-muted",
    forest: "bg-gradient-forest shadow-glow-forest",
    tech: "bg-gradient-tech shadow-glow-tech",
  };

  const iconColorClass = {
    default: "text-muted-foreground",
    forest: "text-white",
    tech: "text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-card rounded-xl p-6 shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <p className={`text-sm font-medium ${trend.positive ? "text-forest" : "text-destructive"}`}>
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}% from last week
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBgClass[variant]}`}>
          <Icon className={`w-6 h-6 ${iconColorClass[variant]}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
