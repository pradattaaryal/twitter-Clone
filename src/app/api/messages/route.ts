import  prisma  from "@/lib/prisma";
import { sendMessage } from "@/actions/message.action";

export async function GET() {
  const messages = await prisma.chat.findMany({
    orderBy: { createdAt: "desc" },
    take: 50, // Fetch only the latest 50 messages
  });
  return Response.json(messages.reverse()); // Reverse to maintain chronological order
}

export async function POST(req: Request) {
  const { message } = await req.json();
  await sendMessage(message);
  return Response.json({ success: true });
}