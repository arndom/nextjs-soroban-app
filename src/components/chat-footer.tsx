import { useRegisteredContract } from "@soroban-react/contracts";
import { useSorobanReact } from "@soroban-react/core";
import { nativeToScVal } from "@stellar/stellar-sdk";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import ChatAvatar from "./chat-avatar";
import { getShortAddress } from "@/utils";

interface Props {
  setLastMessage: Dispatch<SetStateAction<string>>
}

export default function ChatFooter(props: Props) {
  const { setLastMessage } = props;

  const { address, server } = useSorobanReact();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");

  const activeAccount = address;
  const shortAddress = getShortAddress(address);

  const contract = useRegisteredContract("greeting");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    setIsSending(true);

    if (!server) {
      console.log("Server is not setup");
      alert(
        "Server is not defined. Unabled to connect to the blockchain"
      );
      return;
    }

    try {
      const result = await contract?.invoke({
        method: "set_title",
        args: [nativeToScVal(message, { type: "string" })],
        signAndSend: true,
      });

      console.log("🚀 « result:", result);
      alert("New message published");

      setMessage("");
      setLastMessage(message);
    } catch (e) {
      console.error(e);
      alert("Error while sending tx. Try again…");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-black absolute bottom-0 left-0 px-4 w-full rounded-b-lg">
      <div className="flex items-center gap-1 my-4">
        <div className="h-[40px]">
          <ChatAvatar username={shortAddress} />
        </div>

        <input
          type="text"
          placeholder="Type message here..."
          className="input w-full rounded-3xl"
          value={message}
          onChange={handleInputChange}
        />

        <button
          className="btn btn-primary rounded-3xl"
          disabled={!activeAccount || isSending}
          onClick={handleSend}
        >
          {!isSending ? "Send" : "Sending..."}
        </button>
      </div>
    </div>
  );
}
