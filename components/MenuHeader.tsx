import IconButton from "./IconButton";
import { Menu } from "lucide-react";

interface MenuHeaderProps {
  title?: string;
  icon?: React.ReactNode;
  onToggle: () => void;
}

const MenuHeader = ({ title, icon, onToggle }: MenuHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-bold text-2xl text-foreground">{title}</h2>

      <IconButton icon={icon} onClick={onToggle} />
    </div>
  );
};

export default MenuHeader;
