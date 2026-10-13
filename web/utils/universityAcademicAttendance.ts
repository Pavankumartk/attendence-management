import { readSession } from "@/utils/session";

export type AcademicRequestStatus = "Pending" | "Escalated" | "Approved" | "Rejected";
export type AcademicRequestStage = "FACULTY" | "COORDINATOR" | "ADMIN" | "COMPLETE";
export type AcademicActionType = "APPROVE" | "REJECT" | "ESCALATE";

export type AcademicAction = {
  action: AcademicActionType;
  byName: string;
  byRole: string;
  note: string;
  at: string;
};

export type AcademicAttendanceRequest = {
  id: string;
  studentName: string;
  studentId: string;
  department: string;
  batch: string;
  subject: string;
  sessionDate: string;
  sessionTime: string;
  recordedStatus: string;
  requestedStatus: string;
  reason: string;
  evidence: string;
  status: AcademicRequestStatus;
  currentStage: AcademicRequestStage;
  currentApprover: string;
  submittedAt: string;
  actions: AcademicAction[];
};

const STORAGE_KEY = "university_academic_attendance_requests_v2";

function timestamp() {
  return new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function seedRequests(): AcademicAttendanceRequest[] {
  return [
    {
      id: "ACR-3101",
      studentName: "Riya Patel",
      studentId: "STU-2401",
      department: "Computer Science",
      batch: "B.Tech CSE · 2026-A",
      subject: "CS301 · Data Structures",
      sessionDate: "12 Oct 2026",
      sessionTime: "09:00–10:00",
      recordedStatus: "Absent",
      requestedStatus: "Present",
      reason: "I attended the full class but the published session record shows Absent.",
      evidence: "Class participation / Faculty verification requested.",
      status: "Pending",
      currentStage: "FACULTY",
      currentApprover: "Faculty",
      submittedAt: "12 Oct 2026, 04:25 PM",
      actions: []
    },
    {
      id: "ACR-3107",
      studentName: "Nisha Roy",
      studentId: "STU-2412",
      department: "Computer Science",
      batch: "B.Tech CSE · 2026-A",
      subject: "CS305 · Algorithms",
      sessionDate: "10 Oct 2026",
      sessionTime: "11:00–12:00",
      recordedStatus: "Absent",
      requestedStatus: "Present",
      reason: "Attendance evidence could not be reconciled at Faculty level.",
      evidence: "Class register entry and timetable reference attached in the demo case.",
      status: "Escalated",
      currentStage: "COORDINATOR",
      currentApprover: "Department Coordinator",
      submittedAt: "10 Oct 2026, 03:15 PM",
      actions: [
        {
          action: "ESCALATE",
          byName: "Dr. Kavya Shah",
          byRole: "Faculty",
          note: "Class register and Student evidence conflict. Department review required.",
          at: "11 Oct 2026, 10:20 AM"
        }
      ]
    },
    {
      id: "ACR-3112",
      studentName: "Vikram Das",
      studentId: "STU-2418",
      department: "Computer Science",
      batch: "B.Tech CSE · 2026-A",
      subject: "CS221 · Programming Lab",
      sessionDate: "08 Oct 2026",
      sessionTime: "02:00–04:00",
      recordedStatus: "Absent",
      requestedStatus: "Late",
      reason: "Student joined the lab after the first attendance capture.",
      evidence: "Lab system login time referenced in the demo case.",
      status: "Escalated",
      currentStage: "ADMIN",
      currentApprover: "University Admin",
      submittedAt: "08 Oct 2026, 05:10 PM",
      actions: [
        {
          action: "ESCALATE",
          byName: "Dr. Kavya Shah",
          byRole: "Faculty",
          note: "Late-arrival evidence needs department review.",
          at: "09 Oct 2026, 09:35 AM"
        },
        {
          action: "ESCALATE",
          byName: "Arjun Rao",
          byRole: "Department Coordinator",
          note: "Evidence remains disputed; final University decision required.",
          at: "10 Oct 2026, 02:05 PM"
        }
      ]
    }
  ];
}

function readStore(): AcademicAttendanceRequest[] {
  if (typeof window === "undefined") return seedRequests();

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedRequests();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    return JSON.parse(raw) as AcademicAttendanceRequest[];
  } catch {
    const seeded = seedRequests();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function saveStore(requests: AcademicAttendanceRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

export function createStudentAttendanceCorrection(input: {
  subject: string;
  sessionDate: string;
  sessionTime: string;
  recordedStatus: string;
  requestedStatus: string;
  reason: string;
  evidence: string;
}): AcademicAttendanceRequest | null {
  const session = readSession();

  if (
    !session ||
    session.tenant !== "UNIVERSITY_COLLEGE" ||
    session.role !== "STUDENT"
  ) {
    return null;
  }

  const request: AcademicAttendanceRequest = {
    id: `ACR-${Date.now().toString().slice(-6)}`,
    studentName: session.name,
    studentId: session.employeeId,
    department: "Computer Science",
    batch: session.unit || "Assigned academic group",
    subject: input.subject,
    sessionDate: input.sessionDate,
    sessionTime: input.sessionTime,
    recordedStatus: input.recordedStatus,
    requestedStatus: input.requestedStatus,
    reason: input.reason.trim(),
    evidence: input.evidence.trim(),
    status: "Pending",
    currentStage: "FACULTY",
    currentApprover: "Faculty",
    submittedAt: timestamp(),
    actions: []
  };

  saveStore([request, ...readStore()]);
  return request;
}

export function getMyStudentAttendanceRequests(): AcademicAttendanceRequest[] {
  const session = readSession();
  if (!session) return [];

  return readStore().filter(
    (request) => request.studentId === session.employeeId
  );
}

export function getUniversityAcademicQueue(
  area: "faculty" | "coordinator" | "admin"
): AcademicAttendanceRequest[] {
  const stage: Record<typeof area, AcademicRequestStage> = {
    faculty: "FACULTY",
    coordinator: "COORDINATOR",
    admin: "ADMIN"
  };

  return readStore().filter(
    (request) =>
      request.currentStage === stage[area] &&
      request.status !== "Approved" &&
      request.status !== "Rejected"
  );
}

export function getUniversityAcademicAudit(): AcademicAttendanceRequest[] {
  return readStore().filter((request) => request.actions.length > 0);
}

export function actOnUniversityAcademicRequest(
  requestId: string,
  area: "faculty" | "coordinator" | "admin",
  action: AcademicActionType,
  note: string
): AcademicAttendanceRequest | null {
  const session = readSession();
  if (!session || session.tenant !== "UNIVERSITY_COLLEGE") return null;

  const expectedRole = {
    faculty: "FACULTY",
    coordinator: "DEPARTMENT_COORDINATOR",
    admin: "UNIVERSITY_ADMIN"
  } as const;

  if (session.role !== expectedRole[area]) return null;

  const requests = readStore();
  const current = requests.find((request) => request.id === requestId);
  if (!current) return null;

  const expectedStage: Record<typeof area, AcademicRequestStage> = {
    faculty: "FACULTY",
    coordinator: "COORDINATOR",
    admin: "ADMIN"
  };

  if (current.currentStage !== expectedStage[area]) return null;
  if (current.studentId === session.employeeId) return null;

  const actionRecord: AcademicAction = {
    action,
    byName: session.name,
    byRole: session.roleLabel,
    note: note.trim(),
    at: timestamp()
  };

  let nextStage: AcademicRequestStage = "COMPLETE";
  let nextStatus: AcademicRequestStatus =
    action === "APPROVE" ? "Approved" : "Rejected";
  let nextApprover = session.roleLabel;

  if (action === "ESCALATE") {
    nextStatus = "Escalated";

    if (area === "faculty") {
      nextStage = "COORDINATOR";
      nextApprover = "Department Coordinator";
    } else if (area === "coordinator") {
      nextStage = "ADMIN";
      nextApprover = "University Admin";
    } else {
      return null;
    }
  }

  const updated: AcademicAttendanceRequest = {
    ...current,
    status: nextStatus,
    currentStage: nextStage,
    currentApprover: nextApprover,
    actions: [...current.actions, actionRecord]
  };

  saveStore(
    requests.map((request) =>
      request.id === requestId ? updated : request
    )
  );

  return updated;
}
