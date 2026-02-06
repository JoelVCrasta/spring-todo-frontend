import SideBar from "./Sidebar";
import TodoBox from "./TodoBox";

const DashBoard = () => {
  return (
    <section className="flex bg-background h-screen">
      <SideBar />
      <TodoBox />
    </section>
  );
};

export default DashBoard;
