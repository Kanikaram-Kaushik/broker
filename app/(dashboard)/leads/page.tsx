import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { redirect } from "next/navigation";
import LeadsClient from "./LeadsClient";

export default async function LeadsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) redirect("/login");
  
  const payload = await decrypt(session);
  const brokerId = payload.user.id as string;

  const leads: any[] = [];

  return <LeadsClient initialLeads={leads} />;
}
