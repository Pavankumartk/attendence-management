"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, readSession } from "@/utils/session";
import type { CorporateSession } from "@/types/corporate";

// Existing personal workforce attendance used by Corporate and University staff.
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


const universityStaffPersonalItems = [
  { href: "/attendance-management", icon: "⌂", label: "Staff clock dashboard" },
  { href: "/attendance-management/attendance-calendar", icon: "▦", label: "My staff attendance calendar" },
  { href: "/attendance-management/daily-detail", icon: "◷", label: "Daily staff attendance" },
  { href: "/attendance-management/leave", icon: "✉", label: "Staff leave & balance" },
  { href: "/attendance-management/holidays", icon: "☼", label: "University holiday calendar" },
  { href: "/attendance-management/roster", icon: "▤", label: "My work roster" },
  { href: "/attendance-management/correction", icon: "↺", label: "Staff attendance correction" },
  { href: "/attendance-management/history", icon: "☑", label: "Staff approval history" },
  { href: "/attendance-management/profile", icon: "●", label: "My staff profile" },
  { href: "/attendance-management/notifications", icon: "♧", label: "Notifications" }
];

// CORPORATE — unchanged.
const managerItems = [
  { href: "/attendance-management/team/team-today", icon: "♙", label: "Team today" },
  { href: "/attendance-management/team/team-calendar", icon: "▦", label: "Team calendar" },
  { href: "/attendance-management/team/pending-approvals", icon: "☑", label: "Pending approvals" },
  { href: "/attendance-management/team/shift-roster", icon: "◷", label: "Shift roster" },
  { href: "/attendance-management/team/team-exceptions", icon: "⚑", label: "Team exceptions" },
  { href: "/attendance-management/team/staffing-coverage", icon: "▥", label: "Staffing coverage" },
  { href: "/attendance-management/team/team-analytics", icon: "▤", label: "Team analytics" }
];

const hrItems = [
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
  { href: "/attendance-management/administration/organization-setup", icon: "⌂", label: "Organization setup" },
  { href: "/attendance-management/administration/sites-branches", icon: "⌖", label: "Sites & branches" },
  { href: "/attendance-management/administration/employee-provisioning", icon: "♙", label: "Employee provisioning" },
  { href: "/attendance-management/administration/roles-permissions", icon: "♧", label: "Roles & permissions" },
  { href: "/attendance-management/administration/sso-security", icon: "▣", label: "SSO & security" },
  { href: "/attendance-management/administration/integrations-apis", icon: "⇄", label: "Integrations & APIs" },
  { href: "/attendance-management/administration/feature-settings", icon: "⚙", label: "Feature settings" },
  { href: "/attendance-management/administration/audit-log", icon: "≡", label: "Audit log" }
];

// UNIVERSITY STUDENT — academic attendance only. No payroll, paid leave or employee shift roster.
const studentAcademicItems = [
  { href: "/attendance-management/university/student/overview", icon: "⌂", label: "Attendance overview" },
  { href: "/attendance-management/university/student/subject-attendance", icon: "▦", label: "Subject attendance" },
  { href: "/attendance-management/university/student/attendance-calendar", icon: "◷", label: "Attendance calendar" },
  { href: "/attendance-management/university/student/session-history", icon: "▤", label: "Class / session history" },
  { href: "/attendance-management/university/student/attendance-correction", icon: "↺", label: "Attendance correction" },
  { href: "/attendance-management/university/student/request-history", icon: "☑", label: "Request history" },
  { href: "/attendance-management/university/student/academic-calendar", icon: "☼", label: "Academic calendar" },
  { href: "/attendance-management/university/student/notifications", icon: "♧", label: "Notifications" },
  { href: "/attendance-management/university/student/profile", icon: "●", label: "Academic profile" }
];

const facultyItems = [
  { href: "/attendance-management/university/faculty/assigned-classes", icon: "▦", label: "Assigned classes" },
  { href: "/attendance-management/university/faculty/take-attendance", icon: "☑", label: "Take class attendance" },
  { href: "/attendance-management/university/faculty/student-attendance", icon: "♙", label: "Student attendance" },
  { href: "/attendance-management/university/faculty/pending-corrections", icon: "↺", label: "Pending corrections" },
  { href: "/attendance-management/university/faculty/attendance-issues", icon: "⚑", label: "Attendance issues" },
  { href: "/attendance-management/university/faculty/batch-monitoring", icon: "▥", label: "Batch / class monitoring" },
  { href: "/attendance-management/university/faculty/class-analytics", icon: "▤", label: "Class analytics" }
];

const departmentCoordinatorItems = [
  { href: "/attendance-management/university/department/department-overview", icon: "▦", label: "Department overview" },
  { href: "/attendance-management/university/department/faculty-attendance", icon: "♙", label: "Faculty staff attendance" },
  { href: "/attendance-management/university/department/student-attendance", icon: "◎", label: "Student attendance" },
  { href: "/attendance-management/university/department/escalated-cases", icon: "☑", label: "Escalated cases" },
  { href: "/attendance-management/university/department/batch-class-monitoring", icon: "▥", label: "Batch / class monitoring" },
  { href: "/attendance-management/university/department/department-analytics", icon: "▤", label: "Department analytics" }
];

const universityAdminItems = [
  { href: "/attendance-management/university/admin/university-overview", icon: "▦", label: "University overview" },
  { href: "/attendance-management/university/admin/department-attendance", icon: "⌂", label: "Department attendance" },
  { href: "/attendance-management/university/admin/faculty-attendance", icon: "♙", label: "Faculty staff attendance" },
  { href: "/attendance-management/university/admin/student-attendance", icon: "◎", label: "Student academic attendance" },
  { href: "/attendance-management/university/admin/final-escalations", icon: "☑", label: "Final escalations" },
  { href: "/attendance-management/university/admin/academic-calendar", icon: "☼", label: "Campus & academic calendar" },
  { href: "/attendance-management/university/admin/attendance-reports", icon: "▤", label: "Attendance reports" }
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

  const isUniversityStudent =
    user?.tenant === "UNIVERSITY_COLLEGE" && user.role === "STUDENT";

  let personalNav = personalItems;
  let personalTitle = "MY ATTENDANCE";
  let extraItems: Array<{ href: string; icon: string; label: string }> = [];
  let extraTitle = "";

  if (isUniversityStudent) {
    personalNav = studentAcademicItems;
    personalTitle = "MY ACADEMIC ATTENDANCE";
  }

  // Corporate behavior remains unchanged.
  if (user?.tenant === "CORPORATE") {
    if (user.level === "SUPERVISOR") {
      extraItems = managerItems;
      extraTitle = "TEAM MANAGEMENT";
    }

    if (user.level === "COORDINATOR") {
      extraItems = hrItems;
      extraTitle = "WORKFORCE MANAGEMENT";
    }

    if (user.level === "ADMIN") {
      extraItems = adminItems;
      extraTitle = "ADMINISTRATION";
    }
  }

  // University staff keep their own workforce attendance and get a separate academic role area.
  if (user?.tenant === "UNIVERSITY_COLLEGE") {
    if (user.role === "FACULTY") {
      personalNav = universityStaffPersonalItems;
      personalTitle = "MY STAFF ATTENDANCE";
      extraItems = facultyItems;
      extraTitle = "STUDENT / CLASS ATTENDANCE";
    }

    if (user.role === "DEPARTMENT_COORDINATOR") {
      personalNav = universityStaffPersonalItems;
      personalTitle = "MY STAFF ATTENDANCE";
      extraItems = departmentCoordinatorItems;
      extraTitle = "DEPARTMENT ATTENDANCE";
    }

    if (user.role === "UNIVERSITY_ADMIN") {
      personalNav = universityStaffPersonalItems;
      personalTitle = "MY STAFF ATTENDANCE";
      extraItems = universityAdminItems;
      extraTitle = "UNIVERSITY ATTENDANCE OVERSIGHT";
    }
  }

  const attendanceHome = isUniversityStudent
    ? "/attendance-management/university/student/overview"
    : "/attendance-management";

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

      {!isUniversityStudent && (
        <Link
          href="/dashboard"
          className={`main-nav ${pathname === "/dashboard" ? "active" : ""}`}
        >
          <span className="nav-icon">⌂</span>
          <span>Dashboard</span>
        </Link>
      )}

      <Link
        href={attendanceHome}
        className={`main-nav ${attendanceOpen ? "active" : ""}`}
      >
        <span className="nav-icon">◷</span>
        <span>Attendance Management</span>
      </Link>

      {attendanceOpen && (
        <div className="attendance-subnav">
          <div className="sidebar-section-title">{personalTitle}</div>

          {personalNav.map((item) => (
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
              <div className="sidebar-section-title">{extraTitle}</div>

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
          {user?.name || "Attendance user"} · {user?.employeeId || "—"}
        </span>
      </div>

      <button className="soft-button logout-button" onClick={signOut}>
        Sign out
      </button>
    </aside>
  );
}
