import { useEffect, useRef } from "react";
import { useInfiniteCharacters } from "@/hooks/useCharacters";
import { useFilterStore } from "@/store/useFilterStore";
import Filters from "@/components/Filters";

export default function Home() {
  const { status, gender } = useFilterStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteCharacters(status, gender);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Rick and Morty Characters</h1>

      <Filters />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.pages.map((group) =>
          group.results.map((char, index) => (
            <div
              key={char.id}
              ref={index === group.results.length - 1 ? lastElementRef : null}
              className="border rounded-lg p-4 shadow-md"
            >
              <img src={char.image} alt={char.name} className="w-full h-auto rounded-lg" />
              <h2 className="text-xl font-semibold mt-2">{char.name}</h2>
              <p className="text-gray-600">{char.status} - {char.gender}</p>
            </div>
          ))
        )}
      </div>

      {isFetchingNextPage && <p className="text-center mt-6">Loading more...</p>}
    </main>
  );
}
