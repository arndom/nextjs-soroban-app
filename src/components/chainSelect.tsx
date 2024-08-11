import { useSorobanReact } from "@soroban-react/core";
import { ChangeEvent } from "react";

export default function ChainSelect() {
  const sorobanContext = useSorobanReact();
  const { activeChain, setActiveChain, chains: supportedChains } = sorobanContext;

  const handleChainChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    const chain = supportedChains.find((chain) => chain.name === option);

    if (!chain) return;

    setActiveChain && setActiveChain(chain);
    alert(`Active chain changed to ${chain.name}`);
  };

  return (
    <select className="select select-primary" value={activeChain?.name} onChange={handleChainChange}>
      {supportedChains.map((chain) => (
        <option
          key={chain.name}
        >
          {chain.name}
        </option>
      ))}
    </select>
  );
}
