import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { PAYMENTS_CONTRACT_ABI, PAYMENTS_CONTRACT_ADDRESSES } from '@/lib/contracts/payments-abi';
import { toast } from 'sonner';

// Default to Mezo network chain ID
const DEFAULT_CHAIN_ID = 31612;

export const usePaymentsContract = (chainId: number = DEFAULT_CHAIN_ID) => {
  const contractAddress = PAYMENTS_CONTRACT_ADDRESSES[chainId as keyof typeof PAYMENTS_CONTRACT_ADDRESSES] 
    || PAYMENTS_CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID];

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const sendPayment = async (recipient: string, amount: string, note: string = '') => {
    try {
      // Convert amount to wei (18 decimals for MUSD)
      const amountInWei = parseUnits(amount, 18);

      writeContract({
        address: contractAddress,
        abi: PAYMENTS_CONTRACT_ABI,
        functionName: 'sendPayment',
        args: [recipient as `0x${string}`, amountInWei, note],
      });

      toast.success('Payment transaction submitted');
    } catch (err) {
      console.error('Payment error:', err);
      toast.error('Failed to send payment');
      throw err;
    }
  };

  return {
    sendPayment,
    isPending,
    isConfirming,
    isSuccess,
    error,
    transactionHash: hash,
  };
};

export const useGetPayment = (paymentId: `0x${string}`, chainId: number = DEFAULT_CHAIN_ID) => {
  const contractAddress = PAYMENTS_CONTRACT_ADDRESSES[chainId as keyof typeof PAYMENTS_CONTRACT_ADDRESSES]
    || PAYMENTS_CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID];

  return useReadContract({
    address: contractAddress,
    abi: PAYMENTS_CONTRACT_ABI,
    functionName: 'getPayment',
    args: [paymentId],
  });
};

export const useGetUserPayments = (userAddress: `0x${string}`, chainId: number = DEFAULT_CHAIN_ID) => {
  const contractAddress = PAYMENTS_CONTRACT_ADDRESSES[chainId as keyof typeof PAYMENTS_CONTRACT_ADDRESSES]
    || PAYMENTS_CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID];

  return useReadContract({
    address: contractAddress,
    abi: PAYMENTS_CONTRACT_ABI,
    functionName: 'getUserPayments',
    args: [userAddress],
  });
};

export const useGetUserPaymentCount = (userAddress: `0x${string}`, chainId: number = DEFAULT_CHAIN_ID) => {
  const contractAddress = PAYMENTS_CONTRACT_ADDRESSES[chainId as keyof typeof PAYMENTS_CONTRACT_ADDRESSES]
    || PAYMENTS_CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID];

  return useReadContract({
    address: contractAddress,
    abi: PAYMENTS_CONTRACT_ABI,
    functionName: 'getUserPaymentCount',
    args: [userAddress],
  });
};
