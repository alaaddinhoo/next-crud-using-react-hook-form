import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Data from "@/components/Topics/data";

export default function Home() {
  return (
    <div className="container">
      <Suspense
        // key="some-key"    // adding a dynamic key prop that changes will re-trigger a suspense
        fallback={
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-[60px] rounded-lg" />
            ))}
          </div>
        }
      >
        <Data />
      </Suspense>
    </div>
  );
}
