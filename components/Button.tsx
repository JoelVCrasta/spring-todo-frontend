interface ButtonProps {
  title: string;
  icon: React.ReactNode;
  type?: "outline" | "solid";
  onClick: () => void;
}

const Button = ({ title, icon, onClick, type = "solid" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 rounded-md transition-colors duration-200 hover:bg-accent-secondary ${
        type === "outline" ? "border border-accent-light" : "bg-accent-primary"
      }`}
    >
      <div className="text-gray-400">{icon}</div>
      <span className="text-sm font-medium">{title}</span>
    </button>
  );
};

export default Button;
