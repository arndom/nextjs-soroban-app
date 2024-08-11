"use client";

import { getShortAddress } from "@/utils";
import { useSorobanReact } from "@soroban-react/core";

export default function ConnectWallet () {
  const sorobanContext = useSorobanReact();

  const { address, disconnect, setActiveConnectorAndConnect, setActiveChain } = sorobanContext;
  const activeAccount = address;
  const shortAddress = getShortAddress(activeAccount);

  const browserWallets = sorobanContext.connectors;

  const handleConnect = () => {
    if (!setActiveConnectorAndConnect) return;
    setActiveConnectorAndConnect(browserWallets[0]);
  }

  const handleDisconnect = async () => {
    console.log("Disconnecting");
    await disconnect();
  }

  if (activeAccount) {
    return (
        <button
          className="bg-primary p-4 rounded-2xl text-black"
          onClick={handleDisconnect}
        >
          Account: <span className="font-bold">{shortAddress}</span>{" "}
        </button>
    );
  }

  return (
    <div>
      <button className="btn btn-accent" onClick={handleConnect}>
        Connect Wallet
      </button>
      <p className="text-[0.6rem] text-center mt-1">Freighter only</p>
    </div>
  );
};
