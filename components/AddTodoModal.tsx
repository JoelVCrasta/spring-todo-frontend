"use client";

import useTodoModal from "@/app/hooks/useTodoModal";
import MenuHeader from "./MenuHeader";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

type FormValues = {
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  collectionId: string;
};

const AddTodoModal = () => {
  const { isOpen, closeModal } = useTodoModal();

  const today = new Date().toISOString().split("T")[0];
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: today,
      completed: false,
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data: FormValues) => {
    console.log(data);

    reset();
    closeModal();
    toast.success("Todo added successfully!");
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-background/50 backdrop-blur-xs z-50">
      <Toaster />
      <div className="bg-accent-primary rounded-lg p-6 w-lg">
        <MenuHeader title="Add Todo" icon={<X />} onToggle={closeModal} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="space-y-4 text-foreground text-sm">
            <input
              {...register("title")}
              type="text"
              placeholder="Title"
              className="w-full px-3 py-2 border border-accent-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-200"
            />

            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full px-3 py-2 border border-accent-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-200"
            />

            <input
              {...register("dueDate")}
              type="date"
              min={today}
              className="w-full px-3 py-2 border border-accent-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-200"
            />

            <select
              {...register("collectionId")}
              className="w-full px-3 py-2 border border-accent-light rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-200"
            >
              <option value="">Collection</option>
              <option value="1">Work</option>
              <option value="2">Personal</option>
              <option value="3">Shopping</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-accent-secondary text-foreground font-medium px-4 py-2 rounded-md hover:bg-accent-secondary/80 transition-colors duration-200"
          >
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
