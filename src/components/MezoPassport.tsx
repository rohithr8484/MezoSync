import { Card, CardContent } from "@/components/ui/card";
import { Wallet, AlertCircle } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const MezoPassportConnect = () => {
  return (
    <Card className="w-full max-w-md border-accent/30">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="w-5 h-5 text-accent" />
          <h3 className="font-semibold">Connect Mezo Passport</h3>
        </div>
        
        <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
          <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Connect using Mezo Passport for secure Bitcoin wallet support alongside EVM wallets.
          </p>
        </div>
        
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default MezoPassportConnect;
