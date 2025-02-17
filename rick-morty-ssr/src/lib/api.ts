export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
  }
  
  interface APIResponse {
    results: Character[];
    info: {
      next: string | null;
      prev: string | null;
    };
  }
  
  export const fetchCharacters = async (status?: string, gender?: string, page: number = 1) => {
    const url = new URL("https://rickandmortyapi.com/api/character");
    
    url.searchParams.append("page", page.toString());
    if (status) url.searchParams.append("status", status);
    if (gender) url.searchParams.append("gender", gender);
  
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("Failed to fetch characters");
  
    const data: APIResponse = await res.json();
    return data;
  };
  