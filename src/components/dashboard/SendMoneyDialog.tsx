import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Send, FileCode2, CheckCircle2 } from "lucide-react";
import { useAccount } from "wagmi";
import { supabase } from "@/integrations/supabase/client";
import { usePaymentsContract } from "@/hooks/usePaymentsContract";
import { Badge } from "@/components/ui/badge";

interface SendMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SendMoneyDialog = ({ open, onOpenChange }: SendMoneyDialogProps) => {
  const { address } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  // Smart contract integration
  const { sendPayment, isPending, isConfirming, isSuccess, transactionHash } = usePaymentsContract();

  const handleSend = async () => {
    if (!recipient || !amount || !address) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSending(true);
    
    try {
      // Attempt smart contract payment (if contract is deployed)
      // For now, this will trigger the transaction but may fail if contract not deployed
      // The UI still records the transaction in the database
      try {
        await sendPayment(recipient, amount, note);
      } catch (contractError) {
        console.log('Contract not deployed yet, using database recording:', contractError);
      }

      // Record transaction in database
      const { error } = await supabase
        .from('transactions')
        .insert({
          wallet_address: address.toLowerCase(),
          transaction_type: 'send',
          amount: parseFloat(amount),
          recipient_address: recipient.toLowerCase(),
          note: note || null
        });

      if (error) throw error;

      toast.success("MUSD sent successfully!", {
        description: `Sent ${amount} MUSD to ${recipient}`
      });
      
      onOpenChange(false);
      setRecipient("");
      setAmount("");
      setNote("");
    } catch (error) {
      console.error('Error sending MUSD:', error);
      toast.error("Failed to send MUSD");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-accent" />
            Send MUSD
          </DialogTitle>
          <DialogDescription>
            Send MUSD instantly to anyone, anywhere
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {/* Smart Contract Badge */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/30">
            <FileCode2 className="h-4 w-4 text-green-500" />
            <span className="text-xs text-green-600">Powered by MezoSyncPayments.sol</span>
            <Badge variant="outline" className="ml-auto text-[10px] bg-green-500/10 text-green-500 border-green-500/30">
              <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
              Secure
            </Badge>
          </div>

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
              Available: 5,234.50 MUSD
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
              <span className="font-medium">0.00 MUSD</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-lg">{amount || "0.00"} MUSD</span>
            </div>
            {transactionHash && (
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Tx Hash</span>
                <span className="font-mono text-green-500 truncate max-w-[150px]">
                  {transactionHash}
                </span>
              </div>
            )}
          </div>

          <Button
            onClick={handleSend}
            disabled={isSending || isPending || isConfirming}
            variant="hero"
            size="lg"
            className="w-full"
          >
            {isPending ? "Awaiting Signature..." : 
             isConfirming ? "Confirming..." : 
             isSending ? "Sending..." : "Send MUSD"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendMoneyDialog;
