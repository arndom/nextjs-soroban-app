import { useRegisteredContract } from "@soroban-react/contracts";
import Link from "next/link";
import { useMemo } from "react";

export default function ChatHeader (){
  const contract = useRegisteredContract("greeting");

  const getExplorerLink = () => {
    const baseURL = "https://stellar.expert/explorer/testnet/contract/";

    if (!contract ) return baseURL;
    const contractAddress = contract.deploymentInfo.contractAddress
    const hasAddress = Boolean(contractAddress);

    if (!hasAddress ) return baseURL;

    return baseURL + contractAddress;
  }

  const explorerLink = useMemo(getExplorerLink, [contract]);

  return (
    <>
      <div className="bg-primary absolute top-0 left-0 p-5 w-full text-center text-black rounded-t-lg">
        <p>
          Greeter - {" "}
          <Link href={explorerLink} target="_blank" className="underline underline-offset-4">
            Explore Contract
          </Link>{" "}
        </p>
      </div>

      <div className="h-[60px]" />
    </>
  );};
