// "use client";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Data from "@/components/restaurants/data";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <>
      <Suspense
        // key="some-key"    // adding a dynamic key prop that changes will re-trigger a suspense
        fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}
      >
        <Data />
      </Suspense>
    </>
  );
}
