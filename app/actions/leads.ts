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
  revalidatePath("/leads");
  revalidatePath("/");
}

export async function updateLeadStatus(leadId: string, status: string) {
  revalidatePath("/leads");
}

export async function updateLeadDeal(leadId: string, deal: string) {
  revalidatePath("/leads");
  revalidatePath("/");
}
