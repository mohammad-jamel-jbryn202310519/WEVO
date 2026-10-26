import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "teal" | "emerald" | "amber" | "rose" | "blue";
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
  trend,
  className,
}: StatCardProps) {
  const iconBgMap = {
    default: "bg-slate-800 text-slate-300",
    teal: "bg-teal-500/15 text-teal-400 border border-teal-500/20",
    emerald: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    amber: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    rose: "bg-rose-500/15 text-rose-400 border border-rose-500/20",
    blue: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  };

  return (
    <div
      className={cn(
        "p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-sm flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-md group",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-slate-400">{title}</span>
        <div
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105",
            iconBgMap[variant]
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3">
        <div className="text-2xl font-extrabold text-white tracking-tight">{value}</div>
        {(subtitle || trend) && (
          <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
            {trend && (
              <span
                className={cn(
                  "font-semibold",
                  trend.isPositive ? "text-emerald-400" : "text-rose-400"
                )}
              >
                {trend.value}
              </span>
            )}
            {subtitle && <span>{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
