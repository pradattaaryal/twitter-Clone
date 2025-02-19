"use client";

import { useState, useEffect } from "react";
import FollowingList from "@/app/messages/FollowingList";
import ChatBox from "./ChatBox";
import { getDbUserId } from "@/actions/user.action";

export default function Page() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getDbUserId();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  return (
    <div className="flex gap-10 h-full">
      <div className="w-full">
        {userId && <ChatBox userId={userId} />}
      </div>

      <div className="w-[50%]">
        {userId && <FollowingList userId={userId} />}
      </div>
    </div>
  );
}
