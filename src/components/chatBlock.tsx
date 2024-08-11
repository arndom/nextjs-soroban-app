"use client";

import ChatAvatar from "./ChatAvatar";

interface Props {
  username: string;
  msg: string;
}
export default function ChatBlock(props: Props) {
  const { username, msg } = props;

  return (
    <>
      <ChatAvatar {...{ username }} />
      <div className="chat-bubble">{msg}</div>
    </>
  );
};
