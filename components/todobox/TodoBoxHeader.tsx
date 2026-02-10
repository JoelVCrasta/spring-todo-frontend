import useTodoModal from "@/app/hooks/useTodoModal";
import { Plus } from "lucide-react";
import Button from "@/components/Button";

interface TodoBoxHeaderProps {
  title: string;
  todoCount: number;
}

const TodoBoxHeader = ({ title, todoCount }: TodoBoxHeaderProps) => {
  const { openModal } = useTodoModal();

  return (
    <div className="flex justify-between p-4">
      <div className="flex items-center justify-between gap-6">
        <h2 className="text-5xl font-bold text-foreground">{title}</h2>

        <div className="flex items-center border border-accent-secondary rounded-lg px-3 py-1">
          <p className="text-3xl font-medium text-foreground">{todoCount}</p>
        </div>
      </div>

      <Button
        title="Add Todo"
        icon={<Plus size={18} />}
        type="outline"
        onClick={() => openModal()}
      />
    </div>
  );
};

export default TodoBoxHeader;
