import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface SendMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SendMoneyDialog = ({ open, onOpenChange }: SendMoneyDialogProps) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!recipient || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSending(true);
    
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Money sent successfully!", {
      description: `Sent $${amount} MUSD to ${recipient}`
    });
    
    setIsSending(false);
    onOpenChange(false);
    setRecipient("");
    setAmount("");
    setNote("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-accent" />
            Send Money
          </DialogTitle>
          <DialogDescription>
            Send MUSD instantly to anyone, anywhere
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address or Username</Label>
            <Input
              id="recipient"
              placeholder="0x... or username"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (MUSD)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Available: $5,234.50 MUSD
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input
              id="note"
              placeholder="What's this for?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction Fee</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-lg">${amount || "0.00"} MUSD</span>
            </div>
          </div>

          <Button
            onClick={handleSend}
            disabled={isSending}
            variant="hero"
            size="lg"
            className="w-full"
          >
            {isSending ? "Sending..." : "Send Money"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendMoneyDialog;
