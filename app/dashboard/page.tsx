"use client";

import { useEffect, useState } from "react";
import AddTodoModal from "@/components/AddTodoModal";
import SideBar from "@/components/sidebar";
import TodoBox from "@/components/todobox";
import useCollectionStore from "../hooks/useCollectionStore";
import EditMenu from "@/components/editmenu";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const fetchCollections = useCollectionStore(
    (state) => state.fetchCollections,
  );

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="flex bg-background h-screen">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <TodoBox />
      <AddTodoModal />
      <EditMenu />
    </section>
  );
};

export default DashBoard;
