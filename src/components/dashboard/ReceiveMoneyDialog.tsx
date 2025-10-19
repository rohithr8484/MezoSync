import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, QrCode } from "lucide-react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

interface ReceiveMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReceiveMoneyDialog = ({ open, onOpenChange }: ReceiveMoneyDialogProps) => {
  const { address } = useAccount();
  const displayAddress = address || "0x1234...5678";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(displayAddress);
    toast.success("Address copied to clipboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Receive MUSD</DialogTitle>
          <DialogDescription>
            Share your address to receive MUSD payments
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-center">
            <div className="w-48 h-48 rounded-xl bg-accent/10 flex items-center justify-center border-2 border-accent/20">
              <QrCode className="w-32 h-32 text-accent" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Your Wallet Address</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-3 rounded-lg bg-muted/50 border font-mono text-sm break-all">
                {displayAddress}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyAddress}
                className="shrink-0"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-lg bg-accent/5 p-4 text-sm text-muted-foreground">
            Only send MUSD to this address. Sending other assets may result in permanent loss.
          </div>
        </div>

        <Button variant="hero" onClick={() => onOpenChange(false)} className="w-full">
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiveMoneyDialog;
