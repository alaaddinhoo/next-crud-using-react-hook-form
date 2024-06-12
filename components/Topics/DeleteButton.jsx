"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

const DeleteButton = () => {
  const status = useFormStatus();

  return (
    <div>
      <Button variant={"destructive"} disabled={status.pending}>
        {status.pending ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};

export default DeleteButton;
