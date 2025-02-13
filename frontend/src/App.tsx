import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Claim from "./pages/Claim";
import { http, createConfig } from "wagmi";
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia

} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query"

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

   

function App() {
  const queryClient = new QueryClient()
  return (
    <div className="">
       <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/claim-airdrop" element={<Claim />} />
          </Routes>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
     
    </div>
  );
}

export default App;
