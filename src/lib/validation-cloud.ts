/**
 * Validation Cloud Mezo Network Integration
 * 
 * This utility provides functions to interact with the Mezo Network
 * via Validation Cloud's RPC endpoint.
 */

const VALIDATION_CLOUD_RPC_URL = 
  'https://mainnet.mezo.validationcloud.io/v1/bAhV9XJtsdARW9zbkmH_F0sUiVtbDlLry6plga8Xw1M';

interface JsonRpcRequest {
  jsonrpc: '2.0';
  id: number;
  method: string;
  params: unknown[];
}

interface JsonRpcResponse<T = unknown> {
  jsonrpc: '2.0';
  id: number;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

/**
 * Makes a JSON-RPC call to the Validation Cloud Mezo Network endpoint
 */
async function makeRpcCall<T = unknown>(
  method: string,
  params: unknown[] = []
): Promise<T> {
  const request: JsonRpcRequest = {
    jsonrpc: '2.0',
    id: Date.now(),
    method,
    params,
  };

  try {
    const response = await fetch(VALIDATION_CLOUD_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: JsonRpcResponse<T> = await response.json();

    if (data.error) {
      throw new Error(`RPC error: ${data.error.message}`);
    }

    if (data.result === undefined) {
      throw new Error('No result in RPC response');
    }

    return data.result;
  } catch (error) {
    console.error('Validation Cloud RPC call failed:', error);
    throw error;
  }
}

/**
 * Gets the latest block height from the Mezo Network
 * @returns The block height as a number
 */
export async function getLatestBlockHeight(): Promise<number> {
  try {
    const result = await makeRpcCall<string>('eth_blockNumber', []);
    const blockHeight = parseInt(result, 16);
    console.log('Latest Block Height:', blockHeight);
    return blockHeight;
  } catch (error) {
    console.error('Error fetching block height:', error);
    throw error;
  }
}

/**
 * Gets the current gas price from the Mezo Network
 * @returns The gas price in wei as a bigint
 */
export async function getGasPrice(): Promise<bigint> {
  try {
    const result = await makeRpcCall<string>('eth_gasPrice', []);
    return BigInt(result);
  } catch (error) {
    console.error('Error fetching gas price:', error);
    throw error;
  }
}

/**
 * Gets the chain ID of the Mezo Network
 * @returns The chain ID as a number
 */
export async function getChainId(): Promise<number> {
  try {
    const result = await makeRpcCall<string>('eth_chainId', []);
    return parseInt(result, 16);
  } catch (error) {
    console.error('Error fetching chain ID:', error);
    throw error;
  }
}

/**
 * Gets a block by its number
 * @param blockNumber - The block number (hex string or "latest")
 * @param includeTransactions - Whether to include full transaction objects
 * @returns The block data
 */
export async function getBlockByNumber(
  blockNumber: string | number = 'latest',
  includeTransactions = false
): Promise<unknown> {
  try {
    const blockParam = typeof blockNumber === 'number' 
      ? `0x${blockNumber.toString(16)}` 
      : blockNumber;
    
    return await makeRpcCall('eth_getBlockByNumber', [blockParam, includeTransactions]);
  } catch (error) {
    console.error('Error fetching block:', error);
    throw error;
  }
}

/**
 * Gets the balance of an address
 * @param address - The address to check
 * @param blockNumber - The block number (hex string or "latest")
 * @returns The balance in wei as a bigint
 */
export async function getBalance(
  address: string,
  blockNumber: string = 'latest'
): Promise<bigint> {
  try {
    const result = await makeRpcCall<string>('eth_getBalance', [address, blockNumber]);
    return BigInt(result);
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}

/**
 * Gets the transaction count (nonce) for an address
 * @param address - The address to check
 * @param blockNumber - The block number (hex string or "latest")
 * @returns The transaction count as a number
 */
export async function getTransactionCount(
  address: string,
  blockNumber: string = 'latest'
): Promise<number> {
  try {
    const result = await makeRpcCall<string>('eth_getTransactionCount', [address, blockNumber]);
    return parseInt(result, 16);
  } catch (error) {
    console.error('Error fetching transaction count:', error);
    throw error;
  }
}

export default {
  getLatestBlockHeight,
  getGasPrice,
  getChainId,
  getBlockByNumber,
  getBalance,
  getTransactionCount,
};
