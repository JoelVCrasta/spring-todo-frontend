interface IconButtonProps {
  icon: React.ReactNode;

  onClick: () => void;
}

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded-md transition-colors duration-200 hover:bg-accent-secondary`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
