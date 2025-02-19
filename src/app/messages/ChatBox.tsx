import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Message from "./Message";
import { pusherClient } from "@/lib/pusher";

const ChatBox = ({ userId }: { userId: string }) => {
  const [messages, setMessages] = useState<{ id: string; message: string; senderId: string }[]>([]);
  const [message, setMessage] = useState<string>("");

  // Fetch existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch("/api/messages"); // Create an API route for messages
      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();

    // Pusher real-time updates
    const channel = pusherClient.subscribe("chat-app");
    channel.bind("upcoming-message", (data: { id: string; message: string; senderId: string }) => {
      setMessages((prev) => {
        // Check if the message already exists to avoid duplicates
        if (!prev.some(msg => msg.id === data.id)) {
          return [...prev, data].slice(-50); // Keep only the latest 50 messages
        }
        return prev;
      });
    });

    return () => {
      pusherClient.unsubscribe("chat-app");
    };
  }, []);

  const onSendMessageHandler = async () => {
    if (!message.trim()) return;
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    setMessage(""); // Clear the input after sending
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="size-[500px] bg-black rounded-md text-white shadow-lg scrollbar-none scrollbar-hide   flex flex-col justify-between">
        <h1 className="p-4 bg-black border">User Profile</h1>
        <div className="w-full h-full overflow-y-auto p-4 flex flex-col scrollbar-none scrollbar-hide   gap-y-4">
          {!messages.length ? (
            <div className="text-center text-white">No messages yet</div>
          ) : (
            messages.map((msg) => <Message key={msg.id} message={msg.message} />)
          )}
        </div>
        <div className="flex items-center gap-x-2 bg-black border h-[60px]">
        <Input
  placeholder="type your message here ..."
  value={message}
  className="w-full flex-1 bg-transparent h-full text-white border-none rounded-none"
  onChange={(e) => setMessage(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      onSendMessageHandler(); // Trigger send message on Enter key press
    }
  }}
/>
          <Button onClick={onSendMessageHandler} className="rounded-none h-full">
            <Send size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;