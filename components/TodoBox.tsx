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
    <div className="px-4">
      <TodoBoxHeader title="Today" todoCount={5} />
    </div>
  );
};

const TodoBoxHeader = ({ title, todoCount }: TodoBoxHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 2 gap-6">
      <h2 className="text-5xl font-bold text-foreground">{title}</h2>

      <div className="flex items-center border border-accent-light rounded-lg px-3 py-1">
        <p className="text-3xl font-medium text-foreground">{todoCount}</p>
      </div>
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
