import { Todo } from "@/utils/types";
import TodoItem from "./TodoItem";

interface TodoContentProps {
  todos: Todo[];
  isCollectionView: boolean;
}

const TodoContent = ({ todos, isCollectionView }: TodoContentProps) => {
  if (todos.length === 0) {
    return (
      <div className="text-center text-neutral-400 mt-36">
        <p className="text-lg">No todos to display</p>
        <p className="text-sm mt-2">Add some tasks to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 mt-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            dueDate={todo.dueDate}
            isCompleted={todo.completed}
            collectionId={todo.collectionId}
            isCollectionView={isCollectionView}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoContent;
