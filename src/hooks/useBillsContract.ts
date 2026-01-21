import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { BILLS_CONTRACT_ABI, BILLS_CONTRACT_ADDRESSES, BillType, BillStatus } from '@/lib/contracts/bills-abi';
import { toast } from 'sonner';

// Default to Mezo network chain ID
const DEFAULT_CHAIN_ID = 31612;

export { BillType, BillStatus };

export const useBillsContract = (chainId: number = DEFAULT_CHAIN_ID) => {
  const contractAddress = BILLS_CONTRACT_ADDRESSES[chainId as keyof typeof BILLS_CONTRACT_ADDRESSES]
    || BILLS_CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID];

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createBill = async (
    payer: string,
    amountUSD: number,
    amountMUSD: string,
    billType: BillType,
    customerName: string,
    description: string,
    dueDate: number
  ) => {
    try {
      const amountUSDInWei = parseUnits(amountUSD.toString(), 18);
      const amountMUSDInWei = parseUnits(amountMUSD, 18);

      writeContract({
        address: contractAddress,
        abi: BILLS_CONTRACT_ABI,
        functionName: 'createBill',
        args: [
          payer as `0x${string}`,
          amountUSDInWei,
          amountMUSDInWei,
          billType,
          customerName,
          description,
          BigInt(dueDate),
        ],
      });

      toast.success('Bill creation transaction submitted');
    } catch (err) {
      console.error('Create bill error:', err);
      toast.error('Failed to create bill');
      throw err;
    }
  };

  const payBill = async (billId: `0x${string}`) => {
    try {
      writeContract({
        address: contractAddress,
        abi: BILLS_CONTRACT_ABI,
        functionName: 'payBill',
        args: [billId],
      });

      toast.success('Bill payment transaction submitted');
    } catch (err) {
      console.error('Pay bill error:', err);
      toast.error('Failed to pay bill');
      throw err;
    }
  };

  return {
    createBill,
    payBill,
    isPending,
    isConfirming,
    isSuccess,
    error,
    transactionHash: hash,
  };
};

export const useGetBill = (billId: `0x${string}`, chainId: number = DEFAULT_CHAIN_ID) => {
  const contractAddress = BILLS_CONTRACT_ADDRESSES[chainId as keyof typeof BILLS_CONTRACT_ADDRESSES]
    || BILLS_CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID];

  return useReadContract({
    address: contractAddress,
    abi: BILLS_CONTRACT_ABI,
    functionName: 'getBill',
    args: [billId],
  });
};

export const useGetCreatorBills = (creatorAddress: `0x${string}`, chainId: number = DEFAULT_CHAIN_ID) => {
  const contractAddress = BILLS_CONTRACT_ADDRESSES[chainId as keyof typeof BILLS_CONTRACT_ADDRESSES]
    || BILLS_CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID];

  return useReadContract({
    address: contractAddress,
    abi: BILLS_CONTRACT_ABI,
    functionName: 'getCreatorBills',
    args: [creatorAddress],
  });
};

export const useGetPayerBills = (payerAddress: `0x${string}`, chainId: number = DEFAULT_CHAIN_ID) => {
  const contractAddress = BILLS_CONTRACT_ADDRESSES[chainId as keyof typeof BILLS_CONTRACT_ADDRESSES]
    || BILLS_CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID];

  return useReadContract({
    address: contractAddress,
    abi: BILLS_CONTRACT_ABI,
    functionName: 'getPayerBills',
    args: [payerAddress],
  });
};

export const useGetBillCounter = (chainId: number = DEFAULT_CHAIN_ID) => {
  const contractAddress = BILLS_CONTRACT_ADDRESSES[chainId as keyof typeof BILLS_CONTRACT_ADDRESSES]
    || BILLS_CONTRACT_ADDRESSES[DEFAULT_CHAIN_ID];

  return useReadContract({
    address: contractAddress,
    abi: BILLS_CONTRACT_ABI,
    functionName: 'billCounter',
  });
};
