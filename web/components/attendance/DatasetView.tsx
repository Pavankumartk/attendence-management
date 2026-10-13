import { holidays, roster } from "@/data/employeeAttendance";
import { DataTable, Panel, StatusPill } from "./UI";

export default function DatasetView({
  kind
}: {
  kind: "holidays" | "roster";
}) {
  const isHoliday = kind === "holidays";
  const rows = isHoliday ? holidays : roster;

  return (
    <Panel title={isHoliday ? "Holiday calendar" : "My shift roster"}>
      <DataTable
        headers={
          isHoliday
            ? ["Date", "Holiday", "Location", "Type", "Status"]
            : ["Date", "Shift", "Site", "Start", "End", "Status"]
        }
        rows={rows.map((row) =>
          row.map((cell, index) =>
            index === row.length - 1 ? (
              <StatusPill
                key={index}
                tone={cell === "Published" ? "success" : "warning"}
              >
                {cell}
              </StatusPill>
            ) : (
              cell
            )
          )
        )}
      />
    </Panel>
  );
}
