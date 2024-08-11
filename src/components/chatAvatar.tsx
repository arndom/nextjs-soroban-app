import Image from "next/image";

interface Props {
  username?: string
}

export default function ChatAvatar(props: Props) {

  return (
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <Image
          alt="Tailwind CSS chat bubble component"
          width={200}
          height={200}
          src={`https://robohash.org/${
            Boolean(props.username) ? props.username : "anon"
          }`}
          className="bg-neutral"
        />
      </div>
    </div>
  );
}
