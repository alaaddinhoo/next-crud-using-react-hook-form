// "use client";

import { getData } from "@/util/http.js";
import TopicsForm from "./form";

export default async function Data() {
  const { topics } = await getData();

  return (
    <div>
      {topics.map((t: any) => (
        <div className="flex place-items-center  justify-between bg-[#f7f7f7] p-4 rounded-lg mb-4 ">
          <div className="line-clamp-2">
            {t.title + ": "}
            {t.description}
          </div>

          <TopicsForm title={t.title} description={t.description} id={t._id} />
        </div>
      ))}
    </div>
  );
}
