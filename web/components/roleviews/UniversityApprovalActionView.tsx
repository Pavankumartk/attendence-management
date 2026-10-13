"use client";

import { useEffect, useMemo, useState } from "react";
import {
  actOnUniversityAcademicRequest,
  getUniversityAcademicAudit,
  getUniversityAcademicQueue,
  type AcademicActionType,
  type AcademicAttendanceRequest
} from "@/utils/universityAcademicAttendance";
import {
  DataTable,
  Panel,
  StatCard,
  StatusPill
} from "@/components/attendance/UI";

type UniversityApprovalArea = "faculty" | "coordinator" | "admin";

export default function UniversityApprovalActionView({
  area
}: {
  area: UniversityApprovalArea;
}) {
  const [requests, setRequests] = useState<AcademicAttendanceRequest[]>([]);
  const [selected, setSelected] = useState<AcademicAttendanceRequest | null>(null);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [audit, setAudit] = useState<AcademicAttendanceRequest[]>([]);

  const labels = useMemo(() => {
    if (area === "faculty") {
      return {
        kicker: "FACULTY REVIEW",
        title: "Student attendance corrections",
        subtitle:
          "Review corrections from Students in your assigned classes. Approve, reject or escalate unresolved academic attendance cases to Department Coordinator.",
        empty: "No Student attendance corrections are waiting for Faculty action.",
        escalate: "Escalate to Department Coordinator"
      };
    }

    if (area === "coordinator") {
      return {
        kicker: "DEPARTMENT COORDINATOR REVIEW",
        title: "Escalated academic attendance cases",
        subtitle:
          "Review Student attendance cases that Faculty could not resolve. Approve, reject or escalate unresolved cases to University Admin.",
        empty: "No academic attendance cases are waiting for Department Coordinator action.",
        escalate: "Escalate to University Admin"
      };
    }

    return {
      kicker: "UNIVERSITY ADMIN FINAL REVIEW",
      title: "Final academic attendance escalations",
      subtitle:
        "Perform the final University review for academic attendance cases unresolved at Faculty and Department Coordinator levels.",
      empty: "No final academic attendance escalations are waiting for University Admin action.",
      escalate: ""
    };
  }, [area]);

  function refresh() {
    setRequests(getUniversityAcademicQueue(area));
    setAudit(getUniversityAcademicAudit());
  }

  useEffect(() => {
    refresh();
  }, [area]);

  function perform(action: AcademicActionType) {
    if (!selected) return;

    if ((action === "REJECT" || action === "ESCALATE") && !note.trim()) {
      setMessage("Add a review note before rejecting or escalating this attendance case.");
      return;
    }

    const result = actOnUniversityAcademicRequest(
      selected.id,
      area,
      action,
      note
    );

    if (!result) {
      setMessage("This attendance case could not be updated for the current University role.");
      return;
    }

    const actionText =
      action === "APPROVE"
        ? "approved"
        : action === "REJECT"
          ? "rejected"
          : "escalated";

    setMessage(`${selected.id} ${actionText} successfully.`);
    setSelected(null);
    setNote("");
    refresh();
  }

  const escalatedCount = requests.filter(
    (request) => request.status === "Escalated"
  ).length;

  return (
    <>
      <div className="stats-grid role-stats-gap">
        <StatCard
          label="WAITING FOR ACTION"
          value={requests.length}
          note="Academic attendance cases"
          tone={requests.length ? "warning" : "success"}
        />
        <StatCard
          label="STUDENT CORRECTIONS"
          value={requests.length}
          note="Class / session records"
          tone="blue"
        />
        <StatCard
          label="ESCALATED"
          value={escalatedCount}
          note="Requires higher-level review"
          tone={escalatedCount ? "warning" : "success"}
        />
        <StatCard
          label="ACTION HISTORY"
          value={audit.length}
          note="Academic workflow decisions"
        />
      </div>

      <Panel title={labels.title}>
        <div className="approval-intro">
          <span>{labels.kicker}</span>
          <p>{labels.subtitle}</p>
        </div>

        {message && <div className="notice approval-message">{message}</div>}

        {requests.length === 0 ? (
          <div className="notice success-notice">{labels.empty}</div>
        ) : (
          <DataTable
            headers={[
              "Request",
              "Student",
              "Subject",
              "Session",
              "Recorded → Requested",
              "Status",
              "Action"
            ]}
            rows={requests.map((request) => [
              <span key={`${request.id}-request`}>
                <b>{request.id}</b>
                <small className="table-sub">{request.submittedAt}</small>
              </span>,
              <span key={`${request.id}-student`}>
                <b>{request.studentName}</b>
                <small className="table-sub">{request.studentId}</small>
              </span>,
              request.subject,
              `${request.sessionDate} · ${request.sessionTime}`,
              `${request.recordedStatus} → ${request.requestedStatus}`,
              <StatusPill
                key={`${request.id}-status`}
                tone={request.status === "Escalated" ? "danger" : "warning"}
              >
                {request.status}
              </StatusPill>,
              <button
                key={`${request.id}-action`}
                type="button"
                className="soft-button review-action-button"
                onClick={() => {
                  setSelected(request);
                  setMessage("");
                  setNote("");
                }}
              >
                Review
              </button>
            ])}
          />
        )}
      </Panel>

      {area === "admin" && audit.length > 0 && (
        <Panel title="Recent academic attendance decisions">
          <DataTable
            headers={["Request", "Student", "Latest action", "By", "Review note"]}
            rows={audit.slice(0, 8).map((request) => {
              const latest = request.actions[request.actions.length - 1];
              return [
                request.id,
                request.studentName,
                latest?.action || "—",
                latest ? `${latest.byName} · ${latest.byRole}` : "—",
                latest?.note || "—"
              ];
            })}
          />
        </Panel>
      )}

      {selected && (
        <div className="approval-modal-backdrop" role="presentation">
          <section
            className="approval-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="university-academic-review-title"
          >
            <div className="approval-modal-head">
              <div>
                <span className="approval-kicker">ACADEMIC ATTENDANCE REVIEW</span>
                <h2 id="university-academic-review-title">{selected.id}</h2>
                <p>
                  {selected.studentName} · {selected.studentId} · {selected.batch}
                </p>
              </div>

              <button
                type="button"
                className="soft-button approval-close"
                onClick={() => {
                  setSelected(null);
                  setNote("");
                  setMessage("");
                }}
              >
                Close
              </button>
            </div>

            <div className="approval-detail-grid">
              <Detail label="Subject" value={selected.subject} />
              <Detail
                label="Class / session"
                value={`${selected.sessionDate} · ${selected.sessionTime}`}
              />
              <Detail label="Recorded status" value={selected.recordedStatus} />
              <Detail label="Requested status" value={selected.requestedStatus} />
            </div>

            <div className="approval-detail-block">
              <span>Student reason</span>
              <p>{selected.reason}</p>
            </div>

            <div className="approval-detail-block">
              <span>Evidence / reference</span>
              <p>{selected.evidence || "No additional evidence reference supplied."}</p>
            </div>

            {selected.actions.length > 0 && (
              <div className="approval-history-block">
                <h3>Previous academic review actions</h3>
                {selected.actions.map((item, index) => (
                  <div className="approval-history-item" key={`${item.at}-${index}`}>
                    <b>{item.action}</b>
                    <span>
                      {item.byName} · {item.byRole} · {item.at}
                    </span>
                    {item.note && <p>{item.note}</p>}
                  </div>
                ))}
              </div>
            )}

            <label className="field-label approval-note-field">
              <span>Review note</span>
              <textarea
                className="neo-field approval-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Add the academic attendance review note. Required for rejection or escalation."
              />
            </label>

            <div className="approval-action-row">
              <button
                type="button"
                className="soft-button approve-button"
                onClick={() => perform("APPROVE")}
              >
                {area === "admin" ? "Approve final" : "Approve correction"}
              </button>

              <button
                type="button"
                className="soft-button reject-button"
                onClick={() => perform("REJECT")}
              >
                {area === "admin" ? "Reject final" : "Reject correction"}
              </button>

              {area !== "admin" && (
                <button
                  type="button"
                  className="soft-button escalate-button"
                  onClick={() => perform("ESCALATE")}
                >
                  {labels.escalate}
                </button>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="approval-detail-item">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
