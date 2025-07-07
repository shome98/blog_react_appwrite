import { forwardRef, useId, type InputHTMLAttributes } from "react";

// Define props by extending native input attributes for better autocompletion and type safety
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
