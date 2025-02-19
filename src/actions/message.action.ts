"use server";

import { pusherServer } from "@/lib/pusher";
import  prisma  from "@/lib/prisma"; // Ensure you have Prisma setup
import { getDbUserId } from "@/actions/user.action";

export const sendMessage = async (message: string) => {
  try {
    // Save message in database
    const senderId = await getDbUserId();
    if (!senderId) throw new Error("User ID is required");
    const savedMessage = await prisma.chat.create({
      data: {
        senderId:senderId , // Replace with actual user ID (e.g., from session)
        message,
      },
    });

    // Broadcast message with Pusher
    pusherServer.trigger("chat-app", "upcoming-message", {
      id: savedMessage.id,
      message: savedMessage.message,
      senderId: savedMessage.senderId,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};