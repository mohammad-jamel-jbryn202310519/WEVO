"use client";

import React from "react";
import { Building2, Bell, Languages, Shield, ChevronDown } from "lucide-react";
import { useDirection } from "./DirectionProvider";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/types";

interface AppHeaderProps {
  companyName?: string;
  role?: Role;
  userName?: string;
  userEmail?: string;
  avatarUrl?: string;
  unreadNotifications?: number;
  onRoleSwitch?: (role: Role) => void;
}

export function AppHeader({
  companyName = "WEVO Tech Hub",
  role = "EMPLOYEE",
  userName = "محمد جبرين",
  avatarUrl,
  unreadNotifications = 2,
}: AppHeaderProps) {
  const { locale, toggleLocale, t } = useDirection();

  const roleLabelMap: Record<Role, { ar: string; en: string; variant: "navy" | "default" | "present" | "pending" }> = {
    EMPLOYEE: { ar: "موظف", en: "Employee", variant: "navy" },
    SUPERVISOR: { ar: "مشرف فريق", en: "Supervisor", variant: "pending" },
    COMPANY_ADMIN: { ar: "مدير شركة", en: "Company Admin", variant: "default" },
    COMPANY_OWNER: { ar: "مالك الشركة", en: "Owner", variant: "present" },
    PLATFORM_ADMIN: { ar: "مدير المنصة", en: "Platform Admin", variant: "present" },
  };

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/90 px-4 sm:px-6 py-3 safe-top">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand & Company info */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-slate-900 via-teal-900 to-teal-500 border border-teal-500/30 flex items-center justify-center font-extrabold text-white text-lg shadow-md shadow-teal-500/10">
            W
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                WEVO
              </span>
              <span className="text-slate-600 hidden sm:inline">&bull;</span>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300">
                <Building2 className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-medium">{companyName}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={roleLabelMap[role].variant} className="text-[10px] px-2 py-0">
                <Shield className="w-2.5 h-2.5 mr-1" />
                {t(roleLabelMap[role].ar, roleLabelMap[role].en)}
              </Badge>
              <span className="text-[11px] text-slate-400 sm:hidden">{companyName}</span>
            </div>
          </div>
        </div>

        {/* Right: Language toggle, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700/60 transition-colors"
            title="تبديل اللغة / Toggle Language"
          >
            <Languages className="w-3.5 h-3.5 text-teal-400" />
            <span>{locale === "ar" ? "EN" : "عربي"}</span>
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
            title="الإشعارات / Notifications"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-teal-500 text-[9px] font-bold text-slate-950 flex items-center justify-center ring-2 ring-slate-950">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* User Profile avatar */}
          <div className="flex items-center gap-2 pl-1 pr-1 py-1 rounded-xl bg-slate-900/60 border border-slate-800/70">
            <div className="w-8 h-8 rounded-lg bg-teal-600/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-bold text-xs">
              {userName.slice(0, 2)}
            </div>
            <div className="hidden md:block text-right pr-1">
              <div className="text-xs font-semibold text-white leading-tight">{userName}</div>
              <div className="text-[10px] text-slate-400">{t("متصل الآن", "Active")}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
