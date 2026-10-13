"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { readSession } from "@/utils/session";
import type { CorporateSession } from "@/types/corporate";

export default function RoleWorkspacePage() {
  const [user, setUser] =
    useState<CorporateSession | null>(null);

  useEffect(() => {
    setUser(readSession());
  }, []);

  return (
    <AppShell
      eyebrow="ROLE WORKSPACE"
      title={user?.roleLabel || "Role responsibilities"}
      subtitle={
        user?.authority?.responsibility ||
        "Your attendance role and authority."
      }
    >
      <section className="panel">
        <h2>
          {user?.authority?.areaTitle ||
            "Role Authority"}
        </h2>

        <p>
          <b>Your scope:</b>{" "}
          {user?.authority?.scope || "Assigned scope"}
        </p>

        <p>
          <b>Escalation:</b>{" "}
          {user?.authority?.escalation ||
            "According to your role hierarchy"}
        </p>
      </section>
    </AppShell>
  );
}
