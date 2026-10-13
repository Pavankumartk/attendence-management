"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { employeeProfile } from "@/data/employeeAttendance";
import {
  addPunch,
  getClockState,
  getPunches,
  setClockState,
  type ClockState,
  type LocalPunch
} from "@/utils/localAttendance";
import { Panel, StatCard, StatusPill } from "./UI";

export default function ClockDashboard() {
  const [clockState, setState] = useState<ClockState>("NOT_STARTED");
  const [punches, setPunches] = useState<LocalPunch[]>([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    setState(getClockState());
    setPunches(getPunches());

    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const statusLabel = useMemo(() => {
    if (clockState === "WORKING") return "Working";
    if (clockState === "ON_BREAK") return "On break";
    if (clockState === "COMPLETED") return "Completed";
    return "Not started";
  }, [clockState]);

  const statusTone =
    clockState === "WORKING"
      ? "blue"
      : clockState === "COMPLETED"
        ? "success"
        : "warning";

  const progressClass =
    clockState === "NOT_STARTED"
      ? "progress-value progress-zero"
      : clockState === "COMPLETED"
        ? "progress-value progress-full"
        : "progress-value progress-working";

  function refresh() {
    setState(getClockState());
    setPunches(getPunches());
  }

  function clockIn() {
    if (getClockState() !== "NOT_STARTED") return;
    addPunch("IN");
    setClockState("WORKING");
    refresh();
  }

  function toggleBreak() {
    const current = getClockState();

    if (current === "WORKING") {
      addPunch("BREAK_START");
      setClockState("ON_BREAK");
    } else if (current === "ON_BREAK") {
      addPunch("BREAK_END");
      setClockState("WORKING");
    }

    refresh();
  }

  function clockOut() {
    const current = getClockState();

    if (current !== "WORKING" && current !== "ON_BREAK") return;

    if (current === "ON_BREAK") {
      addPunch("BREAK_END");
    }

    addPunch("OUT");
    setClockState("COMPLETED");
    refresh();
  }

  const firstIn = punches.find((p) => p.type === "IN");
  const breakEvent = punches.find(
    (p) => p.type === "BREAK_START" || p.type === "BREAK_END"
  );
  const lastOut = [...punches].reverse().find((p) => p.type === "OUT");

  return (
    <>
      <section className="hero-card">
        <div className="eyebrow">EMPLOYEE ATTENDANCE</div>
        <h2>Your attendance workspace</h2>
        <p>
          Clock in/out, review attendance, request leave, check roster and
          submit corrections.
        </p>

        <div className="chips">
          <span>Corporate</span>
          <span>Employee</span>
          <span>Bengaluru HQ</span>
        </div>
      </section>

      <div className="stats-grid">
        <StatCard
          label="TODAY'S STATUS"
          value={statusLabel}
          note="Current workday"
          tone={statusTone}
        />

        <StatCard
          label="HOURS WORKED"
          value={clockState === "NOT_STARTED" ? "00:00" : "04:12"}
          note="Breaks excluded"
        />

        <StatCard
          label="THIS MONTH"
          value="18 days"
          note="Illustrative present days"
        />

        <StatCard
          label="LEAVE BALANCE"
          value="12.5 days"
          note="Sample balance"
        />
      </div>

      <div className="two-col-grid">
        <Panel>
          <div className="clock-card">
            <div className="eyebrow">YOUR TIME CLOCK</div>

            <div className="live-clock">
              {now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </div>

            <div className="muted">
              {now.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </div>

            <div className="clock-ring">
              {clockState === "ON_BREAK"
                ? "Ⅱ"
                : clockState === "COMPLETED"
                  ? "✓"
                  : "◷"}
            </div>

            <b>
              {clockState === "NOT_STARTED"
                ? "Ready to start your day"
                : clockState === "WORKING"
                  ? "You are clocked in"
                  : clockState === "ON_BREAK"
                    ? "You are on break"
                    : "Workday completed"}
            </b>

            <div className="muted clock-sub">
              {firstIn
                ? `Clock-in ${firstIn.time}`
                : `Scheduled shift · ${employeeProfile.shift}`}
            </div>

            <div className="button-row centered">
              <button
                className="soft-button primary"
                disabled={clockState !== "NOT_STARTED"}
                onClick={clockIn}
              >
                ▶ Clock In
              </button>

              <button
                className="soft-button"
                disabled={
                  clockState !== "WORKING" && clockState !== "ON_BREAK"
                }
                onClick={toggleBreak}
              >
                {clockState === "ON_BREAK" ? "▶ End Break" : "Ⅱ Start Break"}
              </button>

              <button
                className="soft-button"
                disabled={
                  clockState !== "WORKING" && clockState !== "ON_BREAK"
                }
                onClick={clockOut}
              >
                ■ Clock Out
              </button>
            </div>

            <div className="progress">
              <span className={progressClass} />
            </div>

            <div className="muted tiny">
              Frontend prototype session only
            </div>
          </div>
        </Panel>

        <div className="stack-grid">
          <Panel title="Today's activity">
            <Activity
              label="Clock In"
              time={firstIn?.time}
            />
            <Activity
              label="Break event"
              time={breakEvent?.time}
            />
            <Activity
              label="Clock Out"
              time={lastOut?.time}
            />
          </Panel>

          <Panel title="Quick actions">
            <Quick
              href="/attendance-management/attendance-calendar"
              icon="▦"
              title="Attendance calendar"
              text="Review daily records"
              action="Open"
            />

            <Quick
              href="/attendance-management/correction"
              icon="✉"
              title="Report missing punch"
              text="Request correction"
              action="Request"
            />

            <Quick
              href="/attendance-management/leave"
              icon="♧"
              title="Leave request"
              text="Apply for time off"
              action="Apply"
            />
          </Panel>
        </div>
      </div>

      <div className="notice">
        Sign in only opens the employee workspace. Attendance is marked only
        when the employee uses Clock In / Clock Out.
      </div>
    </>
  );
}

function Activity({
  label,
  time
}: {
  label: string;
  time?: string;
}) {
  return (
    <div className="activity-row">
      <div className="mini-icon">◷</div>
      <div>
        <b>{label}</b>
        <small>{time || "Awaiting event"}</small>
      </div>
      <div className="spacer" />
      <StatusPill tone={time ? "success" : "warning"}>
        {time ? "Recorded" : "Pending"}
      </StatusPill>
    </div>
  );
}

function Quick({
  href,
  icon,
  title,
  text,
  action
}: {
  href: string;
  icon: string;
  title: string;
  text: string;
  action: string;
}) {
  return (
    <div className="activity-row">
      <div className="mini-icon">{icon}</div>
      <div>
        <b>{title}</b>
        <small>{text}</small>
      </div>
      <div className="spacer" />
      <Link className="soft-button compact" href={href}>
        {action} →
      </Link>
    </div>
  );
}
