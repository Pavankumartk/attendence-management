"use client";

import { useEffect, useState } from "react";
import {
  DataTable,
  Panel,
  StatusPill
} from "@/components/attendance/UI";
import {
  getMyStudentAttendanceRequests,
  type AcademicAttendanceRequest
} from "@/utils/universityAcademicAttendance";

export default function UniversityStudentRequestHistoryView() {
  const [requests, setRequests] = useState<AcademicAttendanceRequest[]>([]);

  useEffect(() => {
    setRequests(getMyStudentAttendanceRequests());
  }, []);

  return (
    <Panel title="My attendance correction history">
      {requests.length === 0 ? (
        <div className="notice">You have not submitted an academic attendance correction yet.</div>
      ) : (
        <DataTable
          headers={[
            "Request",
            "Subject / session",
            "Recorded → Requested",
            "Current reviewer",
            "Status",
            "Latest decision"
          ]}
          rows={requests.map((request) => {
            const latest = request.actions[request.actions.length - 1];
            const tone =
              request.status === "Approved"
                ? "success"
                : request.status === "Rejected"
                  ? "danger"
                  : request.status === "Escalated"
                    ? "warning"
                    : "info";

            return [
              <span key={`${request.id}-id`}>
                <b>{request.id}</b>
                <small className="table-sub">{request.submittedAt}</small>
              </span>,
              <span key={`${request.id}-session`}>
                <b>{request.subject}</b>
                <small className="table-sub">
                  {request.sessionDate} · {request.sessionTime}
                </small>
              </span>,
              `${request.recordedStatus} → ${request.requestedStatus}`,
              request.currentApprover,
              <StatusPill key={`${request.id}-status`} tone={tone}>
                {request.status}
              </StatusPill>,
              latest
                ? `${latest.action} · ${latest.byRole}${latest.note ? ` · ${latest.note}` : ""}`
                : "Awaiting Faculty review"
            ];
          })}
        />
      )}
    </Panel>
  );
}
