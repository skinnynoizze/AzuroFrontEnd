import '@/styles/globals.css'
import * as ethers from 'ethers'
import Link from 'next/link'
// import { DAppProvider, Polygon, useEthers } from '@usedapp/core'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

// RainbowKit imports
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// RainbowKit config
const { chains, provider } = configureChains(
  [polygon],
  [
    alchemyProvider({ apiKey: "pVNKenYnj7n4zCEhvFCRCBiR2InmXEFI" }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Azuro',
  projectId: 'd6864d451f497f5317b6a01d79620be3',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

 
const apolloClient = new ApolloClient({
  uri: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-polygon',
  cache: new InMemoryCache(),
})

/*const config = {
 readOnlyChainId: Polygon.chainId,
 readOnlyUrls: {
 // in this tutorial we use Ankr public RPC. It's free and has it's own limits
 // in the production version with a large number of users, we do not recommend using it
 [Polygon.chainId]: new ethers.providers.StaticJsonRpcProvider('https://rpc.ankr.com/polygon'),
 },
}*/

const PageLayout = ({ children }) => (
  <div className="container pb-12">
    <div className="flex items-center justify-between pt-3 pb-16">
      <div className="text-lg font-semibold">Azuro Betting Website</div>
      <div className="flex space-x-8">
        <Link className="text-md" href="/">Events</Link>
        <Link className="text-md" href="/bets-history">Bets History</Link>
      </div>
      <ConnectButton />
    </div>
    {children}
  </div>
)

/*const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()
 
  // 'account' being undefined means that user is not connected
  const title = account ? 'Disconnect' : 'Connect'
  const action = account ? deactivate : activateBrowserWallet
 
  return (
    <button className="button" onClick={() => action()}>{title}</button>
  )
}*/


export default function App({ Component, pageProps }) {
 return (
 <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <ApolloProvider client={apolloClient}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
 )
}
