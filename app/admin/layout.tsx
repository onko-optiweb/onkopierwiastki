import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "@/src/components/admin/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <AdminShell userName={session.user?.name || session.user?.email}>
      {children}
    </AdminShell>
  );
}
