-- ==============================================================================
-- WEVO Platform — Master Supabase PostgreSQL Database Schema
-- Multi-Tenant Workforce Management & Employee Experience SaaS
-- ==============================================================================

-- 1. Create Enums
DO $$ BEGIN
  CREATE TYPE "Role" AS ENUM ('PLATFORM_ADMIN', 'COMPANY_OWNER', 'COMPANY_ADMIN', 'SUPERVISOR', 'EMPLOYEE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'LATE', 'EARLY_LEAVE', 'ABSENT', 'EXCUSED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "LeaveType" AS ENUM ('ANNUAL', 'SICK', 'UNPAID', 'EMERGENCY', 'PATERNITY_MATERNITY');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "LeaveStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "PayrollStatus" AS ENUM ('DRAFT', 'REVIEWED', 'APPROVED', 'PUBLISHED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "IncentiveType" AS ENUM ('PERFORMANCE_BONUS', 'EMPLOYEE_OF_THE_MONTH', 'OVERTIME_EXTRA', 'SPECIAL_ACHIEVEMENT', 'PEER_RECOGNITION');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ReportCategory" AS ENUM ('SUGGESTION', 'WORKPLACE_ISSUE', 'PROCESS_IMPROVEMENT', 'SAFETY_OR_FACILITY');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ReportStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'IN_PROGRESS', 'RESOLVED', 'DISMISSED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  is_platform_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Companies Table (Multi-Tenant Core)
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  currency TEXT DEFAULT 'SAR',
  timezone TEXT DEFAULT 'Asia/Riyadh',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Branches Table (GPS Geofencing)
CREATE TABLE IF NOT EXISTS public.branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  radius_meters DOUBLE PRECISION DEFAULT 150.0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_branches_company ON public.branches(company_id);

-- 5. Memberships Table (User to Company link with Role)
CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  role "Role" DEFAULT 'EMPLOYEE' NOT NULL,
  job_title TEXT,
  department TEXT,
  employee_code TEXT,
  base_salary NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  CONSTRAINT uq_user_company UNIQUE (user_id, company_id)
);
CREATE INDEX IF NOT EXISTS idx_memberships_company_role ON public.memberships(company_id, role);

-- 6. Shifts Table
CREATE TABLE IF NOT EXISTS public.shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  grace_period_minutes INT DEFAULT 15 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_shifts_company ON public.shifts(company_id);

-- 7. Shift Assignments Table
CREATE TABLE IF NOT EXISTS public.shift_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID NOT NULL REFERENCES public.memberships(id) ON DELETE CASCADE,
  shift_id UUID NOT NULL REFERENCES public.shifts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  notes TEXT,
  CONSTRAINT uq_membership_date UNIQUE (membership_id, date)
);

-- 8. Attendances Table (GPS Check-in/out)
CREATE TABLE IF NOT EXISTS public.attendances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID NOT NULL REFERENCES public.memberships(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  check_in_time TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  check_out_time TIMESTAMPTZ,
  check_in_lat DOUBLE PRECISION,
  check_in_lng DOUBLE PRECISION,
  check_in_distance_meters DOUBLE PRECISION,
  check_out_lat DOUBLE PRECISION,
  check_out_lng DOUBLE PRECISION,
  status "AttendanceStatus" DEFAULT 'PRESENT' NOT NULL,
  work_duration_minutes INT,
  overtime_minutes INT DEFAULT 0 NOT NULL,
  is_manual_correction BOOLEAN DEFAULT false NOT NULL,
  notes TEXT
);
CREATE INDEX IF NOT EXISTS idx_attendances_membership_time ON public.attendances(membership_id, check_in_time);

-- 9. Leave Requests Table
CREATE TABLE IF NOT EXISTS public.leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID NOT NULL REFERENCES public.memberships(id) ON DELETE CASCADE,
  type "LeaveType" NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_count INT NOT NULL,
  reason TEXT,
  status "LeaveStatus" DEFAULT 'PENDING' NOT NULL,
  reviewer_note TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_leave_membership ON public.leave_requests(membership_id, status);

-- 10. Payroll Records Table
CREATE TABLE IF NOT EXISTS public.payroll_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID NOT NULL REFERENCES public.memberships(id) ON DELETE CASCADE,
  month INT NOT NULL,
  year INT NOT NULL,
  basic_salary NUMERIC(12, 2) NOT NULL,
  overtime_amount NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
  incentives_total NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
  deductions_total NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
  net_salary NUMERIC(12, 2) NOT NULL,
  status "PayrollStatus" DEFAULT 'DRAFT' NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT uq_payroll_membership_month UNIQUE (membership_id, month, year)
);

-- 11. Incentives & Bonuses Table
CREATE TABLE IF NOT EXISTS public.incentives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID NOT NULL REFERENCES public.memberships(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  type "IncentiveType" DEFAULT 'PERFORMANCE_BONUS' NOT NULL,
  notes TEXT,
  date TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_incentives_membership ON public.incentives(membership_id);

-- 12. Reports & Suggestions Table
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID NOT NULL REFERENCES public.memberships(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category "ReportCategory" NOT NULL,
  status "ReportStatus" DEFAULT 'SUBMITTED' NOT NULL,
  is_anonymous BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_reports_membership_category ON public.reports(membership_id, category);

-- 13. Report Attachments Table
CREATE TABLE IF NOT EXISTS public.report_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT DEFAULT 'NORMAL' NOT NULL,
  published_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_announcements_company ON public.announcements(company_id);

-- 15. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  membership_id UUID NOT NULL REFERENCES public.memberships(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false NOT NULL,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_notifications_membership ON public.notifications(membership_id, is_read);

-- 16. Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  actor_membership_id UUID REFERENCES public.memberships(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_entity TEXT NOT NULL,
  target_id TEXT,
  diff JSONB,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_company ON public.audit_logs(company_id, target_entity);

-- 17. Seed Initial Data for WEVO Demo
INSERT INTO public.companies (name, slug, currency, timezone) 
VALUES ('WEVO Tech Hub', 'wevo', 'SAR', 'Asia/Riyadh')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.branches (company_id, name, latitude, longitude, radius_meters)
SELECT id, 'مقر الرياض - برج المملكة', 24.7116, 46.6744, 150.0
FROM public.companies WHERE slug = 'wevo'
LIMIT 1;

-- Todos fallback table (for backwards compatibility)
CREATE TABLE IF NOT EXISTS public.todos (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);
INSERT INTO public.todos (name, is_complete) VALUES 
('تهيئة منصة WEVO على Next.js 16 و Node.js', true),
('بناء مخطط Prisma وقاعدة بيانات Supabase', true),
('إعداد عزل المستأجرين والتحقق الجغرافي بالـ GPS', true),
('الرفع إلى GitHub والنشر على سيرفر Hostinger', false)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- Allow public access for development / demo (can be hardened with JWT in production)
CREATE POLICY "Allow anon read all" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Allow anon read branches" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Allow anon all on todos" ON public.todos FOR ALL USING (true) WITH CHECK (true);
