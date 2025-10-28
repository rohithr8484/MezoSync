import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WalletConnect from "@/components/WalletConnect";
import WagmiConnect from "@/components/WagmiConnect";
import BoarConnect from "@/components/BoarConnect";
import MezoPassportConnect from "@/components/MezoPassport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";

const WalletPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 backdrop-blur-sm mb-4">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Secure Wallet Connection</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Connect Your Wallet
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred wallet provider to access Bitcoin-backed financial services
            </p>
          </div>

          <Tabs defaultValue="rainbowkit" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="rainbowkit">RainbowKit</TabsTrigger>
              <TabsTrigger value="wagmi">Wagmi</TabsTrigger>
              <TabsTrigger value="boar">Boar Wallet</TabsTrigger>
              <TabsTrigger value="passport">Mezo Passport</TabsTrigger>
            </TabsList>

            <TabsContent value="rainbowkit" className="space-y-6">
              <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-[var(--shadow-lg)]">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold">RainbowKit Connection</h2>
                  <p className="text-muted-foreground mb-6">
                    Connect with multiple wallet providers using RainbowKit
                  </p>
                  <WalletConnect />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="wagmi" className="space-y-6">
              <div className="flex justify-center">
                <WagmiConnect />
              </div>
            </TabsContent>

            <TabsContent value="boar" className="space-y-6">
              <div className="flex justify-center">
                <BoarConnect />
              </div>
            </TabsContent>

            <TabsContent value="passport" className="space-y-6">
              <div className="flex justify-center">
                <MezoPassportConnect />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 p-6 bg-secondary/30 rounded-xl border border-border/50">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              Security Features
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Your private keys never leave your wallet</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>All connections use industry-standard encryption</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                <span>Multi-signature support for enhanced security</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WalletPage;
