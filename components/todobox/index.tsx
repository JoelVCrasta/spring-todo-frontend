import useCollectionStore from "@/app/hooks/useCollectionStore";
import TodoBoxHeader from "./TodoBoxHeader";
import { useSearchParams } from "next/navigation";
import TodoContent from "./TodoContent";

const TodoBox = () => {
  const collections = useCollectionStore((state) => state.collections);

  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "all";
  const collectionId = searchParams.get("id");

  const getFilteredTodos = () => {
    if (view === "collection" && collectionId) {
      const collection = collections.find((col) => col.id === collectionId);
      return {
        title: collection?.collectionName || "Collection",
        todos: collection?.todos || [],
      };
    }

    if (view === "today") {
      const today = new Date().toISOString().split("T")[0];
      const todayTodos = collections
        .flatMap((col) => col.todos)
        .filter((todo) => todo.dueDate === today);
      return {
        title: "Today",
        todos: todayTodos,
      };
    }

    if (view === "upcoming") {
      const today = new Date().toISOString().split("T")[0];
      const upcomingTodos = collections
        .flatMap((col) => col.todos)
        .filter(
          (todo) => typeof todo.dueDate === "string" && todo.dueDate > today,
        );
      return {
        title: "Upcoming",
        todos: upcomingTodos,
      };
    }

    if (view === "completed") {
      const completedTodos = collections
        .flatMap((col) => col.todos)
        .filter((todo) => todo.completed);
      return {
        title: "Completed",
        todos: completedTodos,
      };
    }

    return {
      title: "All Todos",
      todos: collections.flatMap((col) => col.todos),
    };
  };

  const { title, todos } = getFilteredTodos();

  return (
    <div className="w-full px-4">
      <TodoBoxHeader title={title} todoCount={todos.length} />
      <TodoContent todos={todos} isCollectionView={view === "collection"} />
    </div>
  );
};

export default TodoBox;
