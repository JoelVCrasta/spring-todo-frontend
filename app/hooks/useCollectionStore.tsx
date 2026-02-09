import { create } from "zustand";
import axios from "axios";
import { Collection, NewCollection } from "@/utils/types";

interface CollectionState {
  collections: Collection[];
  loading: boolean;
  error: string | null;
  fetchCollections: () => Promise<void>;
  addCollection: (newCollection: NewCollection) => Promise<void>;
}

const useCollectionStore = create<CollectionState>((set) => ({
  collections: [],
  loading: false,
  error: null,

  fetchCollections: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get("/api/collections");
      console.log("Fetched collections:", response.data);

      set({ collections: response.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch collections", loading: false });
    }
  },

  addCollection: async (newCollection: NewCollection) => {
    try {
      const response = await axios.post("/api/collections", newCollection);
      console.log("Added collection:", response.data);

      set((state) => ({
        collections: [...state.collections, response.data],
      }));
    } catch (error) {
      console.error("Failed to add collection:", error);
    }
  },
}));

export default useCollectionStore;
