import { redirect } from "next/navigation";
import { auth } from "@/auth";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return (
    <DashboardShell title="HOLA Admin" variant="admin" userName={session.user.name}>
      {children}
    </DashboardShell>
  );
}
