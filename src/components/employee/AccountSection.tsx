"use client";

import React from "react";
import {
  User,
  Building2,
  Languages,
  Shield,
  KeyRound,
  LogOut,
  Smartphone,
  CheckCircle2,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDirection } from "@/components/shared/DirectionProvider";

export function AccountSection() {
  const { locale, toggleLocale, t } = useDirection();

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Profile Overview Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center font-black text-2xl">
          م ج
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">محمد جميل جبرين</h2>
          <p className="text-xs text-slate-400">mohammad.jbryn@example.com</p>
          <div className="flex gap-2 mt-2">
            <Badge variant="present" className="text-[10px]">
              {t("موظف مثبت", "Permanent Employee")}
            </Badge>
            <Badge variant="navy" className="text-[10px]">
              {t("الرقم الوظيفي: WEVO-019", "Emp Code: WEVO-019")}
            </Badge>
          </div>
        </div>
      </div>

      {/* 2. Employment & Company Info */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-400" />
            <CardTitle className="text-base">{t("بيانات العمل والشركة", "Company Information")}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <span className="text-slate-400 block mb-1">{t("الشركة", "Company")}</span>
              <span className="font-semibold text-white">WEVO Tech Hub</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <span className="text-slate-400 block mb-1">{t("القسم / الإدارة", "Department")}</span>
              <span className="font-semibold text-white">إدارة التطوير البرمجي والذكاء الاصطناعي</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <span className="text-slate-400 block mb-1">{t("المسمى الوظيفي", "Job Title")}</span>
              <span className="font-semibold text-white">مهندس برمجيات أول (Senior Software Engineer)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <span className="text-slate-400 block mb-1">{t("الفرع ومقر العمل", "Branch Location")}</span>
              <span className="font-semibold text-white">الرياض - المقر الرئيسي</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Language & Display Preferences */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-teal-400" />
            <CardTitle className="text-base">{t("تفضيلات اللغة والعرض", "Language & Display")}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800">
            <div>
              <span className="font-semibold text-white block">{t("لغة الواجهة الحالية", "Current Language")}</span>
              <span className="text-slate-400 text-[11px]">
                {locale === "ar" ? "اللغة العربية (من اليمين إلى اليسار)" : "English (LTR Layout)"}
              </span>
            </div>
            <Button size="sm" variant="outline" onClick={toggleLocale} className="text-xs">
              {locale === "ar" ? "Switch to English" : "التبديل للعربية"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 4. Security & Sessions */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-teal-400" />
            <CardTitle className="text-base">{t("الأمان وكلمة المرور", "Security & Sessions")}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <KeyRound className="w-4 h-4 text-teal-400" />
              <div>
                <span className="font-semibold text-white block">{t("كلمة المرور", "Password")}</span>
                <span className="text-slate-400 text-[11px]">{t("آخر تعديل منذ 30 يوماً", "Changed 30 days ago")}</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="text-xs">
              {t("تغيير", "Change")}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <Smartphone className="w-4 h-4 text-blue-400" />
              <div>
                <span className="font-semibold text-white block">{t("الجلسات النشطة", "Active Sessions")}</span>
                <span className="text-slate-400 text-[11px]">{t("متصل من تطبيق الهاتف الذكي (iPhone 15)", "Active on Mobile")}</span>
              </div>
            </div>
            <Badge variant="present">{t("نشط الآن", "Active")}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
