import type { ReactNode } from "react";

export function Panel({
  title,
  children,
  extra
}: {
  title?: string;
  children: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <section className="neo-panel">
      {(title || extra) && (
        <div className="panel-head">
          <h2>{title}</h2>
          {extra}
        </div>
      )}
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  note,
  tone = ""
}: {
  label: string;
  value: string | number;
  note: string;
  tone?: "" | "success" | "warning" | "danger" | "blue";
}) {
  return (
    <div className="neo-panel stat-card">
      <span className="label">{label}</span>
      <strong className={`stat-value ${tone}`}>{value}</strong>
      <span className="note">{note}</span>
    </div>
  );
}

export function StatusPill({
  children,
  tone = "neutral"
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
}) {
  return <span className={`status-pill ${tone}`}>{children}</span>;
}

export function DataTable({
  headers,
  rows
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
