import { create } from "zustand";
import axios from "axios";
import { Collection, NewCollection } from "@/utils/types";
import { toast } from "sonner";

interface CollectionState {
  collections: Collection[];
  loading: boolean;
  error: string | null;
  fetchCollections: () => Promise<void>;
  addCollection: (newCollection: NewCollection) => Promise<string | undefined>;
  toggleTodoState: (todoId: string) => void;
  deleteCollection: (collectionId: string) => Promise<void>;
}

const useCollectionStore = create<CollectionState>((set) => ({
  collections: [],
  loading: false,
  error: null,

  toggleTodoState: (todoId: string) => {
    set((state) => ({
      collections: state.collections.map((collection) => ({
        ...collection,
        todos: collection.todos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
        ),
      })),
    }));
  },

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

  addCollection: async (
    newCollection: NewCollection,
  ): Promise<string | undefined> => {
    try {
      const response = await axios.post("/api/collections", newCollection);
      console.log("Added collection:", response.data);

      set((state) => ({
        collections: [...state.collections, response.data],
      }));

      return response.data.id;
    } catch (error) {
      console.error("Failed to add collection:", error);
    }
  },

  deleteCollection: async (collectionId: string) => {
    try {
      const response = await axios.delete(`/api/collections/${collectionId}`);
      if (response.status === 204) {
        set((state) => ({
          collections: state.collections.filter(
            (collection) => collection.id !== collectionId,
          ),
        }));

        toast.success("Collection deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete collection");
      console.error(error);
    }
  },
}));

export default useCollectionStore;
