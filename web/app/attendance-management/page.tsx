"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AttendanceModule from "@/components/attendance/AttendanceModule";
import { readSession } from "@/utils/session";
import type { CorporateSession } from "@/types/corporate";

export default function AttendanceHomePage() {
  const router = useRouter();
  const [user, setUser] = useState<CorporateSession | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = readSession();
    setUser(session);
    setReady(true);

    if (
      session?.tenant === "UNIVERSITY_COLLEGE" &&
      session.role === "STUDENT"
    ) {
      router.replace("/attendance-management/university/student/overview");
    }
  }, [router]);

  if (!ready) return null;

  if (user?.tenant === "UNIVERSITY_COLLEGE" && user.role === "STUDENT") {
    return null;
  }

  return <AttendanceModule section="home" />;
}
