import { useChainId, useConnect, useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WagmiConnect = () => {
  const chainId = useChainId();
  const { connectors, connect, isPending } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Connected Address</p>
            <p className="font-mono text-sm bg-secondary p-3 rounded-lg break-all">
              {address}
            </p>
          </div>
          <Button 
            onClick={() => disconnect()} 
            variant="destructive" 
            className="w-full gap-2"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2 mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Wallet className="w-5 h-5 text-accent" />
            Connect Your Wallet
          </h3>
          <p className="text-sm text-muted-foreground">
            Choose a wallet provider to connect
          </p>
        </div>
        
        <div className="space-y-3">
          {connectors.map((connector) => (
            <Button
              type="button"
              onClick={() => {
                connect({ connector, chainId });
              }}
              key={connector.id}
              variant="heroOutline"
              size="lg"
              className="w-full justify-start gap-3"
              disabled={isPending}
            >
              <Wallet className="w-5 h-5" />
              <span className="flex-1 text-left">{connector.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WagmiConnect;
