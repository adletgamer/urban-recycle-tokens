import { motion } from "framer-motion";
import { AlertTriangle, Users, TrendingDown, Shield, BarChart3 } from "lucide-react";

const problems = [
  {
    icon: AlertTriangle,
    title: "Inefficient Systems",
    description: "Municipal waste management systems lack modern technology integration",
  },
  {
    icon: Users,
    title: "Low Participation",
    description: "Citizens have little incentive to participate in recycling programs",
  },
  {
    icon: TrendingDown,
    title: "No Incentives",
    description: "Lack of rewards for proper waste separation discourages participation",
  },
  {
    icon: Shield,
    title: "Worker Safety",
    description: "Informal recyclers face hazardous working conditions without protection",
  },
  {
    icon: BarChart3,
    title: "Missing Data",
    description: "No reliable data collection for SDG reporting and policy decisions",
  },
];

const ProblemStatement = () => {
  return (
    <section className="py-24 bg-gradient-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-destructive/20 text-destructive text-sm font-semibold mb-4">
            THE PROBLEM
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Urban Waste Crisis in Megacities
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Current waste management systems are failing our cities and citizens
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-semibold text-white mb-2">{problem.title}</h3>
              <p className="text-sm text-white/60">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
