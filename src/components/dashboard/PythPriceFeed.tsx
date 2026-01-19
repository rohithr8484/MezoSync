import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Zap } from "lucide-react";
import { usePythPrice } from "@/hooks/usePythPrice";
import { PRICE_FEED_IDS } from "@/lib/pyth-config";
import { Skeleton } from "@/components/ui/skeleton";

interface PriceFeedCardProps {
  title: string;
  feedId: string;
  symbol: string;
  isMUSD?: boolean;
}

const PriceFeedCard = ({ title, feedId, symbol, isMUSD = false }: PriceFeedCardProps) => {
  const { priceData, loading, error } = usePythPrice(feedId);

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">{title} - Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-border/50 hover:border-primary/50 transition-all ${isMUSD ? 'bg-gradient-to-br from-primary/5 to-accent/5' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className={`w-4 h-4 ${isMUSD ? 'text-accent' : 'text-primary'}`} />
            {title}
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
            <div className="text-3xl font-bold font-mono">
              {symbol}{priceData.price}
            </div>
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

const PythPriceFeed = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Zap className="w-3 h-3 text-accent" />
        <span>Powered by Pyth Network • Updates every 400ms</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PriceFeedCard 
          title="BTC/USD" 
          feedId={PRICE_FEED_IDS.BTC_USD} 
          symbol="$"
        />
        <PriceFeedCard 
          title="MUSD/USD" 
          feedId={PRICE_FEED_IDS.MUSD_USD} 
          symbol="$"
          isMUSD
        />
      </div>
    </div>
  );
};

export default PythPriceFeed;
