import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, TrendingUp, RefreshCw, Coins } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { usePythPrice } from "@/hooks/usePythPrice";
import { supabase } from "@/integrations/supabase/client";

interface LiveMUSDBalanceProps {
  savingsBalance: number;
}

const LiveMUSDBalance = ({ savingsBalance }: LiveMUSDBalanceProps) => {
  const { address } = useAccount();
  const [showBalance, setShowBalance] = useState(true);
  const { priceData, loading: priceLoading } = usePythPrice("BTC_USD");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Calculate values
  const musdBalance = savingsBalance;
  const btcPrice = priceData ? parseFloat(priceData.price) : 88000;
  const bitcoinValue = btcPrice > 0 ? (musdBalance / btcPrice).toFixed(6) : "0.000000";
  
  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatBalance = (value: number) => {
    return value.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  return (
    <Card className="bg-gradient-to-br from-accent/20 via-card to-primary/10 border-accent/30 shadow-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/20 ring-1 ring-accent/30">
              <Coins className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Live MUSD Balance</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                <span>Updates live</span>
                {priceLoading ? (
                  <RefreshCw className="w-3 h-3 animate-spin" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                )}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowBalance(!showBalance)}
            className="text-muted-foreground hover:text-foreground hover:bg-accent/10"
          >
            {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>

        <div className="mb-4">
          {showBalance ? (
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                {formatBalance(musdBalance)}
              </h2>
              <span className="text-xl text-accent font-semibold">MUSD</span>
            </div>
          ) : (
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">••••••</h2>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div>
            <p className="text-muted-foreground text-xs mb-1">Bitcoin Equivalent</p>
            {showBalance ? (
              <p className="text-foreground font-semibold font-mono">₿ {bitcoinValue}</p>
            ) : (
              <p className="text-foreground font-semibold">••••••</p>
            )}
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-500">
              {priceData?.change24h || "+0.0%"}
            </span>
          </div>
        </div>

        {/* Live BTC Price */}
        <div className="mt-3 pt-3 border-t border-border/30">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">BTC/USD Rate</span>
            <span className="font-mono text-foreground">
              ${btcPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveMUSDBalance;
