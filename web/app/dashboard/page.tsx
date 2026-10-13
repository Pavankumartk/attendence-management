"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { readSession } from "@/utils/session";
import type { CorporateSession } from "@/types/corporate";

export default function DashboardPage() {
  const [user, setUser] =
    useState<CorporateSession | null>(null);

  useEffect(() => {
    setUser(readSession());
  }, []);

  const firstName =
    user?.name?.split(" ").filter(Boolean)[0] ||
    "User";

  return (
    <AppShell
      eyebrow="ATTENDANCE DASHBOARD"
      title={`Welcome back, ${firstName} 👋`}
      subtitle={`${user?.tenantLabel || "Tenant"} · ${
        user?.roleLabel || "Attendance role"
      }`}
    >
      <div className="dashboard-grid">
        <section className="panel">
          <h2>My Attendance</h2>

          <p>
            Your own Clock In, Break, Clock Out,
            attendance records, leave and corrections.
          </p>

          <Link
            href="/attendance-management"
            className="soft-button primary"
          >
            Open My Attendance →
          </Link>
        </section>

        {user?.level !== "MEMBER" && (
          <section className="panel">
            <h2>
              {user?.authority?.areaTitle ||
                "Role Workspace"}
            </h2>

            <p>
              {user?.authority?.responsibility ||
                "View your role responsibilities."}
            </p>

            <Link
              href="/attendance-management/role-workspace"
              className="soft-button"
            >
              Open Role Workspace →
            </Link>
          </section>
        )}
      </div>
    </AppShell>
  );
}
