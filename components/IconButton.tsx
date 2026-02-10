interface IconButtonProps {
  icon: React.ReactNode;
  className?: string;

  onClick: () => void;
}

const IconButton = ({ icon, onClick, className }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded-md transition-colors duration-200 hover:bg-accent-secondary ${className ? className : ""}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
