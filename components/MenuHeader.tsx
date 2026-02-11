import IconButton from "./IconButton";

interface MenuHeaderProps {
  title?: string;
  icon?: React.ReactNode;
  right?: boolean;
  onToggle: () => void;
}

const MenuHeader = ({
  title,
  icon,
  right = false,
  onToggle,
}: MenuHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      {right ? (
        <>
          <IconButton icon={icon} onClick={onToggle} />
          <h2 className="font-bold text-2xl text-foreground">{title}</h2>
        </>
      ) : (
        <>
          <h2 className="font-bold text-2xl text-foreground">{title}</h2>
          <IconButton icon={icon} onClick={onToggle} />
        </>
      )}
    </div>
  );
};

export default MenuHeader;
