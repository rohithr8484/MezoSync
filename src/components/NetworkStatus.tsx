import { Activity, Zap } from "lucide-react";
import { useBlockHeight, useGasPrice } from "@/hooks/useValidationCloud";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const NetworkStatus = () => {
  const { data: blockHeight, isLoading: isLoadingBlock } = useBlockHeight();
  const { data: gasPrice, isLoading: isLoadingGas } = useGasPrice();

  const formatGasPrice = (price: bigint | undefined) => {
    if (!price) return "0";
    const gwei = Number(price) / 1e9;
    return gwei.toFixed(2);
  };

  return (
    <Card className="border-accent/20 bg-card/50 backdrop-blur-sm shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-accent)] transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent animate-pulse" />
            Mezo Network Status
          </h3>
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[var(--shadow-glow)]" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[image:var(--gradient-accent)] flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Latest Block</p>
                {isLoadingBlock ? (
                  <Skeleton className="h-6 w-24 mt-1" />
                ) : (
                  <p className="text-xl font-bold text-foreground">
                    {blockHeight?.toLocaleString() || "—"}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[image:var(--gradient-accent)] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gas Price</p>
                {isLoadingGas ? (
                  <Skeleton className="h-6 w-24 mt-1" />
                ) : (
                  <p className="text-xl font-bold text-foreground">
                    {formatGasPrice(gasPrice)} <span className="text-sm text-muted-foreground">Gwei</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/20">
          <p className="text-xs text-muted-foreground text-center">
            Powered by{" "}
            <span className="font-semibold text-accent">Validation Cloud</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatus;
