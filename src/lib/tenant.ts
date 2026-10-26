import { prisma } from "@/lib/prisma";
import { Role } from "@/types";

export interface TenantContext {
  userId: string;
  userEmail: string;
  userName: string;
  membershipId: string;
  companyId: string;
  companyName: string;
  companySlug: string;
  role: Role;
  branchId?: string | null;
}

/**
 * Server-side tenant authorization guard.
 * Validates that the user is an active member of the requested company with an authorized role.
 * NEVER trusts client-supplied companyId or role.
 */
export async function requireTenantMembership(
  userId: string,
  companySlug: string,
  allowedRoles: Role[] = ["EMPLOYEE", "SUPERVISOR", "COMPANY_ADMIN", "COMPANY_OWNER", "PLATFORM_ADMIN"]
): Promise<TenantContext> {
  if (!userId || !companySlug) {
    throw new Error("Unauthorized: Missing user authentication or company context");
  }

  const membership = await prisma.membership.findFirst({
    where: {
      userId,
      isActive: true,
      company: {
        slug: companySlug,
        isActive: true,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          fullName: true,
          isPlatformAdmin: true,
        },
      },
      company: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!membership) {
    throw new Error("Forbidden: You do not have an active membership in this company");
  }

  const userRole = membership.role as Role;

  // Platform admin has bypass access
  if (membership.user.isPlatformAdmin) {
    return {
      userId: membership.user.id,
      userEmail: membership.user.email,
      userName: membership.user.fullName,
      membershipId: membership.id,
      companyId: membership.company.id,
      companyName: membership.company.name,
      companySlug: membership.company.slug,
      role: "PLATFORM_ADMIN",
      branchId: membership.branchId,
    };
  }

  if (!allowedRoles.includes(userRole)) {
    throw new Error("Forbidden: Insufficient role permissions for this operation");
  }

  return {
    userId: membership.user.id,
    userEmail: membership.user.email,
    userName: membership.user.fullName,
    membershipId: membership.id,
    companyId: membership.company.id,
    companyName: membership.company.name,
    companySlug: membership.company.slug,
    role: userRole,
    branchId: membership.branchId,
  };
}
