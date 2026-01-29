import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Wallet } from "lucide-react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

interface ReceiveMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReceiveMoneyDialog = ({ open, onOpenChange }: ReceiveMoneyDialogProps) => {
  const { address, isConnected } = useAccount();

  // Generate EIP-681 compliant payment URI for wallet scanning
  // Format: ethereum:0xAddress@chainId
  const getPaymentUri = () => {
    if (!address) return "";
    // Use Mezo mainnet chain ID (31612 = 0x7B7C)
    return `ethereum:${address}@31612`;
  };

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  // Show connect wallet prompt if not connected
  if (!isConnected || !address) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Receive MUSD</DialogTitle>
            <DialogDescription>
              Connect your wallet to receive MUSD payments
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                <Wallet className="w-8 h-8 text-accent" />
              </div>
              <p className="text-muted-foreground">
                Please connect your wallet first to view your receive address and QR code.
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
          <DialogTitle>Receive MUSD</DialogTitle>
          <DialogDescription>
            Scan QR code with MetaMask or any wallet to receive MUSD
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-center">
            <div className="p-4 rounded-xl bg-white">
              <QRCode
                value={getPaymentUri()}
                size={192}
                level="H"
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>EIP-681 compatible • Scan with MetaMask, Trust Wallet, etc.</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Your Wallet Address</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-4 py-3 rounded-lg bg-muted/50 border font-mono text-sm break-all">
                {address}
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
            Only send MUSD to this address on the Mezo Network. Sending other assets or using the wrong network may result in permanent loss.
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
