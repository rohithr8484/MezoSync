import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { mezoTestnet, mezoMainnet } from '@mezo-org/passport';

// WalletConnect Project ID
const projectId = '696956c426d467cb2aed00d4b0a543b2';

export const config = getDefaultConfig({
  appName: 'Mezo Sync',
  projectId,
  chains: [mainnet, sepolia, mezoTestnet, mezoMainnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [mezoTestnet.id]: http(),
    [mezoMainnet.id]: http(),
  },
  ssr: false,
});
