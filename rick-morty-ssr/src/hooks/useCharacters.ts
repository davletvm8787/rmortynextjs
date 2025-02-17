import { useQuery } from "@tanstack/react-query";
import { fetchCharacters, Character } from "@/lib/api";

export const useCharacters = (status?: string, gender?: string, page: number = 1) => {
  return useQuery<Character[], Error>({
    queryKey: ["characters", status, gender, page],
    queryFn: () => fetchCharacters(status, gender, page).then((data) => data.results),
    staleTime: 5 * 60 * 1000, // 5 dakika cache süresi
    cacheTime: 10 * 60 * 1000, // 10 dakika boyunca cache saklama
  });
};
