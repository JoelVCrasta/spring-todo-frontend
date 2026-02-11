import { create } from "zustand";
import axios from "axios";
import { Collection, NewCollection, Todo } from "@/utils/types";
import { toast } from "sonner";

interface CollectionState {
  collections: Collection[];
  loading: boolean;
  error: string | null;
  fetchCollections: () => Promise<void>;
  addCollection: (newCollection: NewCollection) => Promise<string | undefined>;
  toggleTodoState: (todoId: string) => void;
  deleteCollection: (collectionId: string) => Promise<void>;
  getTodoById: (todoId: string) => Todo | null;
  updateTodo: (updatedTodo: Todo) => Promise<void>;
  deleteTodoById: (todoId: string) => Promise<void>;
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

      set((state) => ({
        collections: [...state.collections, response.data],
      }));

      return response.data.id;
    } catch (error) {
      console.error(error);
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

  getTodoById: (todoId: string): Todo | null => {
    const { collections } = useCollectionStore.getState();

    for (const collection of collections) {
      const todo = collection.todos.find((t) => t.id === todoId);
      if (todo) {
        return todo;
      }
    }

    return null;
  },

  updateTodo: async (updatedTodo: Todo) => {
    try {
      const response = await axios.put(
        `/api/todos/${updatedTodo.id}`,
        updatedTodo,
      );

      if (response.status === 200) {
        set((state) => ({
          collections: state.collections.map((collection) => ({
            ...collection,
            todos: collection.todos.map((todo) =>
              todo.id === updatedTodo.id ? response.data : todo,
            ),
          })),
        }));

        toast.success("Todo updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update todo");
      console.error(error);
    }
  },

  deleteTodoById: async (todoId: string) => {
    try {
      const response = await axios.delete(`/api/todos/${todoId}`);

      if (response.status === 204) {
        set((state) => ({
          collections: state.collections.map((collection) => ({
            ...collection,
            todos: collection.todos.filter((todo) => todo.id !== todoId),
          })),
        }));
      }
    } catch (error) {
      toast.error("Failed to delete todo");
      console.error(error);
    }
  },
}));

export default useCollectionStore;
