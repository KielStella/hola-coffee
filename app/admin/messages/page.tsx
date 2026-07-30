import { prisma } from "@/lib/prisma";
import MessageInbox from "@/components/dashboard/MessageInbox";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Contact Messages</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">Inquiries, feedback, and partnership requests.</p>
      <div className="mt-6">
        <MessageInbox messages={messages} canDelete />
      </div>
    </div>
  );
}
