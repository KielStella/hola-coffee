import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminLogsPage() {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: true },
  });

  return (
    <div>
      <h1 className="text-2xl text-hola-brown">Activity Log</h1>
      <p className="mt-1 text-sm text-hola-brown-soft">A running record of admin, staff, and customer activity.</p>

      <div className="mt-6 overflow-hidden rounded-hola-lg bg-white shadow-sm">
        <ul>
          {logs.map((log) => (
            <li key={log.id} className="border-b border-hola-beige px-5 py-3 text-sm last:border-none">
              <p className="text-hola-brown">{log.action}</p>
              <p className="text-xs text-hola-brown-soft">
                {log.user?.name ?? "System"} · {new Date(log.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
          {logs.length === 0 && (
            <li className="px-5 py-8 text-center text-sm text-hola-brown-soft">No activity recorded yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
