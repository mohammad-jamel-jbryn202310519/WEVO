"use client";

import React from "react";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Calendar,
  Award,
  ChevronRight,
  ArrowUpRight,
  Shield,
  MapPin,
  Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { useDirection } from "@/components/shared/DirectionProvider";
import { formatCurrency } from "@/lib/utils";

interface HomeSectionProps {
  onNavigateToTab: (tab: "attendance" | "finance" | "family" | "account") => void;
}

export function HomeSection({ onNavigateToTab }: HomeSectionProps) {
  const { t } = useDirection();

  return (
    <div className="space-y-5 pb-20">
      {/* 1. Welcome and Profile Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-slate-900 via-slate-900/90 to-teal-950/40 border border-slate-800/90 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
              م ج
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  {t("صباح الخير، محمد جبرين 👋", "Good morning, Mohammad Jbryn 👋")}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t("مهندس برمجيات أول &bull; إدارة التقنية والتحول الرقمي", "Senior Software Engineer &bull; Tech & Digital Dept")}
              </p>
            </div>
          </div>

          <Badge variant="present" dot className="self-start sm:self-center py-1.5 px-3">
            {t("على رأس العمل", "On Duty")}
          </Badge>
        </div>
      </div>

      {/* 2. Today's Shift & Live Attendance Card */}
      <Card className="border-teal-500/30 bg-slate-900/80 shadow-teal-950/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-base">
                  {t("وردية اليوم (Today's Shift)", "Today's Shift")}
                </CardTitle>
                <CardDescription className="text-xs">
                  {t("الوردية الصباحية المعتمدة &bull; المقر الرئيسي", "Standard Morning Shift &bull; Main HQ")}
                </CardDescription>
              </div>
            </div>
            <Badge variant="navy">09:00 ص — 05:00 م</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>{t("فرع الرياض - برج المملكة (نطاق 150م مسموح)", "Riyadh Branch - Kingdom Tower (150m allowed)")}</span>
            </div>
            <span className="text-emerald-400 font-semibold">{t("داخل النطاق", "In Range")}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => onNavigateToTab("attendance")}
              className="flex-1 bg-teal-600 hover:bg-teal-500 text-white font-bold"
            >
              <CheckCircle2 className="w-4 h-4 ml-2" />
              {t("تسجيل الحضور بالـ GPS الآن", "Check In via GPS Now")}
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigateToTab("attendance")}
              className="border-slate-700 text-slate-300"
            >
              <Calendar className="w-4 h-4 ml-2" />
              {t("جدول الشفتات الأسبوعي", "Weekly Shifts")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 3. Monthly Work & Productivity Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title={t("ساعات العمل المنجزة", "Worked Hours")}
          value="142 / 160"
          subtitle={t("ساعة هذا الشهر", "hrs this month")}
          icon={TrendingUp}
          variant="teal"
          trend={{ value: "88%", isPositive: true }}
        />
        <StatCard
          title={t("نسبة الالتزام بالحضور", "Attendance Rate")}
          value="98.5%"
          subtitle={t("0 غياب بدون عذر", "0 unexcused absence")}
          icon={CheckCircle2}
          variant="emerald"
        />
        <StatCard
          title={t("رصيد الإجازات المتبقي", "Remaining Leave")}
          value="18"
          subtitle={t("يوم متبقي", "days left")}
          icon={Calendar}
          variant="blue"
        />
        <StatCard
          title={t("تقدير الراتب الصافي", "Estimated Net Pay")}
          value={formatCurrency(14850, "SAR")}
          subtitle={t("شامل الحوافز والإضافي", "Inc. bonus & overtime")}
          icon={Sparkles}
          variant="teal"
        />
      </div>

      {/* 4. Company Announcements & Work Family Highlights */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-teal-400" />
              <CardTitle className="text-base">
                {t("إعلانات عائلة العمل (Company News)", "Company Announcements")}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigateToTab("family")}
              className="text-xs text-teal-400"
            >
              {t("عرض الكل", "View All")}
              <ChevronRight className="w-3.5 h-3.5 mr-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-1.5 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <Badge variant="default" className="text-[10px]">
                {t("تكريم وإنجاز", "Recognition")}
              </Badge>
              <span className="text-[11px] text-slate-500">منذ ساعتين</span>
            </div>
            <h4 className="font-semibold text-sm text-white">
              {t("🎉 تهانينا لفريق التطوير على إطلاق منصة WEVO الجديدة!", "🎉 Congratulations to the engineering team on launching WEVO!")}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("تم تسجيل إنجاز بارز للربع السنوي بمشاركة جميع أفراد أسرة الشركة. سيتم توزيع مكافآت الإنجاز في المسير القادم.", "Significant quarterly milestone reached with full team engagement.")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
