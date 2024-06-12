"use client";

import { addNewTopic } from "@/util/server-actions";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Create = () => {
  const [state, formAction] = useFormState(addNewTopic, {
    message: null,
  });

  console.log(state);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="title">Title</label>
        <Input type="text" id="title" name="title" placeholder="Title" />
      </div>
      <p>
        <label htmlFor="description">Description</label>
        <Input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
        />
      </p>
      {state.message != null && (
        <div className="bg-[#fb9d9dee] my-4  text-red-600 p-4">
          {state.message}
        </div>
      )}
      <p>
        <button type="submit">Add new topic</button>
      </p>
    </form>
  );
};

export default Create;
