export type AttendanceStatus =
  | "Present"
  | "Leave"
  | "Absent"
  | "Holiday / off";

export const employeeProfile = {
  name: "Alex Carter",
  initials: "AC",
  employeeId: "EMP-1024",
  tenant: "Corporate",
  company: "Northstar Group",
  legalEntity: "Northstar India Pvt Ltd",
  department: "Engineering",
  site: "Bengaluru HQ",
  manager: "Jordan Lee",
  shift: "09:00 AM – 06:00 PM",
  employmentStatus: "Active"
};

export const dailyPunches = [
  ["IN", "09:02:14 AM", "Web portal", "PCH-7FA21", "Acknowledged"],
  ["BREAK_START", "12:58:02 PM", "Web portal", "PCH-7FA22", "Acknowledged"],
  ["BREAK_END", "01:28:41 PM", "Web portal", "PCH-7FA23", "Acknowledged"],
  ["OUT", "—", "—", "—", "Missing punch"]
];

export const leaveBalances = [
  ["Annual / earned", "10.0", "2.0", "1.0", "1.0", "11.0"],
  ["Casual", "3.0", "0.0", "0.5", "0.0", "2.5"],
  ["Sick", "5.0", "0.0", "0.0", "0.0", "5.0"],
  ["Compensatory off", "1.0", "1.0", "0.0", "0.0", "2.0"]
];

export const holidays = [
  [
    "14 Oct 2026",
    "Regional Festival",
    "Bengaluru HQ",
    "Regional",
    "Published"
  ],
  [
    "20 Oct 2026",
    "Optional Holiday",
    "All India",
    "Optional",
    "Published"
  ],
  [
    "01 Nov 2026",
    "State Formation Day",
    "Karnataka",
    "State",
    "Draft"
  ],
  [
    "25 Dec 2026",
    "Christmas",
    "All sites",
    "National",
    "Published"
  ]
];

export const roster = [
  [
    "10 Oct 2026",
    "Standard day",
    "Bengaluru HQ",
    "09:00",
    "18:00",
    "Published"
  ],
  [
    "11 Oct 2026",
    "Weekly off",
    "Bengaluru HQ",
    "—",
    "—",
    "Published"
  ],
  [
    "12 Oct 2026",
    "Standard day",
    "Bengaluru HQ",
    "09:00",
    "18:00",
    "Published"
  ],
  [
    "13 Oct 2026",
    "Flexible",
    "Remote",
    "08:00–10:00",
    "17:00–19:00",
    "Published"
  ]
];

export const initialRequests = [
  {
    id: "EX-2048",
    type: "Missing punch",
    date: "09 Oct 2026",
    detail: "Clock-out time missing",
    proposed: "06:00 PM",
    reason: "Forgot to clock out before leaving",
    status: "Pending",
    approver: "Jordan Lee"
  },
  {
    id: "LV-2028",
    type: "Leave request",
    date: "06 Oct 2026",
    detail: "Half-day leave",
    proposed: "12 Oct 2026",
    reason: "Appointment",
    status: "Approved",
    approver: "Jordan Lee"
  },
  {
    id: "EX-2019",
    type: "Time correction",
    date: "05 Oct 2026",
    detail: "Attendance adjustment",
    proposed: "09:00 AM",
    reason: "Previously reviewed request",
    status: "Rejected",
    approver: "HR Operations"
  }
];

export const notificationPreferences = [
  ["Missing punch reminders", true],
  ["Shift schedule changes", true],
  ["Leave and approval updates", true],
  ["Monthly attendance acknowledgment", true],
  ["Product announcements", false]
] as const;
