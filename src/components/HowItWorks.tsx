import { motion } from "framer-motion";
import { QrCode, Cpu, Coins, Search, Wallet } from "lucide-react";

const steps = [
  {
    icon: QrCode,
    title: "SCAN",
    description: "Citizens scan QR codes on special recycling bags",
    color: "forest",
  },
  {
    icon: Cpu,
    title: "VERIFY",
    description: "IoT sensors validate material quality at collection points",
    color: "tech",
  },
  {
    icon: Coins,
    title: "MINT",
    description: "Smart contracts automatically mint tokens based on verified recycling",
    color: "forest",
  },
  {
    icon: Search,
    title: "TRACE",
    description: "NFTs track material origin for transparent municipal reporting",
    color: "tech",
  },
  {
    icon: Wallet,
    title: "REWARD",
    description: "Recyclers receive automatic payments via stablecoins",
    color: "forest",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How UrbanRecycle Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A seamless blockchain-powered process from recycling to rewards
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="flex flex-col items-center text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 ${
                    step.color === "forest"
                      ? "bg-gradient-forest shadow-glow-forest"
                      : "bg-gradient-tech shadow-glow-tech"
                  }`}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>
                <div className="text-sm font-bold text-muted-foreground mb-2">
                  STEP {index + 1}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
