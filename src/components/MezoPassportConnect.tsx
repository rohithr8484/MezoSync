import { useChainId, useConnect, useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut, Bitcoin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MezoPassportConnect = () => {
  const chainId = useChainId();
  const { connectors, connect, isPending } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Filter for Bitcoin wallet connectors from Mezo Passport
  const bitcoinConnectors = connectors.filter(
    (connector) =>
      connector.name.toLowerCase().includes("unisat") ||
      connector.name.toLowerCase().includes("okx") ||
      connector.name.toLowerCase().includes("xverse") ||
      connector.name.toLowerCase().includes("bitcoin")
  );

  // Use all connectors if no specific Bitcoin ones found
  const displayConnectors = bitcoinConnectors.length > 0 ? bitcoinConnectors : connectors;

  if (isConnected && address) {
    return (
      <Card className="w-full max-w-md border-accent/30">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Bitcoin className="w-5 h-5 text-accent" />
            <h3 className="font-semibold">Mezo Passport Connected</h3>
          </div>
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
    <Card className="w-full max-w-md border-accent/30">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2 mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bitcoin className="w-5 h-5 text-accent" />
            Mezo Passport
          </h3>
          <p className="text-sm text-muted-foreground">
            Connect your Bitcoin wallet via Mezo Passport for seamless BTC & EVM integration
          </p>
        </div>

        <div className="p-3 bg-accent/10 rounded-lg border border-accent/20 mb-4">
          <p className="text-xs text-muted-foreground">
            <strong className="text-accent">Supported wallets:</strong> Unisat, OKX, Xverse, and more Bitcoin wallets
          </p>
        </div>
        
        <div className="space-y-3">
          {displayConnectors.map((connector) => (
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

export default MezoPassportConnect;
