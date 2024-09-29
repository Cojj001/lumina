import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-blue-950 dark:focus-visible:ring-blue-300";

    const variants = {
      default:
        "bg-blue-600 text-white hover:bg-blue-600/90 dark:bg-blue-50 dark:text-blue-900 dark:hover:bg-blue-50/90",
      outline:
        "border border-blue-200 bg-white hover:bg-blue-100 hover:text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:hover:bg-blue-800 dark:hover:text-blue-50",
      secondary:
        "bg-blue-100 text-blue-900 hover:bg-blue-100/80 dark:bg-blue-800 dark:text-blue-50 dark:hover:bg-blue-800/80",
      ghost:
        "hover:bg-blue-100 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-50",
      link: "text-blue-900 underline-offset-4 hover:underline dark:text-blue-50",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && "opacity-50 pointer-events-none",
          className
        )}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default function Component(props = {}) {
  return <Button {...props}></Button>;
}
