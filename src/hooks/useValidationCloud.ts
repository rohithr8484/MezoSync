import { useQuery } from '@tanstack/react-query';
import { 
  getLatestBlockHeight, 
  getGasPrice, 
  getChainId,
  getBalance,
  getTransactionCount,
} from '@/lib/validation-cloud';

/**
 * Hook to fetch the latest block height from Mezo Network
 */
export function useBlockHeight(refetchInterval?: number) {
  return useQuery({
    queryKey: ['mezo-block-height'],
    queryFn: getLatestBlockHeight,
    refetchInterval: refetchInterval || 10000, // Default: refetch every 10 seconds
  });
}

/**
 * Hook to fetch the current gas price from Mezo Network
 */
export function useGasPrice(refetchInterval?: number) {
  return useQuery({
    queryKey: ['mezo-gas-price'],
    queryFn: getGasPrice,
    refetchInterval: refetchInterval || 15000, // Default: refetch every 15 seconds
  });
}

/**
 * Hook to fetch the chain ID from Mezo Network
 */
export function useChainId() {
  return useQuery({
    queryKey: ['mezo-chain-id'],
    queryFn: getChainId,
    staleTime: Infinity, // Chain ID doesn't change
  });
}

/**
 * Hook to fetch the balance of an address
 */
export function useAddressBalance(address: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ['mezo-balance', address],
    queryFn: () => address ? getBalance(address) : Promise.resolve(BigInt(0)),
    enabled: enabled && !!address,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

/**
 * Hook to fetch the transaction count (nonce) of an address
 */
export function useTransactionCount(address: string | undefined, enabled = true) {
  return useQuery({
    queryKey: ['mezo-tx-count', address],
    queryFn: () => address ? getTransactionCount(address) : Promise.resolve(0),
    enabled: enabled && !!address,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}
