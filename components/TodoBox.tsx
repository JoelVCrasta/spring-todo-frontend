interface TodoBoxProps {}

interface TodoBoxHeaderProps {
  title: string;
  todoCount: number;
}

const TodoBox = () => {
  return (
    <div className="px-4">
      <TodoBoxHeader title="Today" todoCount={5} />
    </div>
  );
};

const TodoBoxHeader = ({ title, todoCount }: TodoBoxHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 2 gap-6">
      <h2 className="text-5xl font-bold">{title}</h2>

      <div className="flex items-center border border-accent-light rounded-lg px-3 py-1">
        <p className="text-3xl font-medium">{todoCount}</p>
      </div>
    </div>
  );
};

export default TodoBox;
