import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

// WalletConnect Project ID
const projectId = '696956c426d467cb2aed00d4b0a543b2';

export const config = getDefaultConfig({
  appName: 'Mezo Sync',
  projectId,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: false,
});
