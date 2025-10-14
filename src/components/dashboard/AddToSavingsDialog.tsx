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

  const handleAddToSavings = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    toast.success(`Successfully added $${amount} MUSD to savings`);
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
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div className="rounded-lg bg-accent/5 p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Savings</span>
              <span className="font-medium">$1,850.00 MUSD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">APY Rate</span>
              <span className="font-medium text-green-600">4.5%</span>
            </div>
          </div>
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
