"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function getBrokerId() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  const payload = await decrypt(session);
  return payload.user.id as string;
}

export async function createLead(formData: FormData) {
  const brokerId = await getBrokerId();
  if (!brokerId) return { error: "Unauthorized" };

  const name = formData.get("name") as string;
  const contact = formData.get("contact") as string;
  const location = formData.get("location") as string;
  const address = formData.get("address") as string;
  const requirements = formData.get("requirements") as string;
  const budget = formData.get("budget") as string;

  await prisma.lead.create({
    data: {
      brokerId,
      name,
      contact,
      location,
      address,
      requirements,
      budget,
    },
  });

  revalidatePath("/leads");
  revalidatePath("/");
}

export async function updateLeadStatus(leadId: string, status: string) {
  const brokerId = await getBrokerId();
  if (!brokerId) return { error: "Unauthorized" };

  await prisma.lead.update({
    where: { id: leadId },
    data: { status },
  });

  revalidatePath("/leads");
}

export async function updateLeadDeal(leadId: string, deal: string) {
  const brokerId = await getBrokerId();
  if (!brokerId) return { error: "Unauthorized" };

  await prisma.lead.update({
    where: { id: leadId },
    data: { deal },
  });

  revalidatePath("/leads");
  revalidatePath("/");
}
