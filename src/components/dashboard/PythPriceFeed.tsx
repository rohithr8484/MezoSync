import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { usePythPrice } from "@/hooks/usePythPrice";
import { PRICE_FEED_IDS } from "@/lib/pyth-config";
import { Skeleton } from "@/components/ui/skeleton";

const PythPriceFeed = () => {
  const { priceData, loading, error } = usePythPrice(PRICE_FEED_IDS.BTC_USD);

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Price Feed Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 hover:border-primary/50 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            BTC/USD (Live via Pyth)
          </CardTitle>
          {priceData && (
            <span className="text-xs text-muted-foreground">
              {priceData.lastUpdate.toLocaleTimeString()}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        ) : priceData ? (
          <div className="space-y-2">
            <div className="text-3xl font-bold">${priceData.price}</div>
            <div className="flex items-center gap-2">
              {priceData.change24h.startsWith('+') ? (
                <div className="flex items-center gap-1 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{priceData.change24h}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-500">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm font-medium">{priceData.change24h}</span>
                </div>
              )}
              <span className="text-xs text-muted-foreground">24h</span>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default PythPriceFeed;
