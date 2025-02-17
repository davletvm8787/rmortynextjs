import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCharacters, Character } from "@/lib/api";

export const useInfiniteCharacters = (status?: string, gender?: string) => {
  return useInfiniteQuery({
    queryKey: ["characters", status, gender],
    queryFn: ({ pageParam = 1 }) => fetchCharacters(status, gender, pageParam),
    getNextPageParam: (lastPage) => (lastPage.info.next ? lastPage.info.next.split("page=")[1] : undefined),
    staleTime: 5 * 60 * 1000, // 5 dakika boyunca cache sakla
    cacheTime: 10 * 60 * 1000,
  });
};
