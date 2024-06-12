"use server"; // when added here on top, all functions in the file are treated as server actions

import { createNewTopic, deleteTopicByID } from "@/util/http";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

export async function addNewTopic(prevState, formData) {
  const topic = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  let message = {};

  if (isInvalidText(topic.title)) {
    return {
      message: "Invalid input.",
    };
  }

  if (isInvalidText(topic.description)) {
    return {
      message: "Invalid input.",
    };
  }

  console.log(topic);

  createNewTopic(topic);
  revalidatePath("/");
  redirect("/");
}

export async function deleteTopic(id) {
  console.log(id);
  await deleteTopicByID(id);
  revalidatePath("/");
}
