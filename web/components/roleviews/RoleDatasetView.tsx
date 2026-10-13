"use client";

import {
  adminViews,
  hrViews,
  managerViews
} from "@/data/corporateRoleData";
import {
  DataTable,
  Panel,
  StatCard,
  StatusPill
} from "@/components/attendance/UI";
import ApprovalActionView from "./ApprovalActionView";

export default function RoleDatasetView({
  area,
  view
}: {
  area: "manager" | "hr" | "admin";
  view: string;
}) {
  // These role screens require actions, not only read-only tables.
  if (area === "manager" && view === "pending-approvals") {
    return <ApprovalActionView area="manager" />;
  }

  if (area === "hr" && view === "exception-queue") {
    return <ApprovalActionView area="hr" />;
  }

  if (area === "admin" && view === "audit-log") {
    return <ApprovalActionView area="admin" />;
  }

  const dataset =
    area === "manager"
      ? managerViews[view]
      : area === "hr"
        ? hrViews[view]
        : adminViews[view];

  if (!dataset) {
    return (
      <Panel title="View unavailable">
        <p className="muted">No data configured for this view.</p>
      </Panel>
    );
  }

  const cards =
    area === "manager"
      ? [
          ["TEAM SIZE", "22", "Direct reports", "blue"],
          ["PRESENT", "18", "Today", "success"],
          ["ON LEAVE", "2", "Today", "warning"],
          ["OPEN ISSUES", "3", "Needs action", "danger"]
        ]
      : area === "hr"
        ? [
            ["WORKFORCE", "624", "Employees", "blue"],
            ["PRESENT", "589", "Today", "success"],
            ["ON LEAVE", "21", "Today", "warning"],
            ["EXCEPTIONS", "17", "Open cases", "danger"]
          ]
        : [
            ["EMPLOYEES", "624", "Corporate scope", "blue"],
            ["SITES", "3", "Active", "success"],
            ["ROLES", "4", "Corporate roles", "warning"],
            ["AUDIT ITEMS", "12", "Recent actions", "danger"]
          ];

  return (
    <>
      <div className="stats-grid role-stats-gap">
        {cards.map(([label, value, note, tone]) => (
          <StatCard
            key={label}
            label={label}
            value={value}
            note={note}
            tone={tone as "" | "success" | "warning" | "danger" | "blue"}
          />
        ))}
      </div>

      <Panel title={dataset.title}>
        <div className="notice role-view-intro">
          {dataset.subtitle}
        </div>

        <DataTable
          headers={dataset.headers}
          rows={dataset.rows.map((row) =>
            row.map((cell, index) => {
              if (index !== row.length - 1) {
                return cell;
              }

              const normalized = cell.toLowerCase();

              const tone =
                normalized.includes("active") ||
                normalized.includes("accepted") ||
                normalized.includes("ready") ||
                normalized.includes("healthy") ||
                normalized.includes("published") ||
                normalized.includes("connected") ||
                normalized === "none"
                  ? "success"
                  : normalized.includes("pending") ||
                      normalized.includes("review") ||
                      normalized.includes("progress") ||
                      normalized.includes("draft") ||
                      normalized.includes("late")
                    ? "warning"
                    : normalized.includes("open") ||
                        normalized.includes("escalated") ||
                        normalized.includes("no punch")
                      ? "danger"
                      : "neutral";

              return (
                <StatusPill key={index} tone={tone}>
                  {cell}
                </StatusPill>
              );
            })
          )}
        />
      </Panel>
    </>
  );
}
