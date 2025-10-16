import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface AddToSavingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddToSavingsDialog = ({ open, onOpenChange }: AddToSavingsDialogProps) => {
  const [amount, setAmount] = useState("");
  
  // Mock data - in production, fetch from blockchain
  const mainBalance = 5234.50;
  const currentSavings = 1850.00;
  const apy = 4.5;

  const amountNum = parseFloat(amount) || 0;
  const newMainBalance = mainBalance - amountNum;
  const newSavingsBalance = currentSavings + amountNum;

  const handleAddToSavings = () => {
    if (!amount || amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (amountNum > mainBalance) {
      toast.error("Insufficient balance in main account");
      return;
    }
    
    // In production: execute blockchain transaction here
    toast.success(`Successfully added ${amountNum.toFixed(2)} MUSD to savings`, {
      description: `Your savings balance is now $${newSavingsBalance.toFixed(2)} MUSD`
    });
    setAmount("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Savings</DialogTitle>
          <DialogDescription>
            Transfer money from your main balance to your savings account
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (MUSD)</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                className="pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                MUSD
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Available: ${mainBalance.toFixed(2)} MUSD
            </p>
          </div>

          <div className="rounded-lg bg-accent/5 p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Savings</span>
              <span className="font-medium">${currentSavings.toFixed(2)} MUSD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">APY Rate</span>
              <span className="font-medium text-green-600">{apy}%</span>
            </div>
          </div>

          {amountNum > 0 && (
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 space-y-2 text-sm animate-fade-in">
              <p className="font-medium text-foreground mb-2">After Transfer:</p>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Main Balance</span>
                <span className={`font-medium ${newMainBalance < 0 ? 'text-destructive' : 'text-foreground'}`}>
                  ${newMainBalance.toFixed(2)} MUSD
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Savings Balance</span>
                <span className="font-medium text-green-600">
                  ${newSavingsBalance.toFixed(2)} MUSD
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-accent/20">
                <span className="text-muted-foreground">Estimated Annual Interest</span>
                <span className="font-medium text-green-600">
                  +${(newSavingsBalance * (apy / 100)).toFixed(2)} MUSD
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button variant="hero" onClick={handleAddToSavings} className="flex-1">
            Add to Savings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToSavingsDialog;
