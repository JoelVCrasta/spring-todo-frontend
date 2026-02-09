import { Menu } from "lucide-react";
import IconButton from "../IconButton";
import MenuHeader from "../MenuHeader";
import SideBarContent from "./SideBarContent";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SideBar = ({ isOpen, toggleSidebar }: SideBarProps) => {
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
            <SideBarContent />
          </>
        ) : (
          <IconButton icon={<Menu size={24} />} onClick={toggleSidebar} />
        )}
      </div>
    </aside>
  );
};

export default SideBar;
