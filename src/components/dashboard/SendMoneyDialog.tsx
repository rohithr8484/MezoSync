import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { supabase } from "@/integrations/supabase/client";
import { parseEther, formatEther, isAddress, parseUnits } from "viem";
import { MUSD_CONTRACT_ADDRESS, MUSD_ABI } from "@/lib/musd-config";

interface SendMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SendMoneyDialog = ({ open, onOpenChange }: SendMoneyDialogProps) => {
  const { address } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  
  // Read user's MUSD balance
  const { data: balance } = useReadContract({
    address: MUSD_CONTRACT_ADDRESS,
    abi: MUSD_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 10000, // Refresh every 10 seconds
    }
  });

  // Write contract for sending MUSD
  const { data: hash, writeContract, isPending } = useWriteContract();

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const isSending = isPending || isConfirming;

  // Handle successful transaction
  useEffect(() => {
    if (isSuccess && hash) {
      // Record transaction in database
      supabase
        .from('transactions')
        .insert({
          wallet_address: address!.toLowerCase(),
          transaction_type: 'send',
          amount: parseFloat(amount),
          recipient_address: recipient.toLowerCase(),
          note: note || null
        });

      toast.success("MUSD sent successfully!", {
        description: `Sent ${amount} MUSD to ${recipient.slice(0, 6)}...${recipient.slice(-4)}`
      });
      
      onOpenChange(false);
      setRecipient("");
      setAmount("");
      setNote("");
    }
  }, [isSuccess, hash]);

  const handleSend = async () => {
    if (!recipient || !amount || !address) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate recipient address
    if (!isAddress(recipient)) {
      toast.error("Invalid recipient address");
      return;
    }

    // Check if amount is valid
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Invalid amount");
      return;
    }

    // Check balance
    const balanceInMUSD = balance ? parseFloat(formatEther(balance)) : 0;
    if (balanceInMUSD < amountValue) {
      toast.error("Insufficient MUSD balance");
      return;
    }

    try {
      // Convert amount to wei (assuming 18 decimals like standard ERC20)
      const amountInWei = parseUnits(amount, 18);
      
      // Execute blockchain transfer
      writeContract({
        address: MUSD_CONTRACT_ADDRESS,
        abi: MUSD_ABI,
        functionName: "transfer",
        args: [recipient as `0x${string}`, amountInWei]
      });
    } catch (error) {
      console.error('Error sending MUSD:', error);
      toast.error("Failed to send MUSD");
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
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            {recipient && !isAddress(recipient) && (
              <p className="text-xs text-destructive">Invalid wallet address</p>
            )}
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
              Available: {balance ? formatEther(balance) : "0.00"} MUSD
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
            disabled={isSending || !recipient || !amount || !isAddress(recipient)}
            variant="hero"
            size="lg"
            className="w-full"
          >
            {isPending && "Awaiting approval..."}
            {isConfirming && "Confirming transaction..."}
            {!isPending && !isConfirming && "Send MUSD"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendMoneyDialog;
