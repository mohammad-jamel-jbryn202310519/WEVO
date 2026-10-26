"use client";

import React, { useState } from "react";
import {
  HeartHandshake,
  Sparkles,
  Send,
  MessageSquarePlus,
  Shield,
  Award,
  EyeOff,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDirection } from "@/components/shared/DirectionProvider";

export function WorkFamilySection() {
  const { t } = useDirection();

  const [reportTitle, setReportTitle] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportCategory, setReportCategory] = useState("SUGGESTION");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [activeReports, setActiveReports] = useState([
    {
      id: "REP-104",
      title: "اقتراح توفير مساحة هادئة للتركيز والعمل الجماعي",
      category: "SUGGESTION",
      status: "UNDER_REVIEW",
      date: "منذ 3 أيام",
      isAnonymous: false,
    },
    {
      id: "REP-092",
      title: "ملاحظة بخصوص ضبط درجة حرارة الدور الرابع",
      category: "SAFETY_OR_FACILITY",
      status: "RESOLVED",
      date: "الأسبوع الماضي",
      isAnonymous: true,
    },
  ]);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTitle.trim() || !reportContent.trim()) return;

    const newRep = {
      id: `REP-${Math.floor(100 + Math.random() * 900)}`,
      title: reportTitle,
      category: reportCategory,
      status: "SUBMITTED",
      date: "الآن",
      isAnonymous,
    };

    setActiveReports([newRep, ...activeReports]);
    setSubmittedSuccess(true);
    setReportTitle("");
    setReportContent("");
    setTimeout(() => setSubmittedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Work Family Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/30 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <HeartHandshake className="w-6 h-6 text-teal-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {t("عائلة العمل ومجتمع WEVO", "Work Family & Belonging")}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
          {t("هنا صوتك مسموع وجهدك مقدر. نؤمن بأن كل فرد ركيزة أساسية في أسرة العمل وتطوير بيئته.", "Your voice matters and your efforts are recognized. Together we grow as one family.")}
        </p>
      </div>

      {/* 2. Employee Recognition & Peer Kudos */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <CardTitle className="text-base">
              {t("لوحة التقدير وتكريم الموظفين 🌟", "Recognition & Kudos")}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-4 text-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center text-lg shrink-0">
              🏆
            </div>
            <div className="space-y-1">
              <div className="font-bold text-sm text-amber-200">
                {t("نجم الشهر: سارة العتيبي (إدارة العمليات)", "Star of the Month: Sarah Al-Otaibi")}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {t("تقديراً لدورها الاستثنائي في تنظيم ورش العمل وتحسين سرعة استجابة الدعم بنسبة 40%.", "Recognized for outstanding cross-department collaboration.")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Submit Suggestion or Workplace Report */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <MessageSquarePlus className="w-4 h-4 text-teal-400" />
            <CardTitle className="text-base">
              {t("صوتك يصنع الفرق — اقتراح أو بلاغ بيئة عمل", "Share an Idea or Report an Issue")}
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            {t("يمكنك إرسال اقتراحك أو ملاحظتك باسمك أو بهوية مجهولة بكل سرية وأمان.", "Submit suggestions or workplace issues openly or completely anonymously.")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submittedSuccess && (
            <div className="p-3 mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t("تم تسجيل مقترحك / بلاغك بنجاح وسيتتم مراجعته باهتمام!", "Submitted successfully and will be reviewed with care!")}</span>
            </div>
          )}

          <form onSubmit={handleSubmitReport} className="space-y-3.5 text-xs">
            <div>
              <label className="text-slate-300 block mb-1 font-medium">{t("فئة الرسالة", "Category")}</label>
              <select
                value={reportCategory}
                onChange={(e) => setReportCategory(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-white"
              >
                <option value="SUGGESTION">{t("💡 فكرة أو اقتراح تحسين", "Idea / Suggestion")}</option>
                <option value="WORKPLACE_ISSUE">{t("⚠️ ملاحظة حول بيئة العمل", "Workplace Issue")}</option>
                <option value="SAFETY_OR_FACILITY">{t("🏢 الصيانة والمرافق", "Facilities / Maintenance")}</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-medium">{t("العنوان الرئيسي", "Title")}</label>
              <input
                type="text"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                placeholder={t("اكتب عنواناً مختصراً وواضحاً...", "Enter concise title...")}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-white"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-medium">{t("التفاصيل", "Details")}</label>
              <textarea
                rows={3}
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                placeholder={t("اشرح فكرتك أو ملاحظتك بحرية وشفافية...", "Describe your idea or feedback openly...")}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-2.5 text-white"
                required
              />
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-teal-400" />
                <span className="text-slate-300">{t("إرسال البلاغ بهوية مجهولة (Anonymous)", "Submit Anonymously")}</span>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 accent-teal-600 rounded"
              />
            </div>

            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 font-bold">
              <Send className="w-4 h-4 ml-2" />
              {t("إرسال إلى إدارة الشركة", "Submit to Leadership")}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 4. My Past Reports & Status Tracking */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {t("متابعة حالة مقترحاتي وبلاغاتي", "Track My Submitted Reports")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2.5 text-xs">
            {activeReports.map((rep) => (
              <div
                key={rep.id}
                className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{rep.title}</span>
                    {rep.isAnonymous && (
                      <span className="text-[10px] text-teal-400">({t("مجهول", "Anon")})</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {rep.id} &bull; {rep.date}
                  </div>
                </div>
                <Badge
                  variant={
                    rep.status === "RESOLVED"
                      ? "approved"
                      : rep.status === "UNDER_REVIEW"
                      ? "pending"
                      : "navy"
                  }
                >
                  {rep.status === "RESOLVED"
                    ? t("تم الإنجاز", "Resolved")
                    : rep.status === "UNDER_REVIEW"
                    ? t("قيد المراجعة", "Reviewing")
                    : t("تم الاستلام", "Received")}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
