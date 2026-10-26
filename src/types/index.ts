export type Role =
  | "PLATFORM_ADMIN"
  | "COMPANY_OWNER"
  | "COMPANY_ADMIN"
  | "SUPERVISOR"
  | "EMPLOYEE";

export type AttendanceStatus =
  | "PRESENT"
  | "LATE"
  | "EARLY_LEAVE"
  | "ABSENT"
  | "EXCUSED";

export type LeaveType =
  | "ANNUAL"
  | "SICK"
  | "UNPAID"
  | "EMERGENCY"
  | "PATERNITY_MATERNITY";

export type LeaveStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED";

export type PayrollStatus =
  | "DRAFT"
  | "REVIEWED"
  | "APPROVED"
  | "PUBLISHED";

export type IncentiveType =
  | "PERFORMANCE_BONUS"
  | "EMPLOYEE_OF_THE_MONTH"
  | "OVERTIME_EXTRA"
  | "SPECIAL_ACHIEVEMENT"
  | "PEER_RECOGNITION";

export type ReportCategory =
  | "SUGGESTION"
  | "WORKPLACE_ISSUE"
  | "PROCESS_IMPROVEMENT"
  | "SAFETY_OR_FACILITY";

export type ReportStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "DISMISSED";

export interface UserSession {
  userId: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
  isPlatformAdmin: boolean;
  activeMembership?: {
    membershipId: string;
    companyId: string;
    companyName: string;
    companySlug: string;
    role: Role;
    jobTitle?: string | null;
    department?: string | null;
    branchId?: string | null;
  } | null;
}

export interface EmployeeOverview {
  employeeName: string;
  jobTitle: string;
  department: string;
  avatarUrl?: string;
  todayShift?: {
    name: string;
    startTime: string;
    endTime: string;
    branchName: string;
    branchLat: number;
    branchLng: number;
    allowedRadiusMeters: number;
  };
  attendanceToday?: {
    id: string;
    checkInTime?: string;
    checkOutTime?: string;
    status: AttendanceStatus;
    workMinutes?: number;
  };
  monthlyStats: {
    workedHours: number;
    targetHours: number;
    attendanceRatePercent: number;
    leaveBalanceRemaining: number;
  };
  financialSummary: {
    baseSalary: number;
    overtimeTotal: number;
    incentivesTotal: number;
    deductionsTotal: number;
    estimatedNet: number;
    currency: string;
  };
  announcementsCount: number;
  achievementsCount: number;
}
