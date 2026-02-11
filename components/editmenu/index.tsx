import { X } from "lucide-react";
import useEditMenu from "@/app/hooks/useEditMenu";
import MenuHeader from "../MenuHeader";
import EditMenuContent from "./EditMenuContent";

const EditMenu = () => {
  const { isOpen, closeMenu } = useEditMenu();

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      className={`h-screen pt-3 transition-width duration-200 bg-accent-primary min-w-lg`}
    >
      <div className="p-4 h-full flex flex-col">
        <MenuHeader
          title="Task"
          icon={<X size={24} />}
          right={true}
          onToggle={closeMenu}
        />
        <EditMenuContent />
      </div>
    </aside>
  );
};

export default EditMenu;
