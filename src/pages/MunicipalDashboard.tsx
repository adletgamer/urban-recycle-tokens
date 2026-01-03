import { motion } from "framer-motion";
import { Building2, BarChart3, MapPin, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const materialData = [
  { name: "Plastic", value: 52, color: "hsl(210, 70%, 50%)", details: "PET (35%), HDPE (25%), Film (20%), Others (20%)" },
  { name: "Glass", value: 18, color: "hsl(146, 50%, 40%)", details: "Clear (60%), Green/Brown (40%)" },
  { name: "Paper", value: 22, color: "hsl(40, 80%, 55%)", details: "Cardboard (45%), Newspaper (30%), Mixed (25%)" },
  { name: "Metals", value: 8, color: "hsl(218, 17%, 40%)", details: "Aluminum Cans (70%), Tin Containers (30%)" },
];

const districtData = [
  {
    name: "Miraflores",
    badge: "Leader in Participation",
    activeCitizens: 128,
    kgConverted: "2,850",
    participationRate: "8.2%",
    extra: "3 active clean points"
  },
  {
    name: "San Isidro",
    badge: "Rapid Growth",
    activeCitizens: 87,
    kgConverted: "1,920",
    participationRate: "5.1%",
    extra: "5 corporate alliances"
  },
  {
    name: "Villa María del Triunfo",
    badge: "Social Impact",
    activeCitizens: 76,
    kgConverted: "1,580",
    participationRate: "--",
    extra: "8 formal recyclers, 2 cooperatives"
  },
  {
    name: "Comas",
    badge: "Growth Potential",
    activeCitizens: 51,
    kgConverted: "1,100",
    participationRate: "--",
    extra: "12 new users/week"
  },
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
            <h1 className="text-3xl md:text-4xl font-bold text-foreground uppercase">
              METROPOLITAN LIMA - CONTROL PANEL
            </h1>
            <p className="text-muted-foreground mt-2">
              Last update: Real-time Simulation | Period: January 2024 - Present (Simulated Data)
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Waste Diverted"
              value="8,450 kg"
              subtitle="From Landfills"
              icon={BarChart3}
              trend={{ value: 12, positive: true }}
              variant="forest"
            />
            <StatCard
              title="Participating Citizens"
              value="342"
              subtitle="Simulated Users"
              icon={Building2}
              trend={{ value: 5, positive: true }}
              variant="tech"
            />
            <StatCard
              title="Formalized Recyclers"
              value="12"
              subtitle="Registered Workers"
              icon={Target}
              variant="forest"
            />
            <StatCard
              title="CO2 Emissions Avoided"
              value="3.2 tons"
              subtitle="Environmental Impact"
              icon={BarChart3}
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
              <div className="space-y-4 mt-4">
                {materialData.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <span className="text-sm font-bold text-foreground ml-auto">{item.value}%</span>
                    </div>
                    {item.details && (
                      <p className="text-xs text-muted-foreground pl-5">{item.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Participation by District */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border/50"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">Participation by District</h2>
              <div className="space-y-6">
                {districtData.map((district, index) => (
                  <motion.div
                    key={district.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="space-y-2 pb-4 border-b border-border/20 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground flex items-center gap-2">
                          {index === 0 && "🏆"} {district.name}
                        </span>
                        <span className="text-xs text-tech-blue font-medium">{district.badge}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-foreground block">{district.kgConverted} kg</span>
                        <span className="text-xs text-muted-foreground">recycled/mo</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mt-2 bg-muted/30 p-2 rounded-md">
                      <div>
                        <span className="block font-medium text-foreground">{district.activeCitizens}</span>
                        Active Citizens
                      </div>
                      <div>
                        <span className="block font-medium text-foreground">{district.participationRate}</span>
                        Participation Rate
                      </div>
                      <div className="col-span-2 border-t border-border/10 pt-1 mt-1">
                        <span className="text-forest font-medium">{district.extra}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
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
