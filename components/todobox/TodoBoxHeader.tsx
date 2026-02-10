"use client";

import { useState } from "react";
import useTodoModal from "@/app/hooks/useTodoModal";
import { Plus, Trash } from "lucide-react";
import Button from "@/components/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useCollectionStore from "@/app/hooks/useCollectionStore";

interface TodoBoxHeaderProps {
  title: string;
  todoCount: number;
  collectionId?: string;
}

const TodoBoxHeader = ({
  title,
  todoCount,
  collectionId,
}: TodoBoxHeaderProps) => {
  const { openModal } = useTodoModal();
  const deleteCollection = useCollectionStore(
    (state) => state.deleteCollection,
  );
  const router = useRouter();

  const handleDeleteCollection = async () => {
    if (!collectionId) {
      toast.error("No collection selected");
      return;
    }

    if (!confirm("Are you sure you want to delete this collection?")) {
      return;
    }
    await deleteCollection(collectionId);
    router.push("/dashboard?view=all");
  };

  return (
    <div className="flex justify-between p-4">
      <div className="flex items-center justify-between gap-6">
        <h2 className="text-5xl font-bold text-foreground">{title}</h2>

        <div className="flex items-center border border-accent-secondary rounded-lg px-3 py-1">
          <p className="text-3xl font-medium text-foreground">{todoCount}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          title="Add Todo"
          icon={<Plus size={18} />}
          type="outline"
          onClick={() => openModal()}
        />

        {collectionId && (
          <Button
            type="outline"
            icon={<Trash size={18} />}
            onClick={handleDeleteCollection}
          />
        )}
      </div>
    </div>
  );
};

export default TodoBoxHeader;
