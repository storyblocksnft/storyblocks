import { useWeb3React } from "@web3-react/core";
import type { NextPage } from "next";
import Header from "../components/Header";
import Story from "../components/Story";
import {
  ConnectWalletWidget,
  DisconnectWalletWidget,
} from "../components/WalletWidgets";

declare global {
  interface Window {
    ethereum: any;
  }
}

const GRADIENT = "bg-gradient-to-r from-green-200 via-green-400 to-green-500";

const Home: NextPage = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  return (
    <div className="font-serif">
      <main>
        <div className="px-4">
          <div className="px-8 py-6 lg:px-16">
            <div className="flex flex-row-reverse items-center text-sm">
              <div>
                <ConnectWalletWidget />
              </div>
              {active && <DisconnectWalletWidget />}
              <div style={{ flex: 1, justifySelf: "flex-end" }}>
                <div>
                  <h1>
                    <span className="text-2xl">Storyblocks</span>
                  </h1>
                </div>
              </div>
              <div className={`w-8 h-8 mr-3 ${GRADIENT}`} />
            </div>
          </div>

          <hr className="border-black border-1" />

          <div className="px-8 py-12 lg:px-16">
            <Header />
          </div>

          <hr className="border-black border-1" />

          <div className="px-8 py-12 lg:px-16">
            <Story />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
