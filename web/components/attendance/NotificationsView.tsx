"use client";

import { notificationPreferences } from "@/data/employeeAttendance";
import { Panel } from "./UI";
import Link from "next/link";

export default function NotificationsView() {
  return (
    <Panel title="Notifications">
      {notificationPreferences.map(([label, enabled]) => (
        <label className="check-row" key={label}>
          <input type="checkbox" defaultChecked={enabled} />
          {label}
        </label>
      ))}

      <div className="notification-list">
        <div className="activity-row">
          <div className="mini-icon">!</div>

          <div>
            <b>Missing clock-out detected</b>
            <small>
              09 Oct 2026 · Submit correction before cutoff.
            </small>
          </div>

          <div className="spacer" />

          <Link
            href="/attendance-management/correction"
            className="soft-button compact"
          >
            Resolve →
          </Link>
        </div>
      </div>
    </Panel>
  );
}
