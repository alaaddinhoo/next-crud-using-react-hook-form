"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNewTopic } from "@/util/http";
import { topicSchema } from "@/util/validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { revalidatePathAndRedirect } from "@/util/server-actions";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
// import { useRouter } from "next/navigation";

interface FormValues {
  title: string;
  description: string;
}

const Create = () => {
  // const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // the errors here refers to validation errors
  } = useForm<FormValues>({
    resolver: zodResolver(topicSchema), // performs client-side validation using zod
  });

  const [serverMessage, setServerMessage] = useState<{
    message: string;
    isSuccess: boolean;
  } | null>(null);

  const onSubmit = async (data: z.infer<typeof topicSchema>) => {
    try {
      // Perform HTTP request to create a new topic
      const response = await createNewTopic(data);

      // Handle success
      setServerMessage({ message: response.message, isSuccess: true }); // Assuming your API returns a message upon success

      toast({
        title: response.message,
        description: "You will now be redirected to the homepage",
      });

      // router.push("/");
      await revalidatePathAndRedirect("/", "/");
    } catch (error: any) {
      // Handle error
      console.error("Error submitting form:", error);
      setServerMessage({
        message: error.message,
        isSuccess: false,
      });

      toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <label htmlFor="title">Title</label>
        <Input
          type="text"
          id="title"
          {...register("title")}
          placeholder="Title"
        />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Input
          type="text"
          id="description"
          {...register("description")}
          placeholder="Description"
        />
        {errors.description && (
          <p className="text-red-600">{errors.description.message}</p>
        )}
      </div>
      {serverMessage && !serverMessage.isSuccess && (
        <div className="my-4 p-4 bg-red-100 text-red-800">
          {serverMessage.message}
        </div>
      )}
      <div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Add new topic"}
        </Button>
      </div>
    </form>
  );
};

export default Create;
