"use client";

import { useState } from "react";
import AddTodoModal from "./AddTodoModal";
import SideBar from "./Sidebar";
import TodoBox from "./TodoBox";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="flex bg-background h-screen">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <TodoBox />
      <AddTodoModal />
    </section>
  );
};

export default DashBoard;
