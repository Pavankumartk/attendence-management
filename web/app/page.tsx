"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getDefaultRole,
  getRoleOptions,
  tenantOptions
} from "@/data/tenantConfig";
import type {
  AttendanceRoleCode,
  TenantKey
} from "@/types/corporate";
import { saveSession } from "@/utils/session";

export default function SignInPage() {
  const router = useRouter();
  const [tenant, setTenant] = useState<TenantKey>("CORPORATE");
  const [role, setRole] = useState<AttendanceRoleCode>("EMPLOYEE");

  const roles = useMemo(() => getRoleOptions(tenant), [tenant]);

  function changeTenant(nextTenant: TenantKey) {
    setTenant(nextTenant);
    setRole(getDefaultRole(nextTenant));
  }

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveSession(tenant, role);

    if (tenant === "UNIVERSITY_COLLEGE" && role === "STUDENT") {
      router.push("/attendance-management/university/student/overview");
      return;
    }

    router.push("/dashboard");
  }

  const isUniversityStudent =
    tenant === "UNIVERSITY_COLLEGE" && role === "STUDENT";

  return (
    <main className="signin-page">
      <section className="signin-card">
        <div className="signin-brand">
          <div className="brand-logo large">◷</div>
          <div>
            <h1>
              Attend<span>Flow</span>
            </h1>
            <p>Attendance management</p>
          </div>
        </div>

        <div className="signin-copy">
          <div className="eyebrow">SIGN IN</div>
          <h2>Choose your attendance workspace</h2>
          <p>Select your tenant and role.</p>
        </div>

        <form onSubmit={signIn}>
          <label className="field-label">
            <span>Tenant</span>
            <select
              className="neo-field"
              value={tenant}
              onChange={(event) =>
                changeTenant(event.target.value as TenantKey)
              }
            >
              {tenantOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field-label">
            <span>Role</span>
            <select
              className="neo-field"
              value={role}
              onChange={(event) =>
                setRole(event.target.value as AttendanceRoleCode)
              }
            >
              {roles.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <div className="signin-note">
            {isUniversityStudent ? (
              <>
                Students use <b>academic class/session attendance</b>, subject attendance,
                corrections and request history. Employee paid leave, payroll and work-shift
                features are not shown to Students.
              </>
            ) : (
              <>
                Staff and workforce roles keep their own <b>personal attendance</b> area,
                separate from the people they manage.
              </>
            )}
          </div>

          <button className="soft-button primary signin-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
