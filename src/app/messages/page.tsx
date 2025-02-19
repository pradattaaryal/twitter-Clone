"use client";
import { ReactNode, useState, useEffect } from "react";
import FollowingList from "@/app/messages/FollowingList";
import ChatBox from "./ChatBox";

interface FollowingAndChatLayoutProps {
  children: ReactNode;
  userId: string;
}

const FollowingAndChatLayout = ({
  children,
  userId,
}: FollowingAndChatLayoutProps) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const openChat = (receiverId: string) => {
    setSelectedUser(receiverId);
  };

  return (
    <div  className="   flex  gap-10  h-full ">
      <div className="w-full">
        <ChatBox  userId={userId}  />
      </div>

      <div className="  w-[50%] ">
        <FollowingList userId={userId} />
      </div>

     </div>
  );
};

export default FollowingAndChatLayout;
