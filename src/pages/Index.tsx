import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Blocks, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProblemStatement from "@/components/ProblemStatement";
import HowItWorks from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-forest/5 via-background to-tech-blue/5" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-forest/10 to-transparent blur-3xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              rotate: { duration: 50, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-tech-blue/10 to-transparent blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-hero text-white text-sm font-medium mb-8 shadow-glow-forest"
            >
              <Recycle className="w-4 h-4" />
              <span>Tokenizing Urban Sustainability</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-foreground">UrbanRecycle</span>
              <br />
              <span className="text-gradient-hero">Blockchain-Powered</span>
              <br />
              <span className="text-foreground">Waste Management</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Tokenizing recycling efforts in megacities through smart contracts. 
              A proof-of-concept demonstrating how Solidity can drive real-world environmental impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/citizen">
                <Button variant="hero" size="xl">
                  <Play className="w-5 h-5" />
                  View Live Demo
                </Button>
              </Link>
              <Link to="/explorer">
                <Button variant="outline" size="xl" className="border-2">
                  <Blocks className="w-5 h-5" />
                  Explore Smart Contracts
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            >
              {[
                { value: "5+", label: "Smart Contracts" },
                { value: "100%", label: "Transparent" },
                { value: "Polygon", label: "Network" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gradient-hero">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Statement */}
      <ProblemStatement />

      {/* How It Works */}
      <HowItWorks />

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-hero rounded-3xl p-12 md:p-16 shadow-glow-forest"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Explore?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Experience our proof-of-concept dashboard and see how blockchain can transform urban recycling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/citizen">
                <Button variant="heroOutline" size="xl">
                  Try Citizen Dashboard
                </Button>
              </Link>
              <Link to="/municipal">
                <Button variant="heroOutline" size="xl">
                  View Municipal Analytics
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-foreground">UrbanRecycle</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A proof-of-concept for blockchain-powered waste management. Built with Solidity on Polygon.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
