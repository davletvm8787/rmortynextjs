"use client";

import { useCharacters } from "@/hooks/useCharacters";
import { useFilterStore } from "@/store/useFilterStore";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";

export default function Home() {
  const { status, gender, page } = useFilterStore();
  const { data: characters, isLoading, isError } = useCharacters(status, gender, page);

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load data.</p>;

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">Rick and Morty Characters</h1>

      <Filters />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters?.map((char) => (
          <div key={char.id} className="border rounded-lg p-4 shadow-md">
            <img src={char.image} alt={char.name} className="w-full h-auto rounded-lg" />
            <h2 className="text-xl font-semibold mt-2">{char.name}</h2>
            <p className="text-gray-600">{char.status} - {char.gender}</p>
          </div>
        ))}
      </div>

      <Pagination hasNext={characters.length >= 20} hasPrev={page > 1} />
    </main>
  );
}
