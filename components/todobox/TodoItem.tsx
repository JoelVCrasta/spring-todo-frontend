import { useState } from "react";
import { Calendar } from "lucide-react";
import useCollectionStore from "@/app/hooks/useCollectionStore";
import { colorMap } from "@/utils/colorMap";

interface TodoItemProps {
  title: string;
  dueDate?: string;
  isCompleted: boolean;
  collectionId: string;
  isCollectionView: boolean;
}

const TodoItem = ({
  title,
  dueDate,
  isCompleted,
  collectionId,
  isCollectionView,
}: TodoItemProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const collection = useCollectionStore((state) => state.collections).find(
    (col) => col.id === collectionId,
  );

  const collectionColor = collection ? collection.collectionColor : "gray";
  const color = colorMap[collectionColor];

  const toggleShowDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const handleCheckboxToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    const 
  };

  return (
    <div
      className={`px-4 py-3 rounded-md hover:bg-accent-secondary cursor-pointer transition-colors duration-300 ${showDetails ? "bg-accent-secondary" : ""}`}
      onClick={toggleShowDetails}
    >
      <div className="">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxToggle}
            className="w-6 h-5 "
          />

          <p
            className={`text-lg font-semibold ${isCompleted ? "line-through text" : ""}`}
          >
            {title}
          </p>
        </div>

        <div className="mt-2 ml-10 flex items-center gap-1 text-sm text-neutral-400">
          {!isCollectionView && (
            <>
              <div className={`w-3 h-3 mr-1 rounded-sm shrink-0 ${color}`} />
              <span>{collection?.collectionName}</span>

              <div className="h-5 w-px bg-neutral-400 mx-3" />
            </>
          )}

          <Calendar size={16} />
          <span>{dueDate ? dueDate : "No due date"}</span>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
