import { create } from "zustand";

interface TodoModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useTodoModal = create<TodoModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useTodoModal;
