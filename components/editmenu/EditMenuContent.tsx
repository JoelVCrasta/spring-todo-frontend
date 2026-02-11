"use client";

import useEditMenu from "@/app/hooks/useEditMenu";
import useCollectionStore from "@/app/hooks/useCollectionStore";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "../Button";
import { toast, Toaster } from "sonner";

const EditMenuContent = () => {
  const { todoId } = useEditMenu();
  const getTodoById = useCollectionStore((state) => state.getTodoById);
  const collections = useCollectionStore((state) => state.collections);
  const deleteTodoById = useCollectionStore((state) => state.deleteTodoById);
  const updateTodo = useCollectionStore((state) => state.updateTodo);
  const todo = getTodoById(todoId || "");

  const today = new Date().toISOString().split("T")[0];

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: todo?.title || "",
      description: todo?.description || "",
      dueDate: todo?.dueDate || "",
      collectionId: todo?.collectionId || "",
    },
  });

  useEffect(() => {
    if (todo) {
      reset({
        title: todo.title,
        description: todo.description || "",
        dueDate: todo.dueDate || "",
        collectionId: todo.collectionId,
      });
    }
  }, [todo, reset]);

  const handleDeleteTodo = async () => {
    if (!todo) {
      toast.error("Todo not found");
      return;
    }

    if (!confirm("Are you sure you want to delete this todo?")) {
      return;
    }

    await deleteTodoById(todo.id);
  };

  const onSubmit = async (data: FieldValues) => {
    if (data.title.trim() === "") {
      toast.error("Title is required");
      return;
    }

    if (!todo) {
      toast.error("Todo not found");
      return;
    }

    const updatedTodo = {
      ...todo,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      collectionId: data.collectionId,
    };

    await updateTodo(updatedTodo);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col min-h-0 mt-4"
    >
      <Toaster />
      <div className="space-y-4 text-foreground text-sm overflow-y-auto flex-1 min-h-0">
        <input
          {...register("title")}
          type="text"
          placeholder="Title"
          className="w-full p-3 border border-highlight rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-200"
        />

        <textarea
          {...register("description")}
          placeholder="Description"
          className="w-full p-3 min-h-36 max-h-52 border border-highlight rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-200"
        />

        <div className="flex items-center h-11.5">
          <p className="w-32">Collection</p>
          <select
            {...register("collectionId")}
            className="h-full w-52 p-3 border border-highlight rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-200"
          >
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.collectionName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center h-11.5">
          <p className="w-32">Due Date</p>

          <input
            {...register("dueDate")}
            type="date"
            min={today}
            className="w-52 p-3 border border-highlight rounded-md focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-colors duration-200"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          title="Delete"
          type="button"
          variant="outline"
          wide={true}
          onClick={handleDeleteTodo}
        />

        <Button
          title="Save Changes"
          type="submit"
          variant="solid-2"
          wide={true}
          onClick={() => {}}
        />
      </div>
    </form>
  );
};

export default EditMenuContent;
