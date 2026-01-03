import { motion } from "framer-motion";
import { Recycle, Coins, Leaf, Trophy, QrCode, Gift, History, UserPlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import ActivityItem from "@/components/ActivityItem";
import { Button } from "@/components/ui/button";

const activities = [
  { type: "Plastic", weight: "2.5 kg", tokens: 25, time: "2 hours ago" },
  { type: "Glass", weight: "3.1 kg", tokens: 31, time: "Yesterday" },
  { type: "Paper", weight: "1.8 kg", tokens: 18, time: "2 days ago" },
  { type: "Metal", weight: "0.5 kg", tokens: 15, time: "3 days ago" },
];

const quickActions = [
  { icon: QrCode, label: "Generate QR Code", color: "forest" },
  { icon: Gift, label: "Redeem Tokens", color: "tech" },
  { icon: History, label: "View History", color: "forest" },
  { icon: UserPlus, label: "Invite Friends", color: "tech" },
];

const CitizenDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground">Welcome back,</span>
              <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-medium">Demo Mode</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Citizen Dashboard
            </h1>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Recycled"
              value="0 kg"
              subtitle="Simulated Data"
              icon={Recycle}
              variant="forest"
            />
            <StatCard
              title="UrbanCoins Earned"
              value="0 URB"
              subtitle="Token Balance"
              icon={Coins}
              variant="tech"
            />
            <StatCard
              title="Carbon Offset"
              value="0 kg CO2"
              subtitle="Environmental Impact"
              icon={Leaf}
              variant="forest"
            />
            <StatCard
              title="Global Rank"
              value="#1"
              subtitle="Demo Mode"
              icon={Trophy}
              variant="tech"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
                <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.label}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                        action.color === "forest"
                          ? "bg-forest/10 hover:bg-forest/20 text-forest"
                          : "bg-tech-blue/10 hover:bg-tech-blue/20 text-tech-blue"
                      }`}
                    >
                      <action.icon className="w-6 h-6" />
                      <span className="text-xs font-medium text-center">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Impact Summary */}
              <div className="bg-gradient-hero rounded-xl p-6 mt-4 text-white shadow-glow-forest">
                <h3 className="font-semibold mb-2">Your Environmental Impact</h3>
                <p className="text-sm text-white/80 mb-4">
                  Every kilogram of recycling helps reduce landfill waste and earns you rewards.
                </p>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-2xl font-bold">89 URB</div>
                    <div className="text-xs text-white/70">Demo tokens</div>
                  </div>
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <ActivityItem key={index} {...activity} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;
