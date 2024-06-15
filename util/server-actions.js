"use server"; // when added here on top, all functions in the file are treated as server actions

import { createNewTopic, deleteTopicByID, editTopicByID } from "@/util/http";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidatePathAndRedirect(name, toPath) {
  revalidatePath(name);
  redirect(toPath);
}

export async function revalidatePathOnly(name) {
  revalidatePath(name);
}
