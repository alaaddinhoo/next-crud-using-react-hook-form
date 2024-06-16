"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
// import { lineSpinner, tailspin } from "ldrs";
import { editTopicSchema } from "@/util/validation";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { revalidatePathOnly } from "@/util/server-actions";
import { deleteTopicByID, editTopicByID } from "@/util/http";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";

interface TopicsProps {
  title: string;
  description: string;
  id: string;
}
interface EditFormValues {
  newTitle: string;
  newDescription: string;
}

export default function TopicsForm({ title, description, id }: TopicsProps) {
  // const router = useRouter();

  // tailspin.register();
  const { toast } = useToast();
  const [open, setOpen] = useState(false); // for the dialog
  const {
    // register: deleteRegister,  // dont need this since id is fixed
    handleSubmit: handleDeleteSubmit,
    formState: { isSubmitting: isDeleting },
  } = useForm<any>({});

  const {
    register: editRegister,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors, isSubmitting: isEditing },
  } = useForm<EditFormValues>({ resolver: zodResolver(editTopicSchema) });

  const handleDelete = async (data: any) => {
    try {
      // Perform HTTP request to create a new topic
      const response = await deleteTopicByID({ id });

      await revalidatePathOnly("/");

      toast({
        title: "Success",
        description: response.message,
      });

      // router.refresh();
    } catch (error: any) {
      // Handle error
      console.error("Error submitting form:", error);

      toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleEdit = async (data: z.infer<typeof editTopicSchema>) => {
    try {
      const response = await editTopicByID({ ...data, id });

      await revalidatePathOnly("/");

      toast({
        title: "Success",
        description: response.message,
      });

      setOpen(false);

      // router.refresh();
    } catch (error: any) {
      console.error("Error submitting form:", error);

      toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="flex gap-4 place-items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Edit</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleEditSubmit(handleEdit)}>
            <DialogHeader>
              <DialogTitle>Edit Topic</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  {...editRegister("newTitle")}
                  defaultValue={title}
                  className="col-span-3"
                />
              </div>
              {editErrors.newTitle && (
                <p className="text-red-600">{editErrors.newTitle.message}</p>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  {...editRegister("newDescription")}
                  defaultValue={description}
                  className="col-span-3"
                />
              </div>
              {editErrors.newDescription && (
                <p className="text-red-600">
                  {editErrors.newDescription.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button className="w-auto">
                {isEditing ? (
                  <div className="flex gap-2">
                    {/* <l-tailspin
                      size="20"
                      stroke="2"
                      speed="1"
                      color="white"
                    ></l-tailspin> */}
                    <div>Saving changes</div>
                  </div>
                ) : (
                  "Edit"
                )}
              </Button>
            </DialogFooter>
            <Input name="id" type="hidden" value={id}></Input>
          </form>
        </DialogContent>
      </Dialog>

      <form onSubmit={handleDeleteSubmit(handleDelete)}>
        <Button variant={"destructive"} disabled={isDeleting}>
          {isDeleting ? "Deleting" : "Delete"}
        </Button>
        {/* <Input type="hidden" value={id} {...deleteRegister("id")}></Input> */}
      </form>
    </div>
  );
}
