import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, Shield, Zap, Globe } from "lucide-react";

const MUSDInfo = () => {
  return (
    <Card className="bg-gradient-to-br from-card to-secondary/50 border-border/50 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent/10 ring-1 ring-accent/20">
            <Coins className="w-6 h-6 text-accent" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold font-display">What is MUSD?</CardTitle>
            <Badge variant="outline" className="mt-1 text-xs font-medium border-accent/30 text-accent">
              Mezo USD Stablecoin
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">MUSD</span> is the native stablecoin of the Mezo network — 
          a Bitcoin-backed digital dollar designed for everyday transactions. It combines the stability of traditional 
          currency with the security and transparency of blockchain technology.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-background/60 border border-border/50">
            <Shield className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">BTC Backed</p>
              <p className="text-xs text-muted-foreground">Secured by Bitcoin collateral</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-background/60 border border-border/50">
            <Zap className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">Instant</p>
              <p className="text-xs text-muted-foreground">Fast, low-cost transfers</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-background/60 border border-border/50">
            <Globe className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">Global</p>
              <p className="text-xs text-muted-foreground">Send anywhere, anytime</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MUSDInfo;
