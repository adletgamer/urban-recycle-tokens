import { motion } from "framer-motion";
import { Building2, BarChart3, MapPin, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const materialData = [
  { name: "Plastic", value: 45, color: "hsl(210, 70%, 50%)" },
  { name: "Glass", value: 25, color: "hsl(146, 50%, 40%)" },
  { name: "Paper", value: 20, color: "hsl(40, 80%, 55%)" },
  { name: "Metal", value: 10, color: "hsl(218, 17%, 40%)" },
];

const neighborhoodData = [
  { name: "District A", activity: 85, trend: "+12%" },
  { name: "District B", activity: 62, trend: "+5%" },
  { name: "District C", activity: 45, trend: "+18%" },
  { name: "District D", activity: 38, trend: "+8%" },
];

const sdgGoals = [
  { id: 11, name: "Sustainable Cities", status: "verified", description: "Making cities inclusive, safe, resilient and sustainable" },
  { id: 12, name: "Responsible Consumption", status: "verified", description: "Ensuring sustainable consumption and production patterns" },
  { id: 8, name: "Decent Work", status: "verified", description: "Promoting inclusive and sustainable economic growth" },
];

const MunicipalDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-tech-blue" />
              <span className="px-2 py-0.5 rounded-full bg-tech-blue/10 text-tech-blue text-xs font-medium">Simulation Mode</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              City Analytics
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time municipal recycling data and SDG compliance tracking
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Recycled"
              value="1,234 tons"
              subtitle="This month (simulated)"
              icon={BarChart3}
              trend={{ value: 15, positive: true }}
              variant="forest"
            />
            <StatCard
              title="Active Citizens"
              value="12,500"
              subtitle="Registered users"
              icon={Building2}
              trend={{ value: 8, positive: true }}
              variant="tech"
            />
            <StatCard
              title="Collection Points"
              value="156"
              subtitle="IoT enabled"
              icon={MapPin}
              variant="forest"
            />
            <StatCard
              title="SDG Compliance"
              value="3/3"
              subtitle="Goals tracked"
              icon={Target}
              variant="tech"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Material Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border/50"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">Material Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={materialData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {materialData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: 'var(--shadow-card)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {materialData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-semibold text-foreground ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Neighborhood Participation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border/50"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">Neighborhood Participation</h2>
              <div className="space-y-4">
                {neighborhoodData.map((district, index) => (
                  <motion.div
                    key={district.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{district.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-forest font-medium">{district.trend}</span>
                        <span className="text-sm text-muted-foreground">{district.activity}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${district.activity}%` }}
                        transition={{ delay: 0.3 + 0.1 * index, duration: 0.8 }}
                        className="h-full bg-gradient-hero rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Demo Data:</span> Real implementation would connect to IoT sensors and blockchain events.
                </p>
              </div>
            </motion.div>

            {/* SDG Reporting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border/50"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">SDG Reporting Ready</h2>
              <div className="space-y-4">
                {sdgGoals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="p-4 rounded-lg border border-border/50 hover:border-forest/50 hover:bg-accent/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-forest flex items-center justify-center text-white font-bold shadow-glow-forest">
                        {goal.id}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{goal.name}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-forest/10 text-forest font-medium">
                            ✓ Verified
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm text-muted-foreground text-center">
                  Blockchain-verified data ready for UN SDG reporting
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MunicipalDashboard;
