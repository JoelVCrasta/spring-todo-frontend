import { create } from "zustand";

interface EditMenuState {
  todoId: string | null;
  isOpen: boolean;
  openMenu: (id: string) => void;
  closeMenu: () => void;
}

const useEditMenu = create<EditMenuState>((set) => ({
  todoId: null,
  isOpen: false,
  openMenu: (id) => set({ isOpen: true, todoId: id }),
  closeMenu: () => set({ isOpen: false, todoId: null }),
}));

export default useEditMenu;
