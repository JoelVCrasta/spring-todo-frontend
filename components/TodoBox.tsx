"use client";

import { Plus } from "lucide-react";
import Button from "./Button";
import useTodoModal from "@/app/hooks/useTodoModal";

interface TodoBoxProps {}

interface TodoBoxHeaderProps {
  title: string;
  todoCount: number;
}

interface TodoItemProps {
  title: string;
  description?: string;
  dueDate?: Date;
  isCompleted: boolean;
}

const TodoBox = ({}) => {
  return (
    <div className="w-full px-4">
      <TodoBoxHeader title="Today" todoCount={5} />
    </div>
  );
};

const TodoBoxHeader = ({ title, todoCount }: TodoBoxHeaderProps) => {
  const { openModal } = useTodoModal();

  return (
    <div className="flex justify-between p-4">
      <div className="flex items-center justify-between gap-6">
        <h2 className="text-5xl font-bold text-foreground">{title}</h2>

        <div className="flex items-center border border-highlight rounded-lg px-3 py-1">
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

const TodoItem = ({
  title,
  description,
  dueDate,
  isCompleted,
}: TodoItemProps) => {};

export default TodoBox;
