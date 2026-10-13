"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Panel, StatCard, StatusPill } from "./UI";
import type { AttendanceStatus } from "@/data/employeeAttendance";

export default function AttendanceCalendar() {
  const [cursor, setCursor] = useState(new Date(2026, 9, 1));
  const [selectedDay, setSelectedDay] = useState(10);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const blanks = new Date(year, month, 1).getDay();

  const selectedStatus = getStatus(year, month, selectedDay);

  const monthLabel = cursor.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const selectedDateLabel = useMemo(
    () =>
      new Date(year, month, selectedDay).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }),
    [year, month, selectedDay]
  );

  function moveMonth(delta: number) {
    const next = new Date(year, month + delta, 1);
    setCursor(next);
    setSelectedDay(1);
  }

  return (
    <>
      <div className="stats-grid">
        <StatCard label="PRESENT" value="18" note="Sample month" tone="success" />
        <StatCard label="LEAVE" value="2" note="Sample month" tone="warning" />
        <StatCard label="ABSENT" value="1" note="Sample month" tone="danger" />
        <StatCard label="HOLIDAYS / OFF" value="9" note="Sample month" />
      </div>

      <div className="two-col-grid">
        <Panel title="Attendance calendar">
          <div className="calendar-toolbar">
            <div className="button-row">
              <button className="soft-button compact" onClick={() => moveMonth(-1)}>
                ← Previous
              </button>

              <button className="soft-button compact" onClick={() => moveMonth(1)}>
                Next →
              </button>
            </div>

            <b>{monthLabel}</b>
          </div>

          <div className="calendar-grid">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
              <div className="weekday" key={day}>
                {day}
              </div>
            ))}

            {Array.from({ length: blanks }).map((_, index) => (
              <div className="calendar-blank" key={`blank-${index}`} />
            ))}

            {Array.from({ length: days }).map((_, index) => {
              const day = index + 1;
              const status = getStatus(year, month, day);
              const dotClass = getDotClass(status);

              return (
                <button
                  className={`calendar-day ${selectedDay === day ? "selected" : ""}`}
                  key={day}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                  <span className={`calendar-dot ${dotClass}`} />
                </button>
              );
            })}
          </div>

          <div className="notice">
            Green = present · Gold = leave · Red = absent · Grey = holiday/off.
          </div>
        </Panel>

        <Panel title="Selected day details">
          <div className="label">DATE</div>
          <h2 className="selected-date">{selectedDateLabel}</h2>

          <Kpi
            label="Day status"
            value={
              <StatusPill tone={getTone(selectedStatus)}>
                {selectedStatus}
              </StatusPill>
            }
          />

          <Kpi
            label="First punch"
            value={selectedStatus === "Present" ? "09:00 AM" : "—"}
          />

          <Kpi
            label="Last punch"
            value={selectedStatus === "Present" ? "06:00 PM" : "—"}
          />

          <Kpi
            label="Net worked"
            value={selectedStatus === "Present" ? "8h 30m" : "—"}
          />

          <Kpi label="Calculation version" value="Standard v2.1" />

          <Link
            href="/attendance-management/daily-detail"
            className="soft-button compact"
          >
            Open daily detail →
          </Link>
        </Panel>
      </div>
    </>
  );
}

function getStatus(
  year: number,
  month: number,
  day: number
): AttendanceStatus {
  const date = new Date(year, month, day);
  const weekend = date.getDay() === 0 || date.getDay() === 6;

  if (day === 2 || day === 12) return "Leave";
  if (day === 6) return "Absent";
  if (weekend) return "Holiday / off";
  return "Present";
}

function getDotClass(status: AttendanceStatus) {
  if (status === "Leave") return "leave";
  if (status === "Absent") return "absent";
  if (status === "Holiday / off") return "off";
  return "present";
}

function getTone(status: AttendanceStatus) {
  if (status === "Present") return "success";
  if (status === "Absent") return "danger";
  if (status === "Leave") return "warning";
  return "neutral";
}

function Kpi({
  label,
  value
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="kpi">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
