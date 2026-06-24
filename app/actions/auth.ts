"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const name = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    redirect("/register?error=Missing+required+fields");
  }

  // Mock database write for Vercel demo
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ 
    user: { 
      id: "mock-user-id", 
      email: email, 
      name: name
    } 
  });

  const cookieStore = await cookies();
  cookieStore.set("session", session, { expires, httpOnly: true });

  redirect("/");
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect("/login?error=Missing+required+fields");
  }

  // Mock database check for Vercel demo
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ 
    user: { 
      id: "mock-user-id", 
      email: email, 
      name: "Demo User"
    } 
  });

  const cookieStore = await cookies();
  cookieStore.set("session", session, { expires, httpOnly: true });

  redirect("/");
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { expires: new Date(0) });
  redirect("/login");
}
