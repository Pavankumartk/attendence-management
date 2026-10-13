import type {
  AttendanceRoleCode,
  CorporateSession,
  TenantKey
} from "@/types/corporate";
import {
  buildSession,
  findSessionByLegacyRole,
  isTenantKey
} from "@/data/tenantConfig";

const SESSION_KEY = "attendance_frontend_session";

export function saveSession(
  tenant: TenantKey,
  role: AttendanceRoleCode
) {
  const session = buildSession(tenant, role);
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function readSession(): CorporateSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as {
      tenant?: string;
      role?: string;
    };

    // Compatibility with the older Corporate-only frontend.
    if (parsed.role && (!parsed.tenant || parsed.tenant === "Corporate")) {
      const legacy = findSessionByLegacyRole(parsed.role);
      if (legacy) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(legacy));
        return legacy;
      }
    }

    if (
      parsed.tenant &&
      isTenantKey(parsed.tenant) &&
      parsed.role
    ) {
      const rebuilt = buildSession(
        parsed.tenant,
        parsed.role as AttendanceRoleCode
      );
      localStorage.setItem(SESSION_KEY, JSON.stringify(rebuilt));
      return rebuilt;
    }

    return null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
