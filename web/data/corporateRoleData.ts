export type RoleDataset = {
  title: string;
  subtitle: string;
  headers: string[];
  rows: string[][];
};

export const managerViews: Record<string, RoleDataset> = {
  "team-today": {
    title: "Team attendance today",
    subtitle: "Expected versus present attendance for your direct team.",
    headers: ["Employee", "Employee ID", "Shift", "Clock In", "Status", "Exception"],
    rows: [
      ["Alex Carter", "EMP-1024", "09:00–18:00", "09:02 AM", "Present", "None"],
      ["Maya Singh", "EMP-1031", "09:00–18:00", "08:58 AM", "Present", "None"],
      ["Ravi Kumar", "EMP-1042", "09:00–18:00", "—", "Absent", "No punch"],
      ["Sara Khan", "EMP-1050", "09:00–18:00", "09:24 AM", "Late", "Late arrival"],
      ["Vikram Nair", "EMP-1058", "Flexible", "08:41 AM", "Present", "None"]
    ]
  },
  "team-calendar": {
    title: "Team calendar",
    subtitle: "Inspect team attendance by date.",
    headers: ["Date", "Present", "Leave", "Absent", "Late", "Open issues"],
    rows: [
      ["12 Oct 2026", "18", "2", "1", "1", "2"],
      ["11 Oct 2026", "0", "0", "0", "0", "0"],
      ["10 Oct 2026", "18", "2", "1", "1", "2"],
      ["09 Oct 2026", "19", "1", "1", "2", "1"]
    ]
  },
  "pending-approvals": {
    title: "Pending approvals",
    subtitle: "Review attendance and leave requests routed to you.",
    headers: ["Request", "Employee", "Type", "Date", "Reason", "Status"],
    rows: [
      ["EX-2048", "Alex Carter", "Missing punch", "09 Oct 2026", "Forgot clock out", "Pending"],
      ["LV-2051", "Maya Singh", "Annual leave", "16 Oct 2026", "Personal", "Pending"],
      ["EX-2054", "Sara Khan", "Late arrival", "10 Oct 2026", "Transport delay", "Pending"]
    ]
  },
  "shift-roster": {
    title: "Shift roster",
    subtitle: "Review published team shifts.",
    headers: ["Employee", "Date", "Shift", "Site", "Start", "End"],
    rows: [
      ["Alex Carter", "12 Oct 2026", "Standard day", "Bengaluru HQ", "09:00", "18:00"],
      ["Maya Singh", "12 Oct 2026", "Standard day", "Bengaluru HQ", "09:00", "18:00"],
      ["Ravi Kumar", "12 Oct 2026", "Flexible", "Remote", "08:00", "17:00"],
      ["Sara Khan", "12 Oct 2026", "Standard day", "Bengaluru HQ", "09:00", "18:00"]
    ]
  },
  "team-exceptions": {
    title: "Team exceptions",
    subtitle: "Missing punches, lateness and incomplete days.",
    headers: ["Employee", "Date", "Exception", "Severity", "Owner", "Status"],
    rows: [
      ["Alex Carter", "09 Oct 2026", "Missing clock-out", "Medium", "Manager", "Open"],
      ["Sara Khan", "10 Oct 2026", "Late arrival", "Low", "Manager", "Open"],
      ["Ravi Kumar", "10 Oct 2026", "No punch", "High", "Manager", "Open"]
    ]
  },
  "staffing-coverage": {
    title: "Staffing coverage",
    subtitle: "Review shift coverage and staffing gaps.",
    headers: ["Shift", "Required", "Scheduled", "Present", "Gap", "Coverage"],
    rows: [
      ["09:00–18:00", "18", "20", "17", "1", "94%"],
      ["10:00–19:00", "6", "6", "6", "0", "100%"],
      ["Flexible", "4", "5", "4", "0", "100%"]
    ]
  },
  "team-analytics": {
    title: "Team analytics",
    subtitle: "Attendance, lateness and overtime trends.",
    headers: ["Metric", "This month", "Previous month", "Change", "Target"],
    rows: [
      ["Attendance rate", "96.4%", "95.2%", "+1.2%", "≥ 95%"],
      ["Late arrivals", "7", "10", "-3", "≤ 5"],
      ["Missing punches", "4", "8", "-4", "0"],
      ["Average overtime", "2.1h", "2.5h", "-0.4h", "≤ 2h"]
    ]
  }
};

export const hrViews: Record<string, RoleDataset> = {
  "workforce-overview": {
    title: "Workforce overview",
    subtitle: "Live headcount and attendance health.",
    headers: ["Metric", "Today", "Yesterday", "Month average", "Status"],
    rows: [
      ["Expected employees", "624", "620", "618", "Normal"],
      ["Present", "589", "584", "587", "Healthy"],
      ["On leave", "21", "24", "19", "Normal"],
      ["Absent", "14", "12", "12", "Review"],
      ["Open exceptions", "17", "21", "20", "Review"]
    ]
  },
  "employee-360": {
    title: "Employee 360°",
    subtitle: "Attendance, leave, assignments and exceptions.",
    headers: ["Employee", "Department", "Manager", "Attendance", "Leave balance", "Exceptions"],
    rows: [
      ["Alex Carter", "Engineering", "Jordan Lee", "96.2%", "12.5 days", "1"],
      ["Maya Singh", "Engineering", "Jordan Lee", "98.1%", "10.0 days", "0"],
      ["Ravi Kumar", "Engineering", "Jordan Lee", "91.4%", "8.0 days", "3"],
      ["Ananya Patel", "Finance", "Rohit Mehta", "97.8%", "14.0 days", "0"]
    ]
  },
  "live-punches": {
    title: "Live punches",
    subtitle: "Inspect event source and device metadata.",
    headers: ["Time", "Employee", "Event", "Source", "Site", "Result"],
    rows: [
      ["11:42 AM", "Alex Carter", "BREAK_START", "Web portal", "Bengaluru HQ", "Accepted"],
      ["11:40 AM", "Maya Singh", "IN", "Biometric", "Bengaluru HQ", "Accepted"],
      ["11:38 AM", "Ravi Kumar", "IN", "Mobile", "Remote", "Accepted"],
      ["11:35 AM", "Sara Khan", "IN", "Web portal", "Bengaluru HQ", "Accepted"]
    ]
  },
  "exception-queue": {
    title: "Exception queue",
    subtitle: "Triage missing punches, disputes and anomalies.",
    headers: ["Case", "Employee", "Issue", "Age", "Owner", "Status"],
    rows: [
      ["EX-2048", "Alex Carter", "Missing clock-out", "1 day", "Manager", "Pending"],
      ["EX-2054", "Sara Khan", "Late arrival", "2 hours", "Manager", "Pending"],
      ["EX-2011", "Ravi Kumar", "Repeated no punch", "3 days", "HR", "Escalated"]
    ]
  },
  "policy-configuration": {
    title: "Policy configuration",
    subtitle: "Effective-dated attendance rules and policy versions.",
    headers: ["Policy", "Scope", "Version", "Effective from", "Status"],
    rows: [
      ["Standard office attendance", "Bengaluru HQ", "v2.1", "01 Oct 2026", "Active"],
      ["Flexible work attendance", "Remote India", "v1.4", "01 Sep 2026", "Active"],
      ["Operations shift policy", "Operations", "v3.0", "01 Oct 2026", "Active"]
    ]
  },
  "leave-ledger": {
    title: "Leave ledger",
    subtitle: "Grants, accruals, usage, expiry and adjustments.",
    headers: ["Employee", "Leave type", "Opening", "Earned", "Used", "Pending", "Closing"],
    rows: [
      ["Alex Carter", "Annual", "10.0", "2.0", "1.0", "1.0", "11.0"],
      ["Maya Singh", "Annual", "9.0", "2.0", "0.0", "2.0", "9.0"],
      ["Ravi Kumar", "Annual", "8.0", "2.0", "2.0", "0.0", "8.0"]
    ]
  },
  "holiday-workweek": {
    title: "Holiday & workweek",
    subtitle: "Configure calendars, workweeks and shifts.",
    headers: ["Calendar", "Region", "Workweek", "Hours", "Employees", "Status"],
    rows: [
      ["India Corporate", "India", "Mon–Fri", "09:00–18:00", "420", "Published"],
      ["Karnataka Operations", "Karnataka", "Mon–Sat", "09:00–17:00", "118", "Published"],
      ["Remote Flexible", "India", "Flexible", "8 hours", "86", "Published"]
    ]
  },
  "monthly-close": {
    title: "Monthly close checklist",
    subtitle: "Reconcile exceptions and lock the pay period.",
    headers: ["Step", "Owner", "Open items", "Due", "Status"],
    rows: [
      ["Resolve missing punches", "Managers", "17", "28 Oct", "In progress"],
      ["Approve leave", "Managers / HR", "8", "29 Oct", "In progress"],
      ["Review overtime", "HR", "4", "30 Oct", "Pending"],
      ["Lock attendance period", "HR", "0", "31 Oct", "Not started"]
    ]
  },
  "payroll-bridge": {
    title: "Payroll bridge",
    subtitle: "Validate payable days and export a locked period.",
    headers: ["Payroll group", "Employees", "Payable days", "LOP cases", "Exceptions", "Status"],
    rows: [
      ["India Monthly", "512", "10,840", "6", "3", "Ready"],
      ["India Contract", "112", "2,198", "2", "1", "Review"]
    ]
  },
  "reports-analytics": {
    title: "Reports & analytics",
    subtitle: "Build and export scoped attendance reports.",
    headers: ["Report", "Period", "Scope", "Rows", "Last generated", "Status"],
    rows: [
      ["Attendance summary", "Oct 2026", "All India", "624", "Today", "Ready"],
      ["Late arrival analysis", "Oct 2026", "Bengaluru HQ", "82", "Today", "Ready"],
      ["Leave utilization", "Q4 2026", "All India", "624", "Yesterday", "Ready"]
    ]
  },
  "imports-corrections": {
    title: "Imports & corrections",
    subtitle: "Validate rows and preview attendance correction errors.",
    headers: ["File", "Rows", "Valid", "Warnings", "Errors", "Status"],
    rows: [
      ["attendance_oct_10.csv", "420", "408", "8", "4", "Needs review"],
      ["roster_week_42.csv", "180", "180", "0", "0", "Ready"]
    ]
  }
};

export const adminViews: Record<string, RoleDataset> = {
  "organization-setup": {
    title: "Organization setup",
    subtitle: "Corporate hierarchy and effective-dated assignments.",
    headers: ["Unit", "Type", "Parent", "Employees", "Status"],
    rows: [
      ["Northstar Group", "Corporate tenant", "—", "624", "Active"],
      ["Engineering", "Department", "Northstar Group", "188", "Active"],
      ["Finance", "Department", "Northstar Group", "72", "Active"],
      ["Operations", "Department", "Northstar Group", "206", "Active"]
    ]
  },
  "sites-branches": {
    title: "Sites & branches",
    subtitle: "Site details, time zones and local attendance settings.",
    headers: ["Site", "City", "Timezone", "Employees", "Attendance mode", "Status"],
    rows: [
      ["Bengaluru HQ", "Bengaluru", "Asia/Kolkata", "340", "Hybrid", "Active"],
      ["Mumbai Office", "Mumbai", "Asia/Kolkata", "126", "Biometric", "Active"],
      ["Remote India", "Remote", "Asia/Kolkata", "158", "Web / Mobile", "Active"]
    ]
  },
  "employee-provisioning": {
    title: "Employee provisioning",
    subtitle: "Import, validate, invite and offboard employees.",
    headers: ["Employee", "Employee ID", "Role", "Department", "Invite", "Status"],
    rows: [
      ["Alex Carter", "EMP-1024", "Employee", "Engineering", "Accepted", "Active"],
      ["Jordan Lee", "MGR-1020", "Manager / Supervisor", "Engineering", "Accepted", "Active"],
      ["Neha Rao", "HR-2012", "HR Coordinator", "HR", "Accepted", "Active"]
    ]
  },
  "roles-permissions": {
    title: "Roles & permissions",
    subtitle: "Role-based and attribute-based attendance access.",
    headers: ["Role", "Own attendance", "Team", "Workforce", "Administration"],
    rows: [
      ["Company Admin", "Yes", "Scoped", "Scoped", "Yes"],
      ["HR Coordinator", "Yes", "Scoped", "Yes", "No"],
      ["Manager / Supervisor", "Yes", "Yes", "No", "No"],
      ["Employee", "Yes", "No", "No", "No"]
    ]
  },
  "sso-security": {
    title: "SSO & security",
    subtitle: "Identity provider, MFA and trusted access settings.",
    headers: ["Setting", "Configuration", "Scope", "Status"],
    rows: [
      ["Corporate SSO", "SAML 2.0", "All employees", "Enabled"],
      ["MFA", "Authenticator / OTP", "Admins & HR", "Required"],
      ["Session timeout", "8 hours", "All users", "Active"]
    ]
  },
  "integrations-apis": {
    title: "Integrations & APIs",
    subtitle: "Inbound and outbound attendance connectors.",
    headers: ["Integration", "Category", "Direction", "Environment", "Status"],
    rows: [
      ["Biometric Gateway", "Attendance source", "Inbound", "Production", "Connected"],
      ["Payroll Export", "Payroll", "Outbound", "Production", "Connected"],
      ["Corporate SSO", "Identity", "Inbound", "Production", "Connected"]
    ]
  },
  "feature-settings": {
    title: "Feature settings",
    subtitle: "Attendance modules and Corporate preferences.",
    headers: ["Feature", "Scope", "Enabled", "Notes"],
    rows: [
      ["Web clock-in/out", "All employees", "Yes", "Default"],
      ["Mobile clock-in/out", "Remote India", "Yes", "Optional source"],
      ["Break tracking", "All employees", "Yes", "30 minute default"],
      ["Attendance corrections", "All employees", "Yes", "Approval required"]
    ]
  },
  "audit-log": {
    title: "Audit log",
    subtitle: "Actor, action, timestamp and reason for changes.",
    headers: ["Time", "Actor", "Action", "Target", "Reason"],
    rows: [
      ["12 Oct 10:42", "Priya Sharma", "Updated assignment", "Engineering", "Org alignment"],
      ["11 Oct 16:20", "Priya Sharma", "Updated role scope", "HR Coordinator", "Permission review"],
      ["10 Oct 11:10", "Neha Rao", "Imported corrections", "42 rows", "Attendance cleanup"]
    ]
  }
};
