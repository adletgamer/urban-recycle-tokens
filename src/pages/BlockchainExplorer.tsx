import { motion } from "framer-motion";
import { Blocks, Copy, ExternalLink, CheckCircle, Clock, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import BlockchainTransaction from "@/components/BlockchainTransaction";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const contracts = [
  {
    name: "UrbanCoin",
    address: "0xDEM0ADD123456789ABCDEF",
    type: "ERC-20 Token",
    status: "Verified",
  },
  {
    name: "WasteManager",
    address: "0xDEM0ADD456789ABCDEF012",
    type: "Core Contract",
    status: "Verified",
  },
  {
    name: "PaymentDistributor",
    address: "0xDEM0ADD789ABCDEF012345",
    type: "Payment Handler",
    status: "Verified",
  },
  {
    name: "WasteNFT",
    address: "0xDEM0ADDABCDEF012345678",
    type: "ERC-721 NFT",
    status: "Verified",
  },
];

const transactions = [
  { hash: "0x7a3...b89", action: "Minted 25 URB to 0x1f4...", time: "2 min ago" },
  { hash: "0x9b2...c45", action: "Created WasteNFT #104", time: "5 min ago" },
  { hash: "0x5d8...e21", action: "Distributed 50 USDC to Recycler", time: "8 min ago" },
  { hash: "0x3a1...f76", action: "Quality verified - Plastic Grade A", time: "12 min ago" },
  { hash: "0x2c4...d89", action: "New collection point registered", time: "15 min ago" },
  { hash: "0x8f1...a23", action: "Token reward calculation updated", time: "18 min ago" },
];

const BlockchainExplorer = () => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    toast({
      title: "Address Copied",
      description: "Contract address copied to clipboard",
    });
    setTimeout(() => setCopiedAddress(null), 2000);
  };

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
              <Blocks className="w-5 h-5 text-tech-blue" />
              <span className="px-2 py-0.5 rounded-full bg-tech-blue/10 text-tech-blue text-xs font-medium">Polygon Mumbai Testnet</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Blockchain Explorer
            </h1>
            <p className="text-muted-foreground mt-2">
              Live transaction feed and smart contract addresses
            </p>
          </motion.div>

          {/* Network Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-tech rounded-xl p-6 mb-8 text-white shadow-glow-tech"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Network Status</h2>
                  <p className="text-white/70 text-sm">Polygon Mumbai Testnet</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm">Connected</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">~2s</div>
                  <div className="text-xs text-white/70">Block Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">0.001</div>
                  <div className="text-xs text-white/70">Avg Gas (MATIC)</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Smart Contracts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border/50"
            >
              <h2 className="text-lg font-semibold text-foreground mb-6">Contract Addresses</h2>
              <div className="space-y-4">
                {contracts.map((contract, index) => (
                  <motion.div
                    key={contract.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="p-4 rounded-lg border border-border/50 hover:border-tech-blue/50 hover:bg-accent/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{contract.name}</h3>
                        <span className="text-xs text-muted-foreground">{contract.type}</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-forest bg-forest/10 px-2 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        {contract.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-tech-blue bg-tech-blue/5 px-2 py-1 rounded flex-1 truncate">
                        {contract.address}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyAddress(contract.address)}
                      >
                        {copiedAddress === contract.address ? (
                          <CheckCircle className="w-4 h-4 text-forest" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Live Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-xl p-6 shadow-card border border-border/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Live Transaction Feed</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Testnet</span>
                </div>
              </div>
              <div className="space-y-3">
                {transactions.map((tx, index) => (
                  <BlockchainTransaction key={index} {...tx} />
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Demo Mode:</span> Transactions are simulated for demonstration purposes.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Contract Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-card rounded-xl p-6 shadow-card border border-border/50"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Smart Contract Architecture</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-forest/5 border border-forest/20">
                <h3 className="font-semibold text-forest mb-2">UrbanCoin (URB)</h3>
                <p className="text-sm text-muted-foreground">
                  ERC-20 reward token minted when recycling is verified
                </p>
              </div>
              <div className="p-4 rounded-lg bg-tech-blue/5 border border-tech-blue/20">
                <h3 className="font-semibold text-tech-blue mb-2">WasteManager</h3>
                <p className="text-sm text-muted-foreground">
                  Core contract handling recycling verification and token minting
                </p>
              </div>
              <div className="p-4 rounded-lg bg-forest/5 border border-forest/20">
                <h3 className="font-semibold text-forest mb-2">PaymentDistributor</h3>
                <p className="text-sm text-muted-foreground">
                  Handles stablecoin payments to informal recyclers
                </p>
              </div>
              <div className="p-4 rounded-lg bg-tech-blue/5 border border-tech-blue/20">
                <h3 className="font-semibold text-tech-blue mb-2">WasteNFT</h3>
                <p className="text-sm text-muted-foreground">
                  ERC-721 tokens tracking material origin and quality
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BlockchainExplorer;
