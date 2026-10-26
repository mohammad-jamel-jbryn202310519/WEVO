"use client";

import React from "react";
import {
  Wallet,
  TrendingUp,
  Award,
  AlertCircle,
  FileCheck2,
  DollarSign,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDirection } from "@/components/shared/DirectionProvider";
import { formatCurrency } from "@/lib/utils";

export function FinanceSection() {
  const { t } = useDirection();

  const financialData = {
    currency: "SAR",
    basicSalary: 12000,
    housingAllowance: 3000,
    transportAllowance: 1000,
    overtimeAmount: 950, // 8.5 extra hours calculated
    incentivesTotal: 1500, // Employee of month + performance
    deductionsTotal: 600, // GOSI pension contribution
    netEstimated: 17850,
  };

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Net Pay Hero Card */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-tr from-slate-900 via-slate-900 to-teal-950/60 border border-teal-500/30 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-teal-400">
              {t("الراتب الصافي المتوقع لهذا الشهر", "Estimated Net Pay This Month")}
            </span>
            <Badge variant="present" dot className="text-[11px]">
              {t("شفافية مالية كاملة", "Full Transparency")}
            </Badge>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white tracking-tight pt-1">
            {formatCurrency(financialData.netEstimated, financialData.currency)}
          </div>
          <p className="text-xs text-slate-400">
            {t("موعد الإيداع المعتاد: 27 من كل شهر ميلادي", "Scheduled payday: 27th of every month")}
          </p>
        </div>
      </div>

      {/* 2. Detailed Transparent Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-teal-400" />
            <CardTitle className="text-base">
              {t("مفردات ومكونات الراتب", "Salary Breakdown")}
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            {t("تفاصيل مستحقاتك دون أي رسوم أو خصومات خفية", "Transparent view of base pay, overtime, and bonuses")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-xs">
            {/* Basic */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <span className="text-slate-300">{t("الراتب الأساسي", "Base Salary")}</span>
              <span className="font-bold text-white">
                {formatCurrency(financialData.basicSalary, financialData.currency)}
              </span>
            </div>

            {/* Housing & Transport */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800">
              <span className="text-slate-300">{t("بدل السكن والمواصلات", "Housing & Transport Allowances")}</span>
              <span className="font-bold text-white">
                {formatCurrency(financialData.housingAllowance + financialData.transportAllowance, financialData.currency)}
              </span>
            </div>

            {/* Overtime */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-medium">
                  {t("تعويض الساعات الإضافية (8.5 ساعة)", "Overtime Compensation (8.5 hrs)")}
                </span>
              </div>
              <span className="font-bold text-emerald-400">
                +{formatCurrency(financialData.overtimeAmount, financialData.currency)}
              </span>
            </div>

            {/* Incentives */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-teal-500/10 border border-teal-500/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-teal-300 font-medium">
                  {t("مكافأة تميز وإنجاز شهري", "Monthly Achievement Bonus")}
                </span>
              </div>
              <span className="font-bold text-teal-400">
                +{formatCurrency(financialData.incentivesTotal, financialData.currency)}
              </span>
            </div>

            {/* Deductions */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-rose-300 font-medium">
                  {t("اشتراك التأمينات الاجتماعية (GOSI)", "Pension Contribution (GOSI)")}
                </span>
              </div>
              <span className="font-bold text-rose-400">
                -{formatCurrency(financialData.deductionsTotal, financialData.currency)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Payment History Slips */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-teal-400" />
            <CardTitle className="text-base">
              {t("سجلات ومسيرات الرواتب السابقة", "Past Payroll Records")}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2.5 text-xs">
            {[
              { month: "راتب شهر سبتمبر 2026", net: 17400, status: "PAID" },
              { month: "راتب شهر أغسطس 2026", net: 16900, status: "PAID" },
              { month: "راتب شهر يوليو 2026", net: 16900, status: "PAID" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-800"
              >
                <div>
                  <div className="font-semibold text-slate-200">{item.month}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {formatCurrency(item.net, "SAR")}
                  </div>
                </div>
                <Badge variant="approved">
                  {t("تم الإيداع بنجاح", "Paid")}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
