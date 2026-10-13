"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, readSession } from "@/utils/session";
import type { CorporateSession } from "@/types/corporate";

const personalItems = [
  { href: "/attendance-management", icon: "⌂", label: "Clock dashboard" },
  { href: "/attendance-management/attendance-calendar", icon: "▦", label: "Attendance calendar" },
  { href: "/attendance-management/daily-detail", icon: "◷", label: "Daily attendance detail" },
  { href: "/attendance-management/leave", icon: "✉", label: "Leave request & balance" },
  { href: "/attendance-management/holidays", icon: "☼", label: "Holiday calendar" },
  { href: "/attendance-management/roster", icon: "▤", label: "My shift roster" },
  { href: "/attendance-management/correction", icon: "↺", label: "Correction request" },
  { href: "/attendance-management/history", icon: "☑", label: "Approval history" },
  { href: "/attendance-management/profile", icon: "●", label: "My profile" },
  { href: "/attendance-management/notifications", icon: "♧", label: "Notifications" }
];

const managerItems = [
  { href: "/attendance-management/role-workspace", icon: "◎", label: "Role & authority" },
  { href: "/attendance-management/team/team-today", icon: "♙", label: "Team today" },
  { href: "/attendance-management/team/team-calendar", icon: "▦", label: "Team calendar" },
  { href: "/attendance-management/team/pending-approvals", icon: "☑", label: "Pending approvals" },
  { href: "/attendance-management/team/shift-roster", icon: "◷", label: "Shift roster" },
  { href: "/attendance-management/team/team-exceptions", icon: "⚑", label: "Team exceptions" },
  { href: "/attendance-management/team/staffing-coverage", icon: "▥", label: "Staffing coverage" },
  { href: "/attendance-management/team/team-analytics", icon: "▤", label: "Team analytics" }
];

const hrItems = [
  { href: "/attendance-management/role-workspace", icon: "◎", label: "Role & authority" },
  { href: "/attendance-management/workforce/workforce-overview", icon: "▦", label: "Workforce overview" },
  { href: "/attendance-management/workforce/employee-360", icon: "◎", label: "Employee 360°" },
  { href: "/attendance-management/workforce/live-punches", icon: "◉", label: "Live punches" },
  { href: "/attendance-management/workforce/exception-queue", icon: "⚑", label: "Exception queue" },
  { href: "/attendance-management/workforce/policy-configuration", icon: "⚙", label: "Policy configuration" },
  { href: "/attendance-management/workforce/leave-ledger", icon: "▤", label: "Leave ledger" },
  { href: "/attendance-management/workforce/holiday-workweek", icon: "☼", label: "Holiday & workweek" },
  { href: "/attendance-management/workforce/monthly-close", icon: "✓", label: "Monthly close" },
  { href: "/attendance-management/workforce/payroll-bridge", icon: "⇧", label: "Payroll bridge" },
  { href: "/attendance-management/workforce/reports-analytics", icon: "▥", label: "Reports & analytics" },
  { href: "/attendance-management/workforce/imports-corrections", icon: "⇧", label: "Imports & corrections" }
];

const adminItems = [
  { href: "/attendance-management/role-workspace", icon: "◎", label: "Role & authority" },
  { href: "/attendance-management/administration/organization-setup", icon: "⌂", label: "Organization setup" },
  { href: "/attendance-management/administration/sites-branches", icon: "⌖", label: "Sites & branches" },
  { href: "/attendance-management/administration/employee-provisioning", icon: "♙", label: "Employee provisioning" },
  { href: "/attendance-management/administration/roles-permissions", icon: "♧", label: "Roles & permissions" },
  { href: "/attendance-management/administration/sso-security", icon: "▣", label: "SSO & security" },
  { href: "/attendance-management/administration/integrations-apis", icon: "⇄", label: "Integrations & APIs" },
  { href: "/attendance-management/administration/feature-settings", icon: "⚙", label: "Feature settings" },
  { href: "/attendance-management/administration/audit-log", icon: "≡", label: "Audit log" }
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<CorporateSession | null>(null);

  const attendanceOpen = pathname.startsWith("/attendance-management");

  useEffect(() => {
    setUser(readSession());
  }, []);

  function active(href: string) {
    return href === "/attendance-management"
      ? pathname === href
      : pathname.startsWith(href);
  }

  function signOut() {
    clearSession();
    router.replace("/");
  }

  let extraItems: Array<{
    href: string;
    icon: string;
    label: string;
  }> = [];

  const extraTitle = user?.authority?.areaTitle || "ROLE WORKSPACE";

  if (user?.tenant === "CORPORATE") {
    if (user.level === "SUPERVISOR") {
      extraItems = managerItems;
    }

    if (user.level === "COORDINATOR") {
      extraItems = hrItems;
    }

    if (user.level === "ADMIN") {
      extraItems = adminItems;
    }
  } else if (user && user.level !== "MEMBER") {
    extraItems = [
      {
        href: "/attendance-management/role-workspace",
        icon: "◎",
        label: "Role & authority"
      }
    ];
  }

  return (
    <aside className="app-sidebar">
      <div className="brand">
        <div className="brand-logo">◷</div>

        <div>
          <strong>
            Attend<span>Flow</span>
          </strong>

          <small>{user?.tenantLabel || "Attendance"}</small>
        </div>
      </div>

      <div className="sidebar-section-title">MAIN</div>

      <Link
        href="/dashboard"
        className={`main-nav ${pathname === "/dashboard" ? "active" : ""}`}
      >
        <span className="nav-icon">⌂</span>
        <span>Dashboard</span>
      </Link>

      <Link
        href="/attendance-management"
        className={`main-nav ${attendanceOpen ? "active" : ""}`}
      >
        <span className="nav-icon">◷</span>
        <span>Attendance Management</span>
      </Link>

      {attendanceOpen && (
        <div className="attendance-subnav">
          <div className="sidebar-section-title">MY ATTENDANCE</div>

          {personalItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sub-nav ${active(item.href) ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          {extraItems.length > 0 && (
            <>
              <div className="sidebar-section-title">
                {extraTitle}
              </div>

              {extraItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sub-nav ${active(item.href) ? "active" : ""}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </>
          )}
        </div>
      )}

      <div className="sidebar-footer">
        <b>{user?.roleLabel || "Attendance user"}</b>

        <span>{user?.tenantLabel || "Tenant"}</span>

        <span>
          {user?.name || "Attendance user"} ·{" "}
          {user?.employeeId || "—"}
        </span>
      </div>

      <button
        className="soft-button logout-button"
        onClick={signOut}
      >
        Sign out
      </button>
    </aside>
  );
}
