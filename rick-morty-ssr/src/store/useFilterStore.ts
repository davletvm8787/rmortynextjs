import { create } from "zustand";

interface FilterState {
  status: string;
  gender: string;
  page: number;
  setStatus: (status: string) => void;
  setGender: (gender: string) => void;
  setPage: (page: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  status: "",
  gender: "",
  page: 1,
  setStatus: (status) => set({ status, page: 1 }), // Filtre değiş sayfa sıfır
  setGender: (gender) => set({ gender, page: 1 }),
  setPage: (page) => set({ page }),
}));
