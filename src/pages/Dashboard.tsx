import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AccountBalance from "@/components/dashboard/AccountBalance";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import SavingsOverview from "@/components/dashboard/SavingsOverview";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const { isConnected } = useAccount();
  const [savingsBalance, setSavingsBalance] = useState(1850.00);

  const handleSavingsAdded = (amount: number) => {
    setSavingsBalance(prev => prev + amount);
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
              Please connect your wallet to access your dashboard and start managing your money.
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
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Manage your money, simplified</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AccountBalance />
              <QuickActions 
                currentSavings={savingsBalance}
                onSavingsAdded={handleSavingsAdded}
              />
              <RecentTransactions />
            </div>
            
            <div className="space-y-6">
              <SavingsOverview 
                savingsBalance={savingsBalance}
                onSavingsAdded={handleSavingsAdded}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
