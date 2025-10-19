import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getConfig, mezoTestnet } from "@mezo-org/passport";
import { useAccount, useConnect, useDisconnect, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();
const mezoConfig = getConfig({ appName: "Mezo Sync" });

const MezoConnectInner = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, isPending } = useConnect();

  if (isConnected && address) {
    return (
      <Card className="p-8 w-full max-w-md">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Connected via Mezo Passport</h3>
            <p className="text-sm text-muted-foreground">
              Your wallet is connected to Mezo Testnet
            </p>
          </div>
          
          <div className="p-4 bg-secondary/30 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Connected Address</p>
            <p className="font-mono text-sm break-all">{address}</p>
          </div>

          <Button 
            onClick={() => disconnect()} 
            variant="destructive" 
            className="w-full"
          >
            Disconnect Wallet
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 w-full max-w-md">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">Connect with Mezo Passport</h3>
          <p className="text-sm text-muted-foreground">
            Connect to Bitcoin-backed financial services using Mezo Testnet
          </p>
        </div>

        <div className="space-y-3">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => connect({ connector, chainId: mezoTestnet.id })}
              disabled={isPending}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-4"
            >
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <span className="text-lg">🔗</span>
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{connector.name}</div>
                <div className="text-xs text-muted-foreground">
                  {isPending ? "Connecting..." : "Click to connect"}
                </div>
              </div>
            </Button>
          ))}
        </div>

        <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
          <p className="text-xs text-muted-foreground text-center">
            Using Mezo Testnet for Bitcoin-backed operations
          </p>
        </div>
      </div>
    </Card>
  );
};

const MezoConnect = () => {
  return (
    <WagmiProvider config={mezoConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={mezoTestnet}>
          <MezoConnectInner />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default MezoConnect;
