"use client";

import React, { useState } from "react";
import { DirectionProvider, useDirection } from "@/components/shared/DirectionProvider";
import { AppHeader } from "@/components/shared/AppHeader";
import { EmployeeBottomNav, EmployeeTab } from "@/components/shared/EmployeeBottomNav";
import { HomeSection } from "./HomeSection";
import { AttendanceSection } from "./AttendanceSection";
import { FinanceSection } from "./FinanceSection";
import { WorkFamilySection } from "./WorkFamilySection";
import { AccountSection } from "./AccountSection";
import { Role } from "@/types";
import { Smartphone, Monitor, Shield, Users, Building, Laptop } from "lucide-react";

export function EmployeePortalContent() {
  const [activeTab, setActiveTab] = useState<EmployeeTab>("home");
  const [currentRole, setCurrentRole] = useState<Role>("EMPLOYEE");
  const [isMobileSimulator, setIsMobileSimulator] = useState(false);
  const { t } = useDirection();

  return (
    <div className="min-h-screen flex flex-col bg-[#070a13] text-slate-100 antialiased selection:bg-teal-500 selection:text-slate-950">
      {/* Top Application Header */}
      <AppHeader
        companyName="WEVO Tech Hub"
        role={currentRole}
        userName="محمد جميل جبرين"
        unreadNotifications={3}
      />

      {/* Role & Simulator Action Banner */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Role Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium hidden sm:inline">{t("معاينة الدور:", "Preview Role:")}</span>
            <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setCurrentRole("EMPLOYEE")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  currentRole === "EMPLOYEE"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("الموظف", "Employee")}
              </button>
              <button
                onClick={() => setCurrentRole("SUPERVISOR")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  currentRole === "SUPERVISOR"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("المشرف", "Supervisor")}
              </button>
              <button
                onClick={() => setCurrentRole("COMPANY_ADMIN")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  currentRole === "COMPANY_ADMIN"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t("مدير الشركة", "Admin")}
              </button>
            </div>
          </div>

          {/* Mobile Simulator Toggle */}
          <button
            onClick={() => setIsMobileSimulator(!isMobileSimulator)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              isMobileSimulator
                ? "bg-teal-600/20 text-teal-300 border-teal-500/40 ring-2 ring-teal-500/20"
                : "bg-slate-800 text-slate-300 border-slate-700/60 hover:text-white"
            }`}
          >
            {isMobileSimulator ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
            <span>
              {isMobileSimulator
                ? t("إلغاء محاكي الهاتف (عرض كامل)", "Exit Mobile Simulator")
                : t("محاكي الهاتف الذكي (iPhone / Android)", "Mobile App Simulator")}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-3 sm:p-6 lg:p-8">
        <div
          className={`w-full transition-all duration-300 ${
            isMobileSimulator
              ? "max-w-[420px] rounded-[44px] border-[10px] border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.85)] bg-slate-950 overflow-hidden min-h-[820px] relative my-4"
              : "max-w-5xl"
          }`}
        >
          {isMobileSimulator && (
            <div className="w-full h-7 bg-slate-900/90 flex items-center justify-center relative safe-top border-b border-slate-800/50">
              <div className="w-24 h-4 bg-black rounded-full" />
            </div>
          )}

          <div className="p-3 sm:p-4">
            {/* 1. Home Section */}
            {activeTab === "home" && (
              <HomeSection onNavigateToTab={(tab) => setActiveTab(tab)} />
            )}

            {/* 2. My Attendance Section */}
            {activeTab === "attendance" && <AttendanceSection />}

            {/* 3. My Finance Section */}
            {activeTab === "finance" && <FinanceSection />}

            {/* 4. My Work Family Section */}
            {activeTab === "family" && <WorkFamilySection />}

            {/* 5. My Account Section */}
            {activeTab === "account" && <AccountSection />}
          </div>
        </div>
      </main>

      {/* Fixed Bottom Navigation for Mobile */}
      <EmployeeBottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        unreadCount={1}
      />
    </div>
  );
}

export default function EmployeePortal() {
  return (
    <DirectionProvider>
      <EmployeePortalContent />
    </DirectionProvider>
  );
}
