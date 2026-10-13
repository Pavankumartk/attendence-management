import AppShell from "@/components/layout/AppShell";
import AttendanceCalendar from "./AttendanceCalendar";
import ClockDashboard from "./ClockDashboard";
import CorrectionView from "./CorrectionView";
import DailyDetail from "./DailyDetail";
import DatasetView from "./DatasetView";
import HistoryView from "./HistoryView";
import LeaveView from "./LeaveView";
import NotificationsView from "./NotificationsView";
import ProfileView from "./ProfileView";

export type EmployeeSection =
  | "home"
  | "calendar"
  | "daily"
  | "leave"
  | "holidays"
  | "roster"
  | "correction"
  | "history"
  | "profile"
  | "notifications";

const pageMeta: Record<EmployeeSection, [string, string, string]> = {
  home: [
    "EMPLOYEE WORKSPACE",
    "Good morning, Alex 👋",
    "Your attendance overview for today."
  ],
  calendar: [
    "MY RECORDS",
    "Attendance calendar",
    "Review daily attendance across the year."
  ],
  daily: [
    "MY RECORDS",
    "Daily attendance detail",
    "Punch history, work totals and calculation status."
  ],
  leave: [
    "MY RECORDS",
    "Leave requests & balances",
    "Apply for leave and review your ledger."
  ],
  holidays: [
    "MY RECORDS",
    "Holiday calendar",
    "Site holidays, floating holidays and closures."
  ],
  roster: [
    "MY RECORDS",
    "My shift roster",
    "Published schedule and shift assignments."
  ],
  correction: [
    "MY REQUESTS",
    "Request attendance correction",
    "Submit a regularization request with a reason and evidence."
  ],
  history: [
    "MY REQUESTS",
    "Approval history",
    "Track requests, approvers and decisions."
  ],
  profile: [
    "MY ACCOUNT",
    "My profile & employment",
    "Employment assignments and employee details."
  ],
  notifications: [
    "MY ACCOUNT",
    "Notifications",
    "Attendance reminders and workflow updates."
  ]
};

export default function AttendanceModule({
  section
}: {
  section: EmployeeSection;
}) {
  const [eyebrow, title, subtitle] = pageMeta[section];

  let content: React.ReactNode;

  switch (section) {
    case "calendar":
      content = <AttendanceCalendar />;
      break;
    case "daily":
      content = <DailyDetail />;
      break;
    case "leave":
      content = <LeaveView />;
      break;
    case "holidays":
      content = <DatasetView kind="holidays" />;
      break;
    case "roster":
      content = <DatasetView kind="roster" />;
      break;
    case "correction":
      content = <CorrectionView />;
      break;
    case "history":
      content = <HistoryView />;
      break;
    case "profile":
      content = <ProfileView />;
      break;
    case "notifications":
      content = <NotificationsView />;
      break;
    default:
      content = <ClockDashboard />;
  }

  return (
    <AppShell eyebrow={eyebrow} title={title} subtitle={subtitle}>
      {content}
    </AppShell>
  );
}
