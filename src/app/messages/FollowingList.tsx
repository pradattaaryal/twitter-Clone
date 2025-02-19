'use client';

import { useEffect, useState } from 'react';
import { getFollowingUsers } from '@/actions/user.action';
 import { useUser } from "@clerk/nextjs";
 import { Button } from "@/components/ui/button";
import Link from "next/link";

interface User {
  id: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  username: string;
  clerkId: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
}

export default function FollowingList({ userId }: { userId: string }) {
  const [following, setFollowing] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchFollowing = async () => {
      if (!user) return;

      const data = await getFollowingUsers(userId);
      const loggedInEmail = user?.emailAddresses[0]?.emailAddress;  
      const filteredFollowing = data
        .filter((u) => u.email !== loggedInEmail)
        .reduce((unique, user) => {
          if (!unique.some((u) => u.id === user.id)) {
            unique.push(user);
          }
          return unique;
        }, [] as User[]); // Ensure unique users based on `id`
    
      setFollowing(filteredFollowing);
    };

    fetchFollowing();
  }, [userId, user]);

  const openChat = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className="w-full max-w-md rounded-xl bg-black p-4">
      <h2 className="mb-4 text-xl font-bold text-white">Following</h2>
      <div className="space-y-4">
        {following.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-bold text-white">{user.username}</span>
                <span className="text-sm text-gray-500">@{user.username}</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="rounded-full bg-white px-4 font-bold text-black hover:bg-gray-200"
              onClick={() => openChat(user)}
            >
              Message
            </Button>
          </div>
        ))}
      </div>
      <Link href="#" className="mt-4 block text-sm text-blue-400 hover:text-blue-300">
        Show more
      </Link>
     </div>
  );
}
