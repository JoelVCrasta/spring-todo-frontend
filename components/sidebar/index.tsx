"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import IconButton from "../IconButton";
import MenuHeader from "../MenuHeader";
import SideBarContent from "./SideBarContent";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SideBar = ({ isOpen, toggleSidebar }: SideBarProps) => {
  const [collections, setCollections] = useState([
    { title: "Work", color: "blue" },
    { title: "Personal", color: "green" },
    { title: "Shopping", color: "red" },
  ]);

  return (
    <aside
      className={`h-screen pt-3 transition-width duration-200 ${isOpen ? "bg-accent-primary w-80" : "bg-transparent w-20"}`}
    >
      <div className="p-4">
        {isOpen ? (
          <>
            <MenuHeader
              title="Menu"
              icon={<Menu size={24} />}
              onToggle={toggleSidebar}
            />
            <SideBarContent
              collections={collections}
              setCollections={setCollections}
            />
          </>
        ) : (
          <IconButton icon={<Menu size={24} />} onClick={toggleSidebar} />
        )}
      </div>
    </aside>
  );
};

export default SideBar;
