import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

interface TransactionProps {
  hash: string;
  action: string;
  time: string;
  status?: "pending" | "confirmed";
}

const BlockchainTransaction = ({ hash, action, time, status = "confirmed" }: TransactionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
    >
      <div className={`w-2 h-2 rounded-full ${status === "confirmed" ? "bg-forest" : "bg-amber-500"} animate-pulse-glow`} />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-mono text-tech-blue">{hash}</span>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground truncate">{action}</p>
      </div>

      <div className="text-right">
        <div className="flex items-center gap-1 text-xs text-forest">
          <CheckCircle className="w-3 h-3" />
          <span>{status === "confirmed" ? "Confirmed" : "Pending"}</span>
        </div>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </motion.div>
  );
};

export default BlockchainTransaction;
