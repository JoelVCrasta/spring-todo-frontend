"use client";

import useTodoModal from "@/app/hooks/useTodoModal";
import MenuHeader from "./MenuHeader";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import useCollectionStore from "@/app/hooks/useCollectionStore";
import { useState } from "react";
import axios from "axios";

type FormValues = {
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  collectionId: string;
};

const AddTodoModal = () => {
  const { isOpen, closeModal } = useTodoModal();
  const collections = useCollectionStore((state) => state.collections);
  const fetchCollections = useCollectionStore(
    (state) => state.fetchCollections,
  );
  const [hasDueDate, setHasDueDate] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      completed: false,
    },
  });

  if (!isOpen) return null;

  const toggleDueDate = (enabled: boolean) => {
    setHasDueDate(enabled);

    if (!enabled) {
      setValue("dueDate", "");
    } else {
      setValue("dueDate", today);
    }
  };

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    if (data.title.trim() === "") {
      toast.error("Title is required");
      return;
    }

    if (data.collectionId === "") {
      toast.error("Please select a collection");
      return;
    }

    const newTodo = {
      title: data.title.trim(),
      description: data.description.trim(),
      dueDate: hasDueDate ? data.dueDate : null,
      completed: false,
    };

    const response = await axios.post(
      `/api/todos/${data.collectionId}`,
      newTodo,
    );
    console.log(response.data);

    await fetchCollections();

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
              className="w-full px-3 py-2 border border-highlight rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-200"
            />

            <textarea
              {...register("description")}
              placeholder="Description"
              className="w-full px-3 py-2 border border-highlight rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-200"
            />

            <div className="flex items-center w-full px-3 border border-highlight rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-200">
              <input
                type="checkbox"
                checked={hasDueDate}
                onChange={(e) => toggleDueDate(e.target.checked)}
                className="w-6 h-5 "
              />

              <input
                {...register("dueDate")}
                type="date"
                min={today}
                disabled={!hasDueDate}
                className="w-full px-1 py-2 disabled:opacity-60"
              />
            </div>

            <select
              {...register("collectionId")}
              className="w-full px-3 py-2 border border-highlight rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-200"
            >
              <option value="">Select Collection</option>
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.collectionName}
                </option>
              ))}
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
