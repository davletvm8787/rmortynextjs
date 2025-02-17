"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/store/useFilterStore";

interface Props {
  hasNext: boolean;
  hasPrev: boolean;
}

export default function Pagination({ hasNext, hasPrev }: Props) {
  const { page, setPage } = useFilterStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
    setPage(newPage);
  };

  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button disabled={!hasPrev} onClick={() => updatePage(page - 1)}>
        Previous
      </Button>
      <span className="font-semibold text-lg">{page}</span>
      <Button disabled={!hasNext} onClick={() => updatePage(page + 1)}>
        Next
      </Button>
    </div>
  );
}
