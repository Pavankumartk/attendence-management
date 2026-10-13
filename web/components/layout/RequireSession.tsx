"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readSession } from "@/utils/session";

export default function RequireSession({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = readSession();

    if (!session) {
      router.replace("/");
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) {
    return <div className="page-loader">Loading attendance workspace…</div>;
  }

  return <>{children}</>;
}
