import { dailyPunches } from "@/data/employeeAttendance";
import { DataTable, Panel, StatCard, StatusPill } from "./UI";

export default function DailyDetail() {
  return (
    <>
      <div className="stats-grid">
        <StatCard
          label="GROSS SPAN"
          value="8h 58m"
          note="First IN to last OUT"
        />
        <StatCard
          label="UNPAID BREAK"
          value="30m"
          note="Break policy"
        />
        <StatCard
          label="NET WORKED"
          value="8h 28m"
          note="Provisional"
          tone="success"
        />
        <StatCard
          label="DAY STATUS"
          value="INCOMPLETE"
          note="Missing exit"
          tone="warning"
        />
      </div>

      <Panel title="Punch timeline">
        <DataTable
          headers={["Event", "Timestamp", "Source", "Event ID", "Result"]}
          rows={dailyPunches.map((row) =>
            row.map((cell, index) =>
              index === row.length - 1 ? (
                <StatusPill
                  key={index}
                  tone={cell === "Acknowledged" ? "success" : "warning"}
                >
                  {cell}
                </StatusPill>
              ) : (
                cell
              )
            )
          )}
        />

        <div className="notice">
          The employee can review punch evidence, work totals and calculation
          status for the selected workday.
        </div>
      </Panel>
    </>
  );
}
