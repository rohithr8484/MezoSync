import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank, TrendingUp, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import AddToSavingsDialog from "./AddToSavingsDialog";
import { useAccount, useBalance } from "wagmi";

interface SavingsOverviewProps {
  savingsBalance: number;
  onSavingsAdded: (amount: number) => void;
}

const SavingsOverview = ({ savingsBalance, onSavingsAdded }: SavingsOverviewProps) => {
  const { address } = useAccount();
  const { data: nativeBalance } = useBalance({ address });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const savingsGoal = 5000.00;
  const progress = (savingsBalance / savingsGoal) * 100;
  const apy = "4.5%";
  
  // Get available balance from wallet
  const availableBalance = nativeBalance ? parseFloat(nativeBalance.formatted) : 0;

  return (
    <div className="space-y-6">
      <Card className="border-accent/30">
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Savings Account</h3>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">
                ${savingsBalance.toFixed(2)} 
                <span className="text-sm sm:text-base text-muted-foreground font-normal ml-1">MUSD</span>
              </p>
            </div>
            
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              {apy} APY
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Savings Goal</span>
              <span className="font-medium">${savingsGoal.toFixed(2)}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {progress.toFixed(0)}% of your goal reached
            </p>
          </div>

          <Button variant="hero" className="w-full" onClick={() => setAddDialogOpen(true)}>
            Add to Savings
          </Button>
        </CardContent>
      </Card>

      <AddToSavingsDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen}
        currentSavings={savingsBalance}
        onSavingsAdded={onSavingsAdded}
        availableBalance={availableBalance}
      />

      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            <h3 className="font-semibold">Savings Tips</h3>
          </div>
          
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                Your savings earn {apy} APY, backed by Bitcoin
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                Set up automatic transfers to reach goals faster
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                No minimum balance or monthly fees
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavingsOverview;
