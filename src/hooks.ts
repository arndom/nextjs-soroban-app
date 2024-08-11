import { useRegisteredContract } from "@soroban-react/contracts";
import { useSorobanReact } from "@soroban-react/core";
import { scValToNative, xdr } from "@stellar/stellar-sdk";
import { useCallback, useEffect, useState } from "react";

const useFetchLastMessage = () => {
  const contract = useRegisteredContract("greeting");
  const { server } = useSorobanReact();
  const errorMsg = "Failed to fetch. Try again later";

  const [lastMessage, setLastMessage] = useState("...");

  const fetchLastMessage = async () => {
    if (!server || !contract) return;

    try {
      const result = await contract.invoke({
        method: "read_title",
        args: [],
      });

      if (!result) return setLastMessage(errorMsg);

      // Value needs to be cast into a string as we fetch a ScVal which is not readable as is.
      // You can check out the scValConversion.tsx file to see how it's done
      const result_string = scValToNative(result as xdr.ScVal) as string;

      setLastMessage(result_string);
    } catch (e) {
      console.error(e);

      return setLastMessage(errorMsg);
    }
  };

  const cbFetchLastMessage = useCallback(fetchLastMessage, [contract, server]);

  useEffect(() => {
    cbFetchLastMessage()
  }, [cbFetchLastMessage]);

  return lastMessage;
};

export default useFetchLastMessage;
