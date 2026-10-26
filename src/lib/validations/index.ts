import { z } from "zod";

/**
 * Attendance GPS Check-in & Check-out validation schema
 */
export const attendanceActionSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  accuracyMeters: z.number().min(0).max(1000).optional().default(20),
  notes: z.string().max(300).optional(),
});

/**
 * Leave request submission schema
 */
export const leaveRequestSchema = z.object({
  type: z.enum(["ANNUAL", "SICK", "UNPAID", "EMERGENCY", "PATERNITY_MATERNITY"], {
    message: "نوع الإجازة غير صالح",
  }),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "تاريخ البداية غير صالح",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "تاريخ النهاية غير صالح",
  }),
  reason: z.string().min(5, "يرجى توضيح سبب الإجازة (5 أحرف على الأقل)").max(500),
});

/**
 * Workplace issue or suggestion report schema
 */
export const workplaceReportSchema = z.object({
  title: z.string().min(3, "العنوان مطلوب (3 أحرف على الأقل)").max(120),
  content: z.string().min(10, "يرجى كتابة تفاصيل البلاغ أو الاقتراح (10 أحرف على الأقل)").max(2000),
  category: z.enum(["SUGGESTION", "WORKPLACE_ISSUE", "PROCESS_IMPROVEMENT", "SAFETY_OR_FACILITY"], {
    message: "الفئة المحددة غير صالحة",
  }),
  isAnonymous: z.boolean().default(false),
});

/**
 * Company announcement schema
 */
export const announcementSchema = z.object({
  title: z.string().min(3, "عنوان الإعلان مطلوب").max(150),
  content: z.string().min(10, "محتوى الإعلان مطلوب").max(5000),
  priority: z.enum(["NORMAL", "IMPORTANT", "URGENT"]).default("NORMAL"),
});
