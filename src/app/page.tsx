"use client";

import ChatHeader from "@/components/ChatHeader";
import ConnectWallet from "../components/ConnectWallet";
import ChainSelect from "@/components/ChainSelect";
import ChatFooter from "@/components/ChatFooter";
import ChatBlock from "../components/ChatBlock";
import useFetchLastMessage from "@/hooks";
import { useEffect, useState } from "react";

export default function Home() {
  const getLastMessage = useFetchLastMessage();
  const [lastMessage, setLastMessage] = useState(getLastMessage);

  useEffect(() => {
    setLastMessage(getLastMessage);
  }, [getLastMessage]);

  return (
    <main className="min-h-[100vh] flex flex-col items-center gap-4 justify-center">
      <div className="flex gap-2 justify-center">
        <ChainSelect />
        <ConnectWallet />
      </div>

      <div className="relative w-80 md:w-1/2 max-w-lg">
        <ChatHeader />

        <div className="bg-black px-4 pb-4 max-h-[400px] min-h-[200px] overflow-y-auto chat-container rounded-b-lg">
          <div className="chat-block">
            <div className="chat chat-end">
              <div className="chat-header mb-1">Last msg sent via contract</div>
              <ChatBlock username="Anon" msg={lastMessage} />
            </div>
          </div>

          <ChatFooter {...{ setLastMessage }} />
        </div>
      </div>
    </main>
  );
}
