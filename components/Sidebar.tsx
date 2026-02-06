"use client";

import {
  BookOpen,
  Check,
  ChevronsRight,
  ListTodo,
  Menu,
  Plus,
} from "lucide-react";
import IconButton from "./IconButton";
import MenuHeader from "./MenuHeader";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SideBarContentItemProps {
  title: string;
  icon: React.ReactNode;
}

interface SideBarCollectionItemProps {
  title: string;
  collectionColor?: string;
}

const dummyCollections = [
  { title: "Work", color: "blue" },
  { title: "Personal", color: "green" },
  { title: "Shopping", color: "red" },
];

const SideBar = ({ isOpen, toggleSidebar }: SideBarProps) => {
  return (
    <aside
      className={`h-screen pt-3 ${isOpen ? "bg-accent-primary" : "bg-transparent"} transition-all w-${isOpen ? "72" : "20"}`}
    >
      <div className="p-4">
        {isOpen ? (
          <>
            <MenuHeader
              title="Menu"
              icon={<Menu size={24} />}
              onToggle={toggleSidebar}
            />
            <SideBarContent />
          </>
        ) : (
          <IconButton icon={<Menu size={24} />} onClick={toggleSidebar} />
        )}
      </div>
    </aside>
  );
};

const SideBarContent = () => {
  return (
    <div className="mt-4">
      {/* tasks */}
      <div>
        <p className="font-bold text-sm text-foreground">TASK</p>

        <div className="flex flex-col my-2">
          <SideBarContentItem title="All Tasks" icon={<ListTodo size={18} />} />
          <SideBarContentItem
            title="Upcoming"
            icon={<ChevronsRight size={18} />}
          />
          <SideBarContentItem title="Today" icon={<BookOpen size={18} />} />
          <SideBarContentItem title="Completed" icon={<Check size={18} />} />
        </div>
      </div>

      <hr className="my-4 border-gray-700" />

      {/* collections */}
      <div>
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm text-foreground">COLLECTIONS</p>

          <IconButton
            icon={<Plus size={20} />}
            onClick={() => console.log("Add collection")}
          />
        </div>

        <div className="flex flex-col my-2">
          {dummyCollections.map((collection, idx) => (
            <SideBarCollectionItem
              key={idx}
              title={collection.title}
              collectionColor={collection.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SideBarContentItem = ({ title, icon }: SideBarContentItemProps) => {
  return (
    <button className="flex items-center gap-2 hover:bg-accent-secondary p-2 rounded-md transition-colors duration-200">
      <div className="text-gray-400">{icon}</div>
      <p className="text-gray-200 text-sm font-medium">{title}</p>
    </button>
  );
};

const SideBarCollectionItem = ({
  title,
  collectionColor = "gray",
}: SideBarCollectionItemProps) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-400",
    green: "bg-green-400",
    red: "bg-red-400",
    pink: "bg-pink-400",
    yellow: "bg-yellow-400",
    orange: "bg-orange-400",
    purple: "bg-purple-400",
    gray: "bg-gray-400",
  };

  const colorClass = colorMap[collectionColor];

  return (
    <button className="flex items-center gap-2 hover:bg-accent-secondary p-2 rounded-md transition-colors duration-200">
      <div className={`${colorClass} w-2 h-2 rounded-full`} />
      <p className="text-gray-200 text-sm font-medium">{title}</p>
    </button>
  );
};

export default SideBar;
