import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank, TrendingUp, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import AddToSavingsDialog from "./AddToSavingsDialog";

const SavingsOverview = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const savingsBalance = "1,850.00";
  const savingsGoal = "5,000.00";
  const progress = (1850 / 5000) * 100;
  const apy = "4.5%";

  return (
    <div className="space-y-6">
      <Card className="border-accent/30 animate-fade-in hover-scale transition-all duration-300" style={{ animationDelay: '200ms' }}>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Savings Account</h3>
              </div>
              <p className="text-3xl font-bold text-foreground">${savingsBalance}</p>
              <p className="text-sm text-muted-foreground mt-1">MUSD Balance</p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                {apy} APY
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Savings Goal</span>
              <span className="font-medium">${savingsGoal}</span>
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

      <AddToSavingsDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />

      <Card className="animate-fade-in" style={{ animationDelay: '350ms' }}>
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
