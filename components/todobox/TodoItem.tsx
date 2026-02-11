import { Calendar, ChevronRight } from "lucide-react";
import useCollectionStore from "@/app/hooks/useCollectionStore";
import { colorMap } from "@/utils/colorMap";
import axios from "axios";
import { toast } from "sonner";
import useEditMenu from "@/app/hooks/useEditMenu";

interface TodoItemProps {
  id: string;
  title: string;
  dueDate?: string;
  isCompleted: boolean;
  collectionId: string;
  isCollectionView: boolean;
}

const TodoItem = ({
  id,
  title,
  dueDate,
  isCompleted,
  collectionId,
  isCollectionView,
}: TodoItemProps) => {
  const collection = useCollectionStore((state) =>
    state.collections.find((col) => col.id === collectionId),
  );
  const toggleTodoState = useCollectionStore((state) => state.toggleTodoState);
  const { isOpen, openMenu } = useEditMenu();

  const collectionColor = collection ? collection.collectionColor : "gray";
  const color = colorMap[collectionColor];

  const formattedDueDate = dueDate
    ? new Date(dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const handleCheckboxToggle = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.stopPropagation();

    toggleTodoState(id);

    try {
      await axios.put(`/api/todos/${id}/toggle`, {
        completed: !isCompleted,
      });
    } catch (error) {
      toggleTodoState(id);
      toast.error("Failed to toggle todo");
      console.error(error);
    }
  };

  return (
    <div
      onClick={() => openMenu(id)}
      className={`px-4 py-3 flex items-center rounded-md hover:bg-accent-secondary cursor-pointer transition-colors duration-300 `}
    >
      <div>
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxToggle}
            className="w-6 h-5"
          />

          <p
            className={`transition-all duration-300 ${isCompleted ? "line-through text-neutral-400" : "text-foreground"}`}
          >
            {title}
          </p>
        </div>

        <div className="mt-2 ml-10 flex items-center gap-1 text-xs text-neutral-400">
          {!isCollectionView && (
            <>
              <div className={`w-3 h-3 mr-0.5 rounded-sm shrink-0 ${color}`} />
              <span>{collection?.collectionName}</span>

              <div className="h-4 w-px bg-neutral-400 mx-3" />
            </>
          )}

          <Calendar size={16} />
          <span>{dueDate ? formattedDueDate : "No due date"}</span>
        </div>
      </div>

      <ChevronRight className="ml-auto text-neutral-400" />
    </div>
  );
};

export default TodoItem;
