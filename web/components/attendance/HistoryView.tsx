"use client";

import { useEffect, useState } from "react";
import { getRequests, type LocalRequest } from "@/utils/localAttendance";
import { DataTable, Panel, StatCard, StatusPill } from "./UI";

export default function HistoryView() {
  const [requests, setRequests] = useState<LocalRequest[]>([]);

  useEffect(() => {
    setRequests(getRequests());
  }, []);

  const pending = requests.filter((item) => item.status === "Pending").length;
  const approved = requests.filter((item) => item.status === "Approved").length;
  const rejected = requests.filter((item) => item.status === "Rejected").length;

  return (
    <>
      <div className="stats-grid">
        <StatCard
          label="PENDING REQUESTS"
          value={pending}
          note="Awaiting review"
          tone="warning"
        />

        <StatCard
          label="APPROVED"
          value={approved}
          note="Approved requests"
          tone="success"
        />

        <StatCard
          label="REJECTED"
          value={rejected}
          note="Rejected requests"
          tone="danger"
        />

        <StatCard
          label="REQUEST HISTORY"
          value={requests.length}
          note="Frontend demo records"
        />
      </div>

      <Panel title="Approval history">
        <DataTable
          headers={[
            "Request",
            "Date",
            "Type",
            "Proposed",
            "Approver",
            "Status"
          ]}
          rows={requests.map((request) => [
            <span key={request.id}>
              <b>{request.id}</b>
              <small className="table-sub">{request.detail}</small>
            </span>,
            request.date,
            request.type,
            request.proposed,
            request.approver,
            <StatusPill
              key={`${request.id}-status`}
              tone={
                request.status === "Approved"
                  ? "success"
                  : request.status === "Rejected"
                    ? "danger"
                    : "warning"
              }
            >
              {request.status}
            </StatusPill>
          ])}
        />
      </Panel>
    </>
  );
}
