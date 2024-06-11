// "use client";

import { getData } from "@/util/http.js";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default async function Data() {
  const resData = await getData();
  //  const { toast } = useToast();
  //  toast({
  //    variant: "destructive",
  //    title: "Uh oh! Something went wrong.",
  //    description: "There was a problem with your request.",
  //    action: <ToastAction altText="Try again">Try again</ToastAction>,
  //  });

  return <div>{JSON.stringify(resData, null, 2)}</div>;
}
