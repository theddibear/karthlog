import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) => {
  const baseClasses =
    "font-medium rounded-[2px] transition-colors focus:outline-none focus:ring-1 focus:ring-antique-brass focus:ring-opacity-50";

  const variantClasses = {
    primary: "bg-antique-brass hover:bg-antique-brass/90 text-forged-black",
    secondary: "bg-cowrie-bone hover:bg-cowrie-bone/90 text-forged-black",
    outline:
      "bg-transparent border border-antique-brass text-antique-brass hover:bg-antique-brass/10",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className} font-abeezee px-3 py-2 text-sm md:px-4 md:py-2`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
