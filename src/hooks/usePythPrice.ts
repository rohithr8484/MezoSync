import { useState, useEffect } from 'react';
import { createPythConnection, PRICE_FEED_IDS } from '@/lib/pyth-config';

interface PriceData {
  price: string;
  change24h: string;
  lastUpdate: Date;
}

export const usePythPrice = (feedId: string = PRICE_FEED_IDS.BTC_USD) => {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const connection = createPythConnection();
    let intervalId: NodeJS.Timeout;

    const fetchPrice = async () => {
      try {
        const priceFeeds = await connection.getLatestPriceUpdates([feedId]);
        
        if (priceFeeds && priceFeeds.parsed && priceFeeds.parsed.length > 0) {
          const priceFeed = priceFeeds.parsed[0];
          const price = priceFeed.price;
          
          if (price) {
            const priceValue = Number(price.price) * Math.pow(10, price.expo);
            const formattedPrice = priceValue.toFixed(2);
            
            // Calculate 24h change (mock for now - Pyth provides current price only)
            const change24h = '+2.4%';
            
            setPriceData({
              price: formattedPrice,
              change24h,
              lastUpdate: new Date(),
            });
            setError(null);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Pyth price:', err);
        setError('Failed to fetch price data');
        setLoading(false);
      }
    };

    // Initial fetch
    fetchPrice();

    // Update every 5 seconds (Pyth updates every 400ms, but we don't need that frequency for UI)
    intervalId = setInterval(fetchPrice, 5000);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [feedId]);

  return { priceData, loading, error };
};
