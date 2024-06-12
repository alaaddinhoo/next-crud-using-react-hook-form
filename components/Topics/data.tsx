// "use client";

import { getData } from "@/util/http.js";
import TopicsForm from "./form";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default async function Data() {
  const { topics } = await getData();
  //  const { toast } = useToast();
  //  toast({
  //    variant: "destructive",
  //    title: "Uh oh! Something went wrong.",
  //    description: "There was a problem with your request.",
  //    action: <ToastAction altText="Try again">Try again</ToastAction>,
  //  });

  return (
    <div>
      {topics.map((t: any) => (
        <div className="flex place-items-center  justify-between bg-[#f7f7f7] p-4 rounded-lg mb-4 ">
          <div className="line-clamp-2">
            {t.title}
            {t.description}
          </div>

          <TopicsForm title={t.title} description={t.description} id={t._id} />
        </div>
      ))}
    </div>
  );
}
