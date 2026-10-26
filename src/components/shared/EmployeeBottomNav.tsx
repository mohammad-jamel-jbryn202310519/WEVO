"use client";

import React from "react";
import { Home, Clock, Wallet, HeartHandshake, User } from "lucide-react";
import { useDirection } from "./DirectionProvider";
import { cn } from "@/lib/utils";

export type EmployeeTab = "home" | "attendance" | "finance" | "family" | "account";

interface EmployeeBottomNavProps {
  activeTab: EmployeeTab;
  onTabChange: (tab: EmployeeTab) => void;
  unreadCount?: number;
}

export function EmployeeBottomNav({
  activeTab,
  onTabChange,
  unreadCount = 0,
}: EmployeeBottomNavProps) {
  const { t } = useDirection();

  const navItems: { id: EmployeeTab; labelAr: string; labelEn: string; icon: React.ElementType }[] = [
    { id: "home", labelAr: "الرئيسية", labelEn: "Home", icon: Home },
    { id: "attendance", labelAr: "حضوري", labelEn: "Attendance", icon: Clock },
    { id: "finance", labelAr: "مالياتي", labelEn: "Finance", icon: Wallet },
    { id: "family", labelAr: "عائلة العمل", labelEn: "Work Family", icon: HeartHandshake },
    { id: "account", labelAr: "حسابي", labelEn: "Account", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-slate-800/90 px-2 py-2 safe-bottom shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
      <nav className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 select-none",
                isActive
                  ? "text-teal-400 font-bold"
                  : "text-slate-400 hover:text-slate-200 font-medium"
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-xl transition-transform duration-200",
                  isActive
                    ? "bg-teal-500/15 scale-110 shadow-sm shadow-teal-500/20"
                    : "hover:bg-slate-800/50"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>

              <span className="text-[11px] mt-0.5 tracking-tight">
                {t(item.labelAr, item.labelEn)}
              </span>

              {item.id === "family" && unreadCount > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-950" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
