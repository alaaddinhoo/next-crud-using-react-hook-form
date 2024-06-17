"use server"; // when added here on top, all functions in the file are treated as server actions

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidatePathAndRedirect(name: string, toPath: string) {
  revalidatePath(name);
  redirect(toPath);
}

export async function revalidatePathOnly(name: string) {
  revalidatePath(name);
}
