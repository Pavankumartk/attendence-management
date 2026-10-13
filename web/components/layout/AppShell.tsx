"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import RequireSession from "./RequireSession";
import { readSession } from "@/utils/session";
import type { CorporateSession } from "@/types/corporate";

export default function AppShell({
  children,
  eyebrow,
  title,
  subtitle
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const [user, setUser] = useState<CorporateSession | null>(null);

  useEffect(() => {
    setUser(readSession());
  }, []);

  const displayName = user?.name || "Alex Carter";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <RequireSession>
      <div className="app-shell">
        <Sidebar />

        <main className="app-main">
          <header className="page-header">
            <div>
              <div className="eyebrow">{eyebrow}</div>
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>

            <div className="profile-block">
              <div className="avatar">{initials}</div>

              <div>
                <b>{displayName}</b>
                <small>
                  {user?.roleLabel || "Employee"} ·{" "}
                  {user?.employeeId || "EMP-1024"}
                </small>
              </div>
            </div>
          </header>

          {children}
        </main>
      </div>
    </RequireSession>
  );
}
