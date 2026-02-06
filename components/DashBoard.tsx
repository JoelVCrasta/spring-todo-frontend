import AddTodoModal from "./AddTodoModal";
import SideBar from "./Sidebar";
import TodoBox from "./TodoBox";

const DashBoard = () => {
  return (
    <section className="flex bg-background h-screen">
      <SideBar />
      <TodoBox />
      <AddTodoModal />
    </section>
  );
};

export default DashBoard;
