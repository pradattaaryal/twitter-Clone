import Link from "next/link";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  Users,
  Crown,
  Zap,
  User,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";

export default async function SidebarNav() {
  const user = await currentUser();
  
  if (!user) return null; // Ensure user is available

  return (
    <div className="sticky top-24 flex flex-col rounded-lg justify-between p-4 bg-black text-white w-[280px]">
      <div className="space-y-2">
        {/* Navigation Items */}
        <nav className="space-y-1">
          <Link
            href="/"
            className="flex items-center gap-4 rounded-full px-4 py-3 text-xl hover:bg-gray-900"
          >
            <Home className="h-7 w-7" />
            Home
          </Link>
          <Link
            href="/explore"
            className="flex items-center gap-4 rounded-full px-4 py-3 text-xl hover:bg-gray-900"
          >
            <Search className="h-7 w-7" />
            Explore
          </Link>
          <Link
            href="/notifications"
            className="flex items-center gap-4 rounded-full px-4 py-3 text-xl hover:bg-gray-900"
          >
            <div className="relative">
              <Bell className="h-7 w-7" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs">
                1
              </span>
            </div>
            Notifications
          </Link>
          <Link
            href="/messages"
            className="flex items-center gap-4 rounded-full px-4 py-3 text-xl hover:bg-gray-900"
          >
            <Mail className="h-7 w-7" />
            Messages
          </Link>
          <Link
            href="/bookmarks"
            className="flex items-center gap-4 rounded-full px-4 py-3 text-xl hover:bg-gray-900"
          >
            <Bookmark className="h-7 w-7" />
            Bookmarks
          </Link>
          <Link
            href="/communities"
            className="flex items-center gap-4 rounded-full px-4 py-3 text-xl hover:bg-gray-900"
          >
            <Users className="h-7 w-7" />
            Communities
          </Link>
          <Link
            href="/premium"
            className="flex items-center gap-4 rounded-full px-4 py-3 text-xl hover:bg-gray-900"
          >
            <Crown className="h-7 w-7" />
            Premium
          </Link>
          <Link
            href="/verified-orgs"
            className="flex items-center gap-4 rounded-full px-4 py-3 text-xl hover:bg-gray-900"
          >
            <Zap className="h-7 w-7" />
            Verified Orgs
          </Link>
          
          <button className="flex items-center gap-4 rounded-full px-4 py-3 text-xl hover:bg-gray-900 w-full text-left">
            <MoreHorizontal className="h-7 w-7" />
            More
          </button>
        </nav>

        {/* Post Button */}
        <Button className="w-full rounded-full bg-blue-500 px-4 py-6 text-lg font-bold hover:bg-blue-600 mt-4">
          Post
        </Button>
      </div>
    </div>
  );
}
