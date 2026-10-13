export type UniversityArea = "student" | "faculty" | "department" | "admin";

export type UniversityViewData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  headers: string[];
  rows: string[][];
};

const universityViews: Record<UniversityArea, Record<string, UniversityViewData>> = {
  student: {
    overview: {
      eyebrow: "MY ACADEMIC ATTENDANCE",
      title: "Attendance overview",
      subtitle:
        "Your class and subject attendance for the current academic term. Student attendance is session-based, not an employee clock-in/payroll record.",
      headers: ["Today", "Subject", "Time", "Room", "Attendance", "Status"],
      rows: [
        ["14 Oct 2026", "CS301 · Data Structures", "09:00–10:00", "C-204", "Present", "Recorded"],
        ["14 Oct 2026", "CS305 · Algorithms", "11:00–12:00", "C-301", "Present", "Recorded"],
        ["14 Oct 2026", "CS221 · Programming Lab", "02:00–04:00", "Lab-2", "Pending", "Awaiting Faculty"]
      ]
    },
    "subject-attendance": {
      eyebrow: "MY ACADEMIC ATTENDANCE",
      title: "Subject attendance",
      subtitle:
        "Review attendance percentage and session totals for each enrolled subject.",
      headers: ["Subject", "Classes held", "Present", "Absent", "Late / excused", "Attendance"],
      rows: [
        ["CS301 · Data Structures", "18", "16", "2", "0", "88.9%"],
        ["CS305 · Algorithms", "16", "14", "1", "1", "87.5%"],
        ["CS221 · Programming Lab", "10", "10", "0", "0", "100%"],
        ["CS399 · Project Review", "6", "5", "1", "0", "83.3%"]
      ]
    },
    "attendance-calendar": {
      eyebrow: "MY ACADEMIC ATTENDANCE",
      title: "Attendance calendar",
      subtitle:
        "See your class attendance day by day across the academic term.",
      headers: ["Date", "Scheduled sessions", "Present", "Absent", "Late / excused", "Day status"],
      rows: [
        ["14 Oct 2026", "3", "2", "0", "0", "1 pending"],
        ["13 Oct 2026", "4", "4", "0", "0", "Complete"],
        ["12 Oct 2026", "3", "2", "1", "0", "Review"],
        ["10 Oct 2026", "2", "2", "0", "0", "Complete"]
      ]
    },
    "session-history": {
      eyebrow: "MY ACADEMIC ATTENDANCE",
      title: "Class / session history",
      subtitle:
        "Review the attendance status recorded by Faculty for each class session.",
      headers: ["Date", "Subject", "Faculty", "Session", "Attendance", "Record status"],
      rows: [
        ["14 Oct 2026", "CS301 · Data Structures", "Dr. Kavya Shah", "09:00–10:00", "Present", "Recorded"],
        ["13 Oct 2026", "CS305 · Algorithms", "Prof. Rahul Iyer", "11:00–12:00", "Present", "Recorded"],
        ["12 Oct 2026", "CS301 · Data Structures", "Dr. Kavya Shah", "09:00–10:00", "Absent", "Correction available"],
        ["10 Oct 2026", "CS221 · Programming Lab", "Dr. Kavya Shah", "02:00–04:00", "Late", "Recorded"]
      ]
    },
    "attendance-correction": {
      eyebrow: "MY ACADEMIC ATTENDANCE",
      title: "Attendance correction request",
      subtitle:
        "Raise a correction when a class/session attendance record is incorrect. The request goes to Faculty first.",
      headers: [],
      rows: []
    },
    "request-history": {
      eyebrow: "MY ACADEMIC ATTENDANCE",
      title: "Attendance request history",
      subtitle:
        "Track Student attendance corrections, Faculty decisions and any escalation to Department Coordinator or University Admin.",
      headers: [],
      rows: []
    },
    "academic-calendar": {
      eyebrow: "MY ACADEMIC ATTENDANCE",
      title: "Academic calendar",
      subtitle:
        "Academic term dates, teaching days, University holidays and attendance-relevant closures.",
      headers: ["Date / period", "Academic event", "Audience", "Campus", "Attendance impact", "Status"],
      rows: [
        ["Aug–Dec 2026", "Semester 5 teaching term", "B.Tech CSE", "Main Campus", "Timetable attendance active", "Published"],
        ["20 Oct 2026", "University holiday", "All Students / Faculty", "All campuses", "No scheduled classes", "Published"],
        ["02–07 Nov 2026", "Internal assessment week", "Semester 5", "Main Campus", "Assessment timetable applies", "Published"],
        ["15 Dec 2026", "Last teaching day", "Semester 5", "Main Campus", "Term attendance closes", "Published"]
      ]
    },
    notifications: {
      eyebrow: "MY ACADEMIC ATTENDANCE",
      title: "Attendance notifications",
      subtitle:
        "Class attendance updates, missing records, correction decisions and academic attendance reminders.",
      headers: ["When", "Notification", "Subject / scope", "Status"],
      rows: [
        ["Today · 10:10 AM", "Attendance recorded as Present", "CS301 · Data Structures", "Read"],
        ["Yesterday · 04:30 PM", "Correction request awaiting Faculty review", "CS301 · Data Structures", "Unread"],
        ["12 Oct · 05:15 PM", "Attendance below configured academic threshold", "CS399 · Project Review", "Read"]
      ]
    },
    profile: {
      eyebrow: "MY ACADEMIC ATTENDANCE",
      title: "Academic attendance profile",
      subtitle:
        "Student identity and academic assignment used for attendance scope.",
      headers: ["Field", "Value"],
      rows: [
        ["Student", "Riya Patel"],
        ["Student ID", "STU-2401"],
        ["Programme", "B.Tech · Computer Science"],
        ["Batch / Semester", "2026-A · Semester 5"],
        ["Department", "Computer Science"],
        ["Campus", "Main Campus"],
        ["Faculty adviser", "Dr. Kavya Shah"]
      ]
    }
  },

  faculty: {
    "assigned-classes": {
      eyebrow: "STUDENT / CLASS ATTENDANCE",
      title: "Assigned classes",
      subtitle:
        "Faculty timetable-linked classes, batches and campus locations assigned to you.",
      headers: ["Subject", "Batch / Class", "Schedule", "Campus / Room", "Students", "Status"],
      rows: [
        ["CS301 · Data Structures", "B.Tech CSE · 2026-A", "Mon/Wed · 09:00", "Main Campus · C-204", "42", "Active"],
        ["CS305 · Algorithms", "B.Tech CSE · 2026-B", "Tue/Thu · 11:00", "Main Campus · C-301", "39", "Active"],
        ["CS221 · Programming Lab", "BCA · Semester 3", "Fri · 14:00", "Lab-2", "31", "Active"]
      ]
    },
    "take-attendance": {
      eyebrow: "STUDENT / CLASS ATTENDANCE",
      title: "Take class attendance",
      subtitle:
        "Record attendance for Students in your assigned timetable session.",
      headers: [],
      rows: []
    },
    "student-attendance": {
      eyebrow: "STUDENT / CLASS ATTENDANCE",
      title: "Student attendance",
      subtitle:
        "Review Student attendance only for classes and batches assigned to you.",
      headers: ["Student", "Student ID", "Subject", "Present", "Absent", "Attendance"],
      rows: [
        ["Riya Patel", "STU-2401", "CS301", "16", "2", "88.9%"],
        ["Aarav Menon", "STU-2407", "CS301", "17", "1", "94.4%"],
        ["Nisha Roy", "STU-2412", "CS301", "15", "3", "83.3%"],
        ["Vikram Das", "STU-2418", "CS301", "16", "1", "88.9%"]
      ]
    },
    "pending-corrections": {
      eyebrow: "STUDENT / CLASS ATTENDANCE",
      title: "Pending Student corrections",
      subtitle:
        "First-level review for Student class/session attendance corrections in your assigned classes.",
      headers: [],
      rows: []
    },
    "attendance-issues": {
      eyebrow: "STUDENT / CLASS ATTENDANCE",
      title: "Attendance issues",
      subtitle:
        "Class sessions requiring Faculty review because attendance is missing, incomplete or disputed.",
      headers: ["Session", "Subject", "Batch / Class", "Issue", "Students affected", "Status"],
      rows: [
        ["14 Oct · 02:00 PM", "CS221 · Programming Lab", "BCA Sem 3", "Attendance not submitted", "31", "Open"],
        ["12 Oct · 09:00 AM", "CS301 · Data Structures", "CSE 2026-A", "2 Student disputes", "2", "Review"],
        ["10 Oct · 11:00 AM", "CS305 · Algorithms", "CSE 2026-B", "Late marks awaiting review", "3", "Review"]
      ]
    },
    "batch-monitoring": {
      eyebrow: "STUDENT / CLASS ATTENDANCE",
      title: "Batch / class monitoring",
      subtitle:
        "Monitor attendance completion for the academic groups assigned to you.",
      headers: ["Batch / Class", "Subject", "Sessions held", "Attendance completed", "Open issues", "Status"],
      rows: [
        ["B.Tech CSE · 2026-A", "CS301", "18", "18", "2", "Complete"],
        ["B.Tech CSE · 2026-B", "CS305", "16", "15", "3", "Review"],
        ["BCA · Semester 3", "CS221", "10", "9", "1", "Review"]
      ]
    },
    "class-analytics": {
      eyebrow: "STUDENT / CLASS ATTENDANCE",
      title: "Class attendance analytics",
      subtitle:
        "Attendance trends across your assigned subjects and Student groups.",
      headers: ["Subject", "Sessions", "Average attendance", "Students below threshold", "Open corrections", "Status"],
      rows: [
        ["CS301 · Data Structures", "18", "89%", "4", "2", "Healthy"],
        ["CS305 · Algorithms", "16", "84%", "7", "3", "Review"],
        ["CS221 · Programming Lab", "10", "92%", "2", "1", "Healthy"]
      ]
    }
  },

  department: {
    "department-overview": {
      eyebrow: "DEPARTMENT ATTENDANCE",
      title: "Department attendance overview",
      subtitle:
        "Department Coordinator view of academic attendance across Faculty, Students, batches and classes.",
      headers: ["Academic group", "Type", "People", "Attendance / completion", "Open issues", "Status"],
      rows: [
        ["Computer Science Faculty", "Faculty", "32", "30 present today", "2", "Healthy"],
        ["B.Tech CSE · 2026-A", "Student batch", "42", "91% average", "2", "Healthy"],
        ["B.Tech CSE · 2026-B", "Student batch", "39", "85% average", "4", "Review"],
        ["BCA · Semester 3", "Student batch", "31", "92% average", "1", "Healthy"]
      ]
    },
    "faculty-attendance": {
      eyebrow: "DEPARTMENT ATTENDANCE",
      title: "Faculty staff attendance",
      subtitle:
        "Review Faculty workday attendance separately from Student class attendance.",
      headers: ["Faculty", "Faculty ID", "Staff attendance today", "First class", "Assigned classes", "Status"],
      rows: [
        ["Dr. Kavya Shah", "FAC-0318", "Present · 08:54 AM", "09:00 AM", "3", "Active"],
        ["Prof. Rahul Iyer", "FAC-0321", "Present · 09:06 AM", "11:00 AM", "4", "Active"],
        ["Dr. Sana Khan", "FAC-0330", "Approved staff leave", "—", "0", "Approved"],
        ["Prof. Dev Mehta", "FAC-0337", "Incomplete staff punch", "11:00 AM", "2", "Review"]
      ]
    },
    "student-attendance": {
      eyebrow: "DEPARTMENT ATTENDANCE",
      title: "Student academic attendance",
      subtitle:
        "Review Student class/session attendance across authorized batches in the department.",
      headers: ["Batch / Class", "Students", "Average attendance", "Below threshold", "Open corrections", "Status"],
      rows: [
        ["B.Tech CSE · 2026-A", "42", "91%", "4", "2", "Healthy"],
        ["B.Tech CSE · 2026-B", "39", "85%", "7", "4", "Review"],
        ["BCA · Semester 3", "31", "92%", "2", "1", "Healthy"],
        ["MCA · Semester 5", "16", "90%", "1", "1", "Healthy"]
      ]
    },
    "escalated-cases": {
      eyebrow: "DEPARTMENT ATTENDANCE",
      title: "Escalated attendance cases",
      subtitle:
        "Resolve Student cases escalated by Faculty and Faculty staff-attendance corrections routed to the department.",
      headers: [],
      rows: []
    },
    "batch-class-monitoring": {
      eyebrow: "DEPARTMENT ATTENDANCE",
      title: "Batch / class monitoring",
      subtitle:
        "Monitor timetable sessions, Faculty attendance submission and Student attendance completion.",
      headers: ["Batch / Class", "Today's sessions", "Attendance submitted", "Pending", "Faculty coverage", "Status"],
      rows: [
        ["B.Tech CSE · 2026-A", "6", "5", "1", "Complete", "Review"],
        ["B.Tech CSE · 2026-B", "5", "5", "0", "Complete", "Healthy"],
        ["BCA · Semester 3", "4", "4", "0", "Complete", "Healthy"],
        ["MCA · Semester 5", "3", "2", "1", "Substitute assigned", "Review"]
      ]
    },
    "department-analytics": {
      eyebrow: "DEPARTMENT ATTENDANCE",
      title: "Department attendance analytics",
      subtitle:
        "Academic attendance trends for Faculty, Students and timetable-linked classes.",
      headers: ["Measure", "Current", "Previous", "Change", "Attention", "Status"],
      rows: [
        ["Student average attendance", "88.1%", "87.4%", "+0.7%", "11 Students below threshold", "Healthy"],
        ["Faculty staff attendance", "93.8%", "94.1%", "-0.3%", "2 incomplete days", "Review"],
        ["Class attendance submission", "96.4%", "95.0%", "+1.4%", "2 sessions pending", "Healthy"],
        ["Correction turnaround", "1.3 days", "1.7 days", "-0.4 days", "3 escalations", "Healthy"]
      ]
    }
  },

  admin: {
    "university-overview": {
      eyebrow: "UNIVERSITY ATTENDANCE OVERSIGHT",
      title: "University attendance overview",
      subtitle:
        "University-wide academic attendance across campuses, departments and academic/non-academic groups.",
      headers: ["Unit / Group", "Type", "Campus", "People", "Attendance health", "Status"],
      rows: [
        ["Computer Science", "Academic department", "Main Campus", "812", "91%", "Healthy"],
        ["Commerce", "Academic department", "Main Campus", "640", "88%", "Review"],
        ["Administration", "Non-academic staff", "Main Campus", "96", "94% staff attendance", "Healthy"],
        ["Research Centre", "Academic / research", "North Campus", "122", "90%", "Healthy"]
      ]
    },
    "department-attendance": {
      eyebrow: "UNIVERSITY ATTENDANCE OVERSIGHT",
      title: "Department attendance",
      subtitle:
        "Compare class-attendance completion, Student attendance health and departmental exceptions.",
      headers: ["Department", "Coordinator", "Faculty", "Students", "Open cases", "Status"],
      rows: [
        ["Computer Science", "Arjun Rao", "32", "780", "5", "Healthy"],
        ["Commerce", "Anita Joseph", "28", "612", "9", "Review"],
        ["Electronics", "Farhan Ali", "24", "540", "3", "Healthy"],
        ["Mathematics", "Lakshmi Menon", "19", "420", "2", "Healthy"]
      ]
    },
    "faculty-attendance": {
      eyebrow: "UNIVERSITY ATTENDANCE OVERSIGHT",
      title: "Faculty staff attendance",
      subtitle:
        "University-level Faculty workday attendance with campus and department context.",
      headers: ["Department", "Faculty", "Present", "Staff leave", "Incomplete", "Status"],
      rows: [
        ["Computer Science", "32", "30", "1", "1", "Healthy"],
        ["Commerce", "28", "25", "2", "1", "Review"],
        ["Electronics", "24", "23", "1", "0", "Healthy"],
        ["Mathematics", "19", "18", "1", "0", "Healthy"]
      ]
    },
    "student-attendance": {
      eyebrow: "UNIVERSITY ATTENDANCE OVERSIGHT",
      title: "Student academic attendance",
      subtitle:
        "University-level Student class/session attendance by department, programme and academic group.",
      headers: ["Department", "Students", "Average attendance", "Below threshold", "Open corrections", "Status"],
      rows: [
        ["Computer Science", "780", "89%", "31", "8", "Healthy"],
        ["Commerce", "612", "85%", "47", "12", "Review"],
        ["Electronics", "540", "91%", "19", "5", "Healthy"],
        ["Mathematics", "420", "90%", "14", "3", "Healthy"]
      ]
    },
    "final-escalations": {
      eyebrow: "UNIVERSITY ATTENDANCE OVERSIGHT",
      title: "Final attendance escalations",
      subtitle:
        "Final review for attendance cases unresolved by Faculty and Department Coordinator.",
      headers: [],
      rows: []
    },
    "academic-calendar": {
      eyebrow: "UNIVERSITY ATTENDANCE OVERSIGHT",
      title: "Campus & academic calendar",
      subtitle:
        "Manage attendance-relevant academic terms, timetable periods, campus holidays and non-academic staff calendars.",
      headers: ["Calendar", "Audience", "Campus", "Effective period", "Attendance use", "Status"],
      rows: [
        ["UG Semester 5", "Students / Faculty", "Main Campus", "Aug–Dec 2026", "Timetable-linked class attendance", "Published"],
        ["PG Semester 3", "Students / Faculty", "Main Campus", "Aug–Dec 2026", "Timetable-linked class attendance", "Published"],
        ["University Staff Workweek", "Non-academic / staff", "All campuses", "2026", "Daily staff attendance", "Published"],
        ["Regional Holiday Calendar", "All groups", "Main Campus", "2026", "Holiday / closure reference", "Published"]
      ]
    },
    "attendance-reports": {
      eyebrow: "UNIVERSITY ATTENDANCE OVERSIGHT",
      title: "University attendance reports",
      subtitle:
        "Academic attendance reports by Student, subject, batch, Faculty, department and campus.",
      headers: ["Report", "Scope", "Period", "Owner", "Last generated", "Status"],
      rows: [
        ["Student subject attendance register", "Subject / Batch / Class", "Current term", "University Attendance", "13 Oct 2026", "Ready"],
        ["Low-attendance Student list", "Department / Programme", "Current term", "Department Coordinators", "13 Oct 2026", "Ready"],
        ["Faculty attendance submission report", "Department / Faculty", "Monthly", "University Attendance", "13 Oct 2026", "Ready"],
        ["Faculty staff attendance summary", "Department / Campus", "Monthly", "University HR", "12 Oct 2026", "Ready"]
      ]
    }
  }
};

export function isUniversityArea(value: string): value is UniversityArea {
  return value === "student" || value === "faculty" || value === "department" || value === "admin";
}

export function getUniversityViewData(
  area: UniversityArea,
  view: string
): UniversityViewData | null {
  return universityViews[area][view] || null;
}
