import { z } from "zod";

// Define your schema using Zod
export const topicSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
});

export const editTopicSchema = z.object({
  newTitle: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long"),
  newDescription: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description is too long"),
});
