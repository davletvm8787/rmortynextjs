import { create } from "zustand";
import { Character } from "@/lib/api";

interface CharacterState {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
  characters: [],
  setCharacters: (characters) => set({ characters }),
}));
