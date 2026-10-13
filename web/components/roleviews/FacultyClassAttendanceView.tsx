"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable, Panel, StatCard, StatusPill } from "@/components/attendance/UI";

const STORAGE_KEY = "university_class_attendance_v1";

type StudentStatus = "Present" | "Absent" | "Late" | "Excused";

type StudentRow = {
  id: string;
  name: string;
  registerNo: string;
  status: StudentStatus;
};

const initialStudents: StudentRow[] = [
  { id: "STU-2401", name: "Riya Patel", registerNo: "CSE26-001", status: "Present" },
  { id: "STU-2407", name: "Aarav Menon", registerNo: "CSE26-007", status: "Present" },
  { id: "STU-2412", name: "Nisha Roy", registerNo: "CSE26-012", status: "Absent" },
  { id: "STU-2418", name: "Vikram Das", registerNo: "CSE26-018", status: "Late" },
  { id: "STU-2423", name: "Megha Rao", registerNo: "CSE26-023", status: "Present" }
];

export default function FacultyClassAttendanceView() {
  const [subject, setSubject] = useState("CS301 · Data Structures");
  const [sessionDate, setSessionDate] = useState("2026-10-14");
  const [students, setStudents] = useState<StudentRow[]>(initialStudents);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const saved = JSON.parse(raw) as {
        subject?: string;
        sessionDate?: string;
        students?: StudentRow[];
      };

      if (saved.subject) setSubject(saved.subject);
      if (saved.sessionDate) setSessionDate(saved.sessionDate);
      if (saved.students?.length) setStudents(saved.students);
    } catch {
      // Keep the demo defaults if stored browser data is invalid.
    }
  }, []);

  const totals = useMemo(() => {
    const count = (status: StudentStatus) =>
      students.filter((student) => student.status === status).length;

    return {
      present: count("Present"),
      absent: count("Absent"),
      late: count("Late"),
      excused: count("Excused")
    };
  }, [students]);

  function updateStatus(id: string, status: StudentStatus) {
    setStudents((current) =>
      current.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
    setMessage("");
  }

  function markAllPresent() {
    setStudents((current) =>
      current.map((student) => ({ ...student, status: "Present" }))
    );
    setMessage("");
  }

  function saveAttendance() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        subject,
        sessionDate,
        batch: "B.Tech CSE · 2026-A",
        campus: "Main Campus · C-204",
        students,
        savedAt: new Date().toISOString()
      })
    );

    setMessage(
      `Attendance saved for ${subject} on ${sessionDate}. This is frontend demo storage only.`
    );
  }

  return (
    <>
      <div className="stats-grid role-stats-gap">
        <StatCard label="PRESENT" value={totals.present} note="Marked present" tone="success" />
        <StatCard label="ABSENT" value={totals.absent} note="Marked absent" tone="danger" />
        <StatCard label="LATE" value={totals.late} note="Late / partial" tone="warning" />
        <StatCard label="EXCUSED" value={totals.excused} note="Authorized exception" tone="blue" />
      </div>

      <Panel title="Class attendance register">
        <div className="form-grid">
          <label className="field-label">
            <span>Assigned subject</span>
            <select
              className="neo-field"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              <option>CS301 · Data Structures</option>
              <option>CS305 · Algorithms</option>
              <option>CS221 · Programming Lab</option>
            </select>
          </label>

          <label className="field-label">
            <span>Session date</span>
            <input
              className="neo-field"
              type="date"
              value={sessionDate}
              onChange={(event) => setSessionDate(event.target.value)}
            />
          </label>
        </div>

        <div className="notice">
          <b>Batch:</b> B.Tech CSE · 2026-A · <b>Campus:</b> Main Campus · C-204
        </div>

        <DataTable
          headers={["Student", "Register no.", "Attendance status", "Current status"]}
          rows={students.map((student) => [
            <span key={`${student.id}-name`}>
              <b>{student.name}</b>
              <small className="table-sub">{student.id}</small>
            </span>,
            student.registerNo,
            <select
              key={`${student.id}-select`}
              className="neo-field"
              value={student.status}
              onChange={(event) =>
                updateStatus(student.id, event.target.value as StudentStatus)
              }
            >
              <option>Present</option>
              <option>Absent</option>
              <option>Late</option>
              <option>Excused</option>
            </select>,
            <StatusPill
              key={`${student.id}-status`}
              tone={
                student.status === "Present"
                  ? "success"
                  : student.status === "Absent"
                    ? "danger"
                    : student.status === "Late"
                      ? "warning"
                      : "info"
              }
            >
              {student.status}
            </StatusPill>
          ])}
        />

        <div className="button-row top-gap">
          <button type="button" className="soft-button" onClick={markAllPresent}>
            Mark all Present
          </button>
          <button type="button" className="soft-button primary" onClick={saveAttendance}>
            Save class attendance
          </button>
        </div>

        {message && <div className="notice success-notice">{message}</div>}
      </Panel>
    </>
  );
}
