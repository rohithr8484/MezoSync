import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Boar API Key and RPC Endpoints
const BOAR_API_KEY = "81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c";
const BOAR_RPC_HTTP = "https://rpc-http.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c";
const BOAR_RPC_WSS = "wss://rpc-ws.mezo.boar.network/81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c";

const BoarConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectBoar = async () => {
    setIsConnecting(true);
    
    try {
      // Check if window.ethereum is available
      if (!window.ethereum) {
        throw new Error("No wallet detected. Please install a Web3 wallet.");
      }
      
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }
      
      // Switch to Boar Network using the RPC endpoint
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x7B7C', // Mezo Mainnet chain ID (31612 in decimal)
            chainName: 'Mezo Network via Boar',
            nativeCurrency: {
              name: 'BTC',
              symbol: 'BTC',
              decimals: 18
            },
            rpcUrls: [BOAR_RPC_HTTP],
            blockExplorerUrls: ['https://explorer.mezo.org']
          }]
        });
      } catch (addError: any) {
        // If chain already exists, try to switch to it
        if (addError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x7B7C' }]
          });
        } else {
          throw addError;
        }
      }
      
      setWalletAddress(accounts[0]);
      setIsConnected(true);
      
      toast.success("Connected to Boar Network", {
        description: `Connected via ${BOAR_RPC_HTTP}`
      });
    } catch (error: any) {
      console.error("Boar connection error:", error);
      toast.error("Connection Failed", {
        description: error.message || "Unable to connect to Boar wallet. Please try again."
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectBoar = () => {
    setIsConnected(false);
    setWalletAddress(null);
    toast.info("Disconnected from Boar Wallet");
  };

  if (isConnected && walletAddress) {
    return (
      <Card className="w-full max-w-md border-accent/30">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-accent" />
            <h3 className="font-semibold">Boar Wallet Connected</h3>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Wallet Address</p>
            <p className="font-mono text-xs bg-secondary p-3 rounded-lg break-all">
              {walletAddress}
            </p>
          </div>
          
          <Button 
            onClick={disconnectBoar} 
            variant="destructive" 
            className="w-full"
          >
            Disconnect Boar Wallet
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border-accent/30">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Wallet className="w-5 h-5 text-accent" />
          <h3 className="font-semibold">Connect Boar Wallet</h3>
        </div>
        
        <div className="flex items-start gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
          <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Integration with Boar wallet SDK. API Key configured.
          </p>
        </div>
        
        <Button
          onClick={connectBoar}
          disabled={isConnecting}
          variant="hero"
          size="lg"
          className="w-full gap-2"
        >
          <Wallet className="w-5 h-5" />
          {isConnecting ? "Connecting..." : "Connect with Boar"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BoarConnect;
