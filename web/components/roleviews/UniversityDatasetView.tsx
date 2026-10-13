"use client";

import {
  getUniversityViewData,
  type UniversityArea
} from "@/data/universityRoleData";
import {
  DataTable,
  Panel,
  StatCard,
  StatusPill
} from "@/components/attendance/UI";
import FacultyClassAttendanceView from "./FacultyClassAttendanceView";
import UniversityApprovalActionView from "./UniversityApprovalActionView";
import UniversityStudentCorrectionView from "./UniversityStudentCorrectionView";
import UniversityStudentRequestHistoryView from "./UniversityStudentRequestHistoryView";

export default function UniversityDatasetView({
  area,
  view
}: {
  area: UniversityArea;
  view: string;
}) {
  if (area === "student" && view === "attendance-correction") {
    return <UniversityStudentCorrectionView />;
  }

  if (area === "student" && view === "request-history") {
    return <UniversityStudentRequestHistoryView />;
  }

  if (area === "faculty" && view === "take-attendance") {
    return <FacultyClassAttendanceView />;
  }

  if (area === "faculty" && view === "pending-corrections") {
    return <UniversityApprovalActionView area="faculty" />;
  }

  if (area === "department" && view === "escalated-cases") {
    return <UniversityApprovalActionView area="coordinator" />;
  }

  if (area === "admin" && view === "final-escalations") {
    return <UniversityApprovalActionView area="admin" />;
  }

  const dataset = getUniversityViewData(area, view);

  if (!dataset) {
    return (
      <Panel title="University attendance view unavailable">
        <p className="muted">No academic attendance data is configured for this view.</p>
      </Panel>
    );
  }

  const cards =
    area === "student"
      ? [
          ["CURRENT TERM", "Semester 5", "B.Tech CSE · 2026-A", "blue"],
          ["SUBJECTS", "4", "Attendance tracked by class", "success"],
          ["AVERAGE ATTENDANCE", "89.9%", "Current term", "success"],
          ["OPEN CORRECTIONS", "1", "Awaiting academic review", "warning"]
        ]
      : area === "faculty"
        ? [
            ["ASSIGNED CLASSES", "3", "Current timetable", "blue"],
            ["STUDENTS", "112", "Assigned academic groups", "success"],
            ["SUBMISSION", "96%", "Attendance completed", "success"],
            ["OPEN CORRECTIONS", "3", "Needs Faculty review", "warning"]
          ]
        : area === "department"
          ? [
              ["FACULTY", "32", "Department scope", "blue"],
              ["STUDENTS", "780", "Academic groups", "success"],
              ["CLASS SUBMISSION", "96.4%", "Current period", "success"],
              ["ESCALATIONS", "5", "Needs Coordinator action", "warning"]
            ]
          : [
              ["DEPARTMENTS", "8", "University scope", "blue"],
              ["FACULTY", "214", "Academic staff", "success"],
              ["STUDENTS", "5,420", "Academic groups", "success"],
              ["FINAL CASES", "2", "Needs Admin action", "warning"]
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
        <div className="notice role-view-intro">{dataset.subtitle}</div>

        <DataTable
          headers={dataset.headers}
          rows={dataset.rows.map((row) =>
            row.map((cell, index) => {
              const header = dataset.headers[index] || "";
              const statusColumn =
                index === row.length - 1 &&
                ["Status", "Day status", "Record status"].includes(header);

              if (!statusColumn) return cell;

              const normalized = cell.toLowerCase();
              const tone =
                normalized.includes("healthy") ||
                normalized.includes("active") ||
                normalized.includes("approved") ||
                normalized.includes("published") ||
                normalized.includes("ready") ||
                normalized.includes("recorded") ||
                normalized.includes("complete")
                  ? "success"
                  : normalized.includes("review") ||
                      normalized.includes("pending") ||
                      normalized.includes("correction") ||
                      normalized.includes("awaiting")
                    ? "warning"
                    : normalized.includes("open") ||
                        normalized.includes("incomplete")
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
