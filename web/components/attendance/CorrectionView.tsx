"use client";

import { FormEvent, useState } from "react";
import { addRequest } from "@/utils/localAttendance";
import { Panel } from "./UI";

export default function CorrectionView() {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const id = `EX-${Math.floor(3000 + Math.random() * 800)}`;

    addRequest({
      id,
      type: String(data.get("issue")),
      date: String(data.get("date")),
      detail: String(data.get("issue")),
      proposed: `${String(data.get("clockin") || "—")} / ${String(
        data.get("clockout") || "—"
      )}`,
      reason: String(data.get("reason")),
      status: "Pending",
      approver: "Jordan Lee"
    });

    setMessage(`${id} submitted to Jordan Lee.`);
  }

  return (
    <Panel title="Attendance regularization request">
      <form onSubmit={submit}>
        <div className="form-grid">
          <Field label="Attendance date">
            <input
              className="neo-field"
              name="date"
              type="date"
              defaultValue="2026-10-09"
              required
            />
          </Field>

          <Field label="Issue type">
            <select className="neo-field" name="issue">
              <option>Missing punch</option>
              <option>Incorrect clock-in</option>
              <option>Incorrect clock-out</option>
              <option>Shift assignment issue</option>
              <option>Remote duty</option>
              <option>Other</option>
            </select>
          </Field>

          <Field label="Requested clock-in">
            <input className="neo-field" name="clockin" type="time" />
          </Field>

          <Field label="Requested clock-out">
            <input className="neo-field" name="clockout" type="time" />
          </Field>
        </div>

        <Field label="Reason for correction">
          <input
            className="neo-field"
            name="reason"
            placeholder="Explain what happened"
            required
          />
        </Field>

        <Field label="Evidence reference">
          <input
            className="neo-field"
            name="evidence"
            placeholder="Document or ticket reference"
          />
        </Field>

        <div className="notice">
          Frontend prototype: the request is saved only in this browser.
        </div>

        <button className="soft-button primary top-gap">
          Submit for approval
        </button>

        {message && (
          <div className="notice success-notice">{message}</div>
        )}
      </form>
    </Panel>
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
