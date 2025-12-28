import { create } from "zustand";


export const useGrantStore = create((set) => ({
  selectedGrant: null,
  setGrant: (grant) => set({ selectedGrant: grant }),
}));