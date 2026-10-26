import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-teal-600 text-white shadow-md shadow-teal-900/30 hover:bg-teal-500 hover:shadow-teal-900/50",
        navy:
          "bg-slate-900 text-white border border-slate-700/80 shadow-md hover:bg-slate-800 hover:border-slate-600",
        secondary:
          "bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white",
        outline:
          "border border-slate-700/80 bg-transparent text-slate-200 hover:bg-slate-800/80 hover:text-white",
        ghost:
          "text-slate-300 hover:bg-slate-800/60 hover:text-white",
        destructive:
          "bg-rose-600 text-white shadow-md shadow-rose-950/40 hover:bg-rose-500",
        subtleBlue:
          "bg-blue-600/15 text-blue-400 border border-blue-500/20 hover:bg-blue-600/25",
        success:
          "bg-emerald-600/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-600/25",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-3.5 text-xs rounded-lg",
        lg: "h-13 px-8 text-base rounded-2xl",
        icon: "h-10 w-10",
        iconSm: "h-8 w-8 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
