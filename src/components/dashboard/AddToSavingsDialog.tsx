import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { supabase } from "@/integrations/supabase/client";
import { Wallet, PiggyBank } from "lucide-react";
import { Link } from "react-router-dom";

interface AddToSavingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentSavings: number;
  onSavingsAdded: (amount: number) => void;
  availableBalance: number;
}

const AddToSavingsDialog = ({ open, onOpenChange, currentSavings, onSavingsAdded, availableBalance }: AddToSavingsDialogProps) => {
  const { address, isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  
  // Use provided balance prop
  const mainBalance = availableBalance;
  const apy = 4.5;

  const amountNum = parseFloat(amount) || 0;
  const newMainBalance = mainBalance - amountNum;
  const newSavingsBalance = currentSavings + amountNum;

  const handleAddToSavings = async () => {
    if (!amount || amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (amountNum > mainBalance) {
      toast.error("Insufficient balance in main account");
      return;
    }

    if (!address) {
      toast.error("Wallet not connected");
      return;
    }
    
    setIsAdding(true);

    try {
      // Record transaction in database
      const { error } = await supabase
        .from('transactions')
        .insert({
          wallet_address: address.toLowerCase(),
          transaction_type: 'save',
          amount: amountNum,
          note: 'Added to savings'
        });

      if (error) throw error;

      onSavingsAdded(amountNum);
      toast.success(`Successfully added ${amountNum.toFixed(2)} MUSD to savings`, {
        description: `Your savings balance is now ${newSavingsBalance.toFixed(2)} MUSD`
      });
      setAmount("");
      onOpenChange(false);
    } catch (error) {
      console.error('Error adding to savings:', error);
      toast.error("Failed to add to savings");
    } finally {
      setIsAdding(false);
    }
  };

  // Show connect wallet prompt if not connected
  if (!isConnected || !address) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-accent" />
              Add to Savings
            </DialogTitle>
            <DialogDescription>
              Connect your wallet to add to savings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                <Wallet className="w-8 h-8 text-accent" />
              </div>
              <p className="text-muted-foreground">
                Please connect your wallet first to transfer MUSD to your savings account.
              </p>
              <Link to="/wallet">
                <Button variant="hero" className="w-full">
                  Connect Wallet
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-accent" />
            Add to Savings
          </DialogTitle>
          <DialogDescription>
            Transfer MUSD from your main balance to your savings account
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
              Available: {mainBalance.toFixed(2)} MUSD
            </p>
          </div>

          <div className="rounded-lg bg-accent/5 p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Savings</span>
              <span className="font-medium">{currentSavings.toFixed(2)} MUSD</span>
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
                  {newMainBalance.toFixed(2)} MUSD
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Savings Balance</span>
                <span className="font-medium text-green-600">
                  {newSavingsBalance.toFixed(2)} MUSD
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-accent/20">
                <span className="text-muted-foreground">Estimated Annual Interest</span>
                <span className="font-medium text-green-600">
                  +{(newSavingsBalance * (apy / 100)).toFixed(2)} MUSD
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button 
            variant="hero" 
            onClick={handleAddToSavings} 
            disabled={isAdding || amountNum <= 0 || amountNum > mainBalance}
            className="flex-1"
          >
            {isAdding ? "Adding..." : "Add to Savings"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToSavingsDialog;
