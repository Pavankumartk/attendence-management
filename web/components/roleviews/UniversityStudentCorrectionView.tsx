"use client";

import { FormEvent, useState } from "react";
import { Panel } from "@/components/attendance/UI";
import { createStudentAttendanceCorrection } from "@/utils/universityAcademicAttendance";

export default function UniversityStudentCorrectionView() {
  const [subject, setSubject] = useState("CS301 · Data Structures");
  const [sessionDate, setSessionDate] = useState("2026-10-12");
  const [sessionTime, setSessionTime] = useState("09:00–10:00");
  const [recordedStatus, setRecordedStatus] = useState("Absent");
  const [requestedStatus, setRequestedStatus] = useState("Present");
  const [reason, setReason] = useState("");
  const [evidence, setEvidence] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!reason.trim()) {
      setMessage("Please explain why this class/session attendance record should be corrected.");
      return;
    }

    const created = createStudentAttendanceCorrection({
      subject,
      sessionDate,
      sessionTime,
      recordedStatus,
      requestedStatus,
      reason,
      evidence
    });

    if (!created) {
      setMessage("Only a signed-in University Student can submit this academic attendance correction.");
      return;
    }

    setMessage(
      `${created.id} submitted to Faculty. You can track the decision in Attendance request history.`
    );
    setReason("");
    setEvidence("");
  }

  return (
    <Panel title="Request class attendance correction">
      <div className="notice">
        This form is only for a Student class/session attendance record. It is not an employee leave, payroll or paid-leave request.
      </div>

      <form onSubmit={submit}>
        <div className="form-grid">
          <label className="field-label">
            <span>Subject</span>
            <select
              className="neo-field"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              <option>CS301 · Data Structures</option>
              <option>CS305 · Algorithms</option>
              <option>CS221 · Programming Lab</option>
              <option>CS399 · Project Review</option>
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

          <label className="field-label">
            <span>Session time</span>
            <input
              className="neo-field"
              value={sessionTime}
              onChange={(event) => setSessionTime(event.target.value)}
            />
          </label>

          <label className="field-label">
            <span>Recorded attendance</span>
            <select
              className="neo-field"
              value={recordedStatus}
              onChange={(event) => setRecordedStatus(event.target.value)}
            >
              <option>Absent</option>
              <option>Late</option>
              <option>Present</option>
              <option>Excused</option>
            </select>
          </label>

          <label className="field-label">
            <span>Requested attendance</span>
            <select
              className="neo-field"
              value={requestedStatus}
              onChange={(event) => setRequestedStatus(event.target.value)}
            >
              <option>Present</option>
              <option>Late</option>
              <option>Excused</option>
              <option>Absent</option>
            </select>
          </label>
        </div>

        <label className="field-label">
          <span>Reason for correction</span>
          <textarea
            className="neo-field"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Explain what is incorrect in the class/session attendance record."
          />
        </label>

        <label className="field-label">
          <span>Evidence / reference</span>
          <textarea
            className="neo-field"
            value={evidence}
            onChange={(event) => setEvidence(event.target.value)}
            placeholder="Optional: class participation, timetable, Faculty confirmation or other reference."
          />
        </label>

        <div className="button-row top-gap">
          <button type="submit" className="soft-button primary">
            Submit to Faculty
          </button>
        </div>

        {message && <div className="notice top-gap">{message}</div>}
      </form>
    </Panel>
  );
}
