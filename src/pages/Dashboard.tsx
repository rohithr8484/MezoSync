import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import QuickActions from "@/components/dashboard/QuickActions";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import SavingsOverview from "@/components/dashboard/SavingsOverview";
import PythPriceFeed from "@/components/dashboard/PythPriceFeed";
import MUSDInfo from "@/components/dashboard/MUSDInfo";
import MUSDRewards from "@/components/dashboard/MUSDRewards";
import FAQ from "@/components/dashboard/FAQ";
import BillPaySection from "@/components/dashboard/BillPaySection";
import NetworkStatus from "@/components/NetworkStatus";
import LiveMUSDBalance from "@/components/dashboard/LiveMUSDBalance";

import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Dashboard = () => {
  const { isConnected, address } = useAccount();
  const [savingsBalance, setSavingsBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch savings balance from database when wallet is connected
  useEffect(() => {
    const fetchSavingsBalance = async () => {
      if (!address) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_balances')
          .select('savings_balance')
          .eq('wallet_address', address.toLowerCase())
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setSavingsBalance(Number(data.savings_balance));
        } else {
          // Create initial balance record
          const { error: insertError } = await supabase
            .from('user_balances')
            .insert({ 
              wallet_address: address.toLowerCase(), 
              savings_balance: 0 
            });

          if (insertError) throw insertError;
          setSavingsBalance(0);
        }
      } catch (error) {
        console.error('Error fetching savings balance:', error);
        toast.error('Failed to load savings balance');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavingsBalance();
  }, [address]);

  const handleSavingsAdded = async (amount: number) => {
    if (!address) return;

    const newBalance = savingsBalance + amount;
    setSavingsBalance(newBalance);

    try {
      const { error } = await supabase
        .from('user_balances')
        .update({ savings_balance: newBalance })
        .eq('wallet_address', address.toLowerCase());

      if (error) throw error;
    } catch (error) {
      console.error('Error updating savings balance:', error);
      toast.error('Failed to save balance');
      // Revert on error
      setSavingsBalance(savingsBalance);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-md text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
              <Wallet className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-3xl font-bold">Connect Your Account</h1>
            <p className="text-muted-foreground">
              Please connect your wallet to access your dashboard and start managing your MUSD.
            </p>
            <Link to="/wallet">
              <Button variant="hero" size="xl" className="mt-4">
                Connect Now
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
                Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Manage your MUSD, simplified</p>
            </div>
          </div>

          {/* MUSD Info Section */}
          <MUSDInfo />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <PythPriceFeed />
              {/* Network Status - above quick actions */}
              <NetworkStatus />
              {/* Live MUSD Balance - above quick actions */}
              <LiveMUSDBalance savingsBalance={savingsBalance} />
              <QuickActions 
                currentSavings={savingsBalance}
                onSavingsAdded={handleSavingsAdded}
              />
              <RecentTransactions />
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <SavingsOverview 
                savingsBalance={savingsBalance}
                onSavingsAdded={handleSavingsAdded}
              />
              {/* Bill Pay Section - after savings */}
              <BillPaySection />
              {/* MUSD Rewards - below bill pay */}
              <MUSDRewards />
            </div>
          </div>

          {/* FAQ Section */}
          <FAQ />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
