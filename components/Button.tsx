interface ButtonProps {
  title?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "outline" | "solid-1" | "solid-2";
  wide?: boolean;
  onClick: () => void;
}

const Button = ({
  title,
  icon,
  onClick,
  type = "button",
  variant = "solid-1",
  wide = false,
}: ButtonProps) => {
  const variantClasses = {
    outline:
      "border border-highlight text-foreground hover:bg-accent-secondary",
    "solid-1": "bg-accent-primary text-foreground hover:bg-accent-primary/80",
    "solid-2":
      "bg-accent-secondary text-foreground hover:bg-accent-secondary/80",
  };

  const buttonClass = variantClasses[variant];

  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex items-center justify-center gap-2 px-3 rounded-md transition-colors duration-200 hover:bg-accent-secondary h-11.5 ${buttonClass} ${wide ? "w-full" : ""}`}
    >
      {icon && <div className="text-foreground">{icon}</div>}
      {title && <span className="text-sm font-medium">{title}</span>}
    </button>
  );
};

export default Button;
