import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const AccountBalance = () => {
  const [showBalance, setShowBalance] = useState(true);
  
  // Mock data - in production, fetch from Mezo/blockchain
  const balance = "5,234.50";
  const bitcoinValue = "0.0523";
  const changePercent = "+2.4%";

  return (
    <Card className="bg-gradient-to-br from-primary to-purple-950 border-0 shadow-[var(--shadow-lg)] overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      
      <CardContent className="p-8 relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-primary-foreground/70 text-sm mb-1">Available Balance</p>
            <div className="flex items-baseline gap-3">
              {showBalance ? (
                <>
                  <h2 className="text-5xl font-bold text-primary-foreground">${balance}</h2>
                  <span className="text-primary-foreground/60 text-lg">MUSD</span>
                </>
              ) : (
                <h2 className="text-5xl font-bold text-primary-foreground">••••••</h2>
              )}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowBalance(!showBalance)}
            className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10"
          >
            {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div>
            <p className="text-primary-foreground/60 text-xs mb-1">Bitcoin Value</p>
            <p className="text-primary-foreground font-semibold">₿ {bitcoinValue}</p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">{changePercent}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountBalance;
