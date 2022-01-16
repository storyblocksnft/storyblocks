import { useWeb3React } from "@web3-react/core";
import { injected } from "../utils/connector";
import { XCircleIcon, XIcon } from "@heroicons/react/solid";
import { GRADIENT } from "../utils/design";

export const ConnectWalletWidget = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const connectWallet = async (): Promise<boolean> => {
    if (active) return true;
    try {
      await activate(injected);
      await window.ethereum.enable();
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };

  return (
    <button
      onClick={connectWallet}
      className={
        "py-2 px-4 text-lg text-black font-light text-lg rounded-full border-2 " +
        (active ? "text-green-500 border-white" : "border-black")
      }
    >
      {active ? `Connected to ${account}` : "Connect Wallet"}
    </button>
  );
};

export const DisconnectWalletWidget = () => {
  const disconnectWallet = () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  return (
    <div>
      <XIcon
        onClick={disconnectWallet}
        className="opacity-70 hover:opacity-100 h-5 w-5 mr-2"
      />
    </div>
  );
};
