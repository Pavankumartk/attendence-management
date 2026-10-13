"use client";

import { useEffect, useMemo, useState } from "react";
import {
  actOnWorkflowRequest,
  getWorkflowAudit,
  getWorkflowRequests,
  type WorkflowActionType,
  type WorkflowRequest
} from "@/utils/localAttendance";
import { DataTable, Panel, StatCard, StatusPill } from "@/components/attendance/UI";

export default function ApprovalActionView({
  area
}: {
  area: "manager" | "hr" | "admin";
}) {
  const [requests, setRequests] = useState<WorkflowRequest[]>([]);
  const [selected, setSelected] = useState<WorkflowRequest | null>(null);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [audit, setAudit] = useState<WorkflowRequest[]>([]);

  const labels = useMemo(() => {
    if (area === "manager") {
      return {
        eyebrow: "FIRST-LEVEL ACTIONS",
        title: "Pending attendance & leave approvals",
        subtitle:
          "Review requests from your assigned team. Approve, reject or escalate unresolved cases to HR Coordinator.",
        empty: "No team requests are waiting for Manager / Supervisor action.",
        escalate: "Escalate to HR Coordinator"
      };
    }

    if (area === "hr") {
      return {
        eyebrow: "HR ACTIONS",
        title: "Escalated attendance exception queue",
        subtitle:
          "Review cases escalated by Managers. Resolve them here or escalate unresolved administration issues to Company Admin.",
        empty: "No escalated attendance cases are waiting for HR Coordinator action.",
        escalate: "Escalate to Company Admin"
      };
    }

    return {
      eyebrow: "FINAL ADMIN ACTIONS",
      title: "Final attendance escalations",
      subtitle:
        "Review attendance cases escalated by HR. Company Admin can approve or reject the final administrative decision.",
      empty: "No final attendance escalations are waiting for Company Admin action.",
      escalate: ""
    };
  }, [area]);

  function refresh() {
    setRequests(getWorkflowRequests(area));
    setAudit(getWorkflowAudit());
  }

  useEffect(() => {
    refresh();
  }, [area]);

  function perform(action: WorkflowActionType) {
    if (!selected) return;

    if ((action === "REJECT" || action === "ESCALATE") && !note.trim()) {
      setMessage("Add a review note before rejecting or escalating this request.");
      return;
    }

    const result = actOnWorkflowRequest(selected.id, action, note);

    if (!result) {
      setMessage("This request could not be updated for the current role.");
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

  const pendingCount = requests.length;
  const attendanceCount = requests.filter(
    (item) => !item.type.toLowerCase().includes("leave")
  ).length;
  const leaveCount = requests.filter((item) =>
    item.type.toLowerCase().includes("leave")
  ).length;

  return (
    <>
      <div className="stats-grid role-stats-gap">
        <StatCard
          label="WAITING FOR ACTION"
          value={pendingCount}
          note="Requests in your queue"
          tone={pendingCount ? "warning" : "success"}
        />
        <StatCard
          label="ATTENDANCE CASES"
          value={attendanceCount}
          note="Corrections / exceptions"
          tone="blue"
        />
        <StatCard
          label="LEAVE REQUESTS"
          value={leaveCount}
          note="Awaiting role decision"
          tone="warning"
        />
        <StatCard
          label="ACTION HISTORY"
          value={audit.length}
          note="Workflow decisions recorded"
        />
      </div>

      <Panel title={labels.title}>
        <div className="approval-intro">
          <span>{labels.eyebrow}</span>
          <p>{labels.subtitle}</p>
        </div>

        {message && <div className="notice approval-message">{message}</div>}

        {requests.length === 0 ? (
          <div className="notice success-notice">{labels.empty}</div>
        ) : (
          <DataTable
            headers={[
              "Request",
              "Employee",
              "Type",
              "Date",
              "Reason",
              "Status",
              "Action"
            ]}
            rows={requests.map((request) => [
              <span key={`${request.id}-request`}>
                <b>{request.id}</b>
                <small className="table-sub">{request.submittedAt}</small>
              </span>,
              <span key={`${request.id}-employee`}>
                <b>{request.requesterName}</b>
                <small className="table-sub">
                  {request.requesterEmployeeId} · {request.requesterRoleLabel}
                </small>
              </span>,
              request.type,
              request.date,
              request.reason,
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
        <Panel title="Recent approval & escalation actions">
          <DataTable
            headers={["Request", "Employee", "Latest action", "By", "Note"]}
            rows={audit.slice(0, 8).map((request) => {
              const latest = request.actions[request.actions.length - 1];
              return [
                request.id,
                request.requesterName,
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
            aria-labelledby="approval-review-title"
          >
            <div className="approval-modal-head">
              <div>
                <span className="approval-kicker">REQUEST REVIEW</span>
                <h2 id="approval-review-title">{selected.id}</h2>
                <p>
                  {selected.requesterName} · {selected.requesterEmployeeId}
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
              <Detail label="Request type" value={selected.type} />
              <Detail label="Attendance / leave date" value={selected.date} />
              <Detail label="Requested value" value={selected.proposed} />
              <Detail label="Current approver" value={selected.approver} />
            </div>

            <div className="approval-detail-block">
              <span>Reason</span>
              <p>{selected.reason}</p>
            </div>

            <div className="approval-detail-block">
              <span>Request detail</span>
              <p>{selected.detail}</p>
            </div>

            {selected.actions.length > 0 && (
              <div className="approval-history-block">
                <h3>Previous workflow actions</h3>
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
                placeholder={
                  area === "manager"
                    ? "Add Manager review notes. Required for reject or escalation."
                    : area === "hr"
                      ? "Add HR review notes. Required for reject or escalation."
                      : "Add final administration review notes."
                }
              />
            </label>

            <div className="approval-action-row">
              <button
                type="button"
                className="soft-button approve-button"
                onClick={() => perform("APPROVE")}
              >
                {area === "admin" ? "Approve final" : "Approve"}
              </button>

              <button
                type="button"
                className="soft-button reject-button"
                onClick={() => perform("REJECT")}
              >
                {area === "admin" ? "Reject final" : "Reject"}
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
    <div className="approval-detail-card">
      <span>{label}</span>
      <b>{value || "—"}</b>
    </div>
  );
}
    