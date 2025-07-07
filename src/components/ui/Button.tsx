import { Loader2Icon } from "lucide-react";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  textColor?: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  disabled = false,
  isLoading = false,
  size = "md",
  ...props
}) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const baseClasses =
    "rounded-lg transition-all duration-200 flex items-center justify-center";
  const loadingClasses = isLoading ? "opacity-75 cursor-not-allowed" : "";
  const disabledClasses = disabled ? "opacity-75 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      className={`${baseClasses} ${sizeClasses[size]} ${bgColor} ${textColor} ${loadingClasses} ${disabledClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (<Loader2Icon className="w-2 h-2 animate-spin"/>)}
      {children}
    </button>
  );
};

export default Button;
