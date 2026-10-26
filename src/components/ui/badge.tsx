import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-teal-500/15 text-teal-300 border border-teal-500/30",
        navy:
          "bg-slate-800 text-slate-200 border border-slate-700",
        present:
          "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
        late:
          "bg-amber-500/15 text-amber-400 border border-amber-500/30",
        absent:
          "bg-rose-500/15 text-rose-400 border border-rose-500/30",
        pending:
          "bg-blue-500/15 text-blue-400 border border-blue-500/30",
        approved:
          "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
        rejected:
          "bg-rose-500/15 text-rose-300 border border-rose-500/30",
        outline:
          "border border-slate-700 text-slate-300 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse" />}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
