"use client";

import { FormEvent, useState } from "react";
import { leaveBalances } from "@/data/employeeAttendance";
import { addRequest } from "@/utils/localAttendance";
import { DataTable, Panel } from "./UI";

export default function LeaveView() {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const id = `LV-${Math.floor(3000 + Math.random() * 800)}`;

    addRequest({
      id,
      type: "Leave request",
      date: String(data.get("start")),
      detail: String(data.get("type")),
      proposed: String(data.get("end")),
      reason: String(data.get("reason")),
      status: "Pending",
      approver: "Jordan Lee"
    });

    setMessage(`${id} submitted for approval.`);
    form.reset();
  }

  return (
    <div className="two-col-grid">
      <Panel title="Apply for leave">
        <form onSubmit={submit}>
          <div className="form-grid">
            <Field label="Leave type">
              <select name="type" className="neo-field">
                <option>Annual / earned</option>
                <option>Casual</option>
                <option>Sick</option>
                <option>Maternity / parental</option>
                <option>Bereavement</option>
                <option>Study</option>
                <option>Compensatory off</option>
                <option>Unpaid</option>
                <option>Special duty</option>
              </select>
            </Field>

            <Field label="Duration">
              <select name="duration" className="neo-field">
                <option>Full day</option>
                <option>Half day — first half</option>
                <option>Half day — second half</option>
                <option>Hours</option>
              </select>
            </Field>

            <Field label="Start date">
              <input
                className="neo-field"
                name="start"
                type="date"
                defaultValue="2026-10-16"
                required
              />
            </Field>

            <Field label="End date">
              <input
                className="neo-field"
                name="end"
                type="date"
                defaultValue="2026-10-16"
                required
              />
            </Field>
          </div>

          <Field label="Reason">
            <input
              className="neo-field"
              name="reason"
              placeholder="Short explanation"
              required
            />
          </Field>

          <Field label="Substitute / backup">
            <input
              className="neo-field"
              name="backup"
              placeholder="Optional employee"
            />
          </Field>

          <label className="check-row">
            <input type="checkbox" required />
            I confirm the dates and details are correct
          </label>

          <div className="button-row">
            <button className="soft-button primary">
              Submit leave request
            </button>

            <button className="soft-button" type="reset">
              Reset
            </button>
          </div>

          {message && (
            <div className="notice success-notice">{message}</div>
          )}
        </form>
      </Panel>

      <Panel title="Leave balance ledger">
        <DataTable
          headers={[
            "Leave type",
            "Opening",
            "Earned",
            "Used",
            "Pending",
            "Closing"
          ]}
          rows={leaveBalances}
        />
      </Panel>
    </div>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="field-label">
      <span>{label}</span>
      {children}
    </label>
  );
}
