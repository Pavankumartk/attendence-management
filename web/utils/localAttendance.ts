import { readSession } from "@/utils/session";

export type ClockState = "NOT_STARTED" | "WORKING" | "ON_BREAK" | "COMPLETED";

export type LocalPunch = {
  id: string;
  type: "IN" | "BREAK_START" | "BREAK_END" | "OUT";
  time: string;
};

export type LocalRequest = {
  id: string;
  type: string;
  date: string;
  detail: string;
  proposed: string;
  reason: string;
  status: string;
  approver: string;
};

export type WorkflowStage = "MANAGER" | "HR" | "ADMIN" | "COMPLETE";
export type WorkflowActionType = "APPROVE" | "REJECT" | "ESCALATE";

export type WorkflowAction = {
  action: WorkflowActionType;
  byName: string;
  byRole: string;
  note: string;
  at: string;
};

export type WorkflowRequest = LocalRequest & {
  requesterName: string;
  requesterEmployeeId: string;
  requesterRoleLabel: string;
  requesterTenant: string;
  requesterOwnerKey: string;
  currentStage: WorkflowStage;
  submittedAt: string;
  actions: WorkflowAction[];
};

const WORKFLOW_KEY = "attendance_workflow_requests_v2";

function ownerKey() {
  const session = readSession();
  return `${session?.tenant || "TENANT"}_${session?.employeeId || "USER"}`;
}

function key(base: string) {
  return `${base}_${ownerKey()}`;
}

function personalRequestKey(owner: string) {
  return `attendance_requests_${owner}`;
}

function initialStageForCurrentUser(): WorkflowStage {
  const session = readSession();

  if (!session) return "MANAGER";
  if (session.level === "MEMBER") return "MANAGER";
  if (session.level === "SUPERVISOR") return "HR";
  if (session.level === "COORDINATOR") return "ADMIN";

  // Admin users cannot approve their own personal request. It remains at the
  // final administration level for a separately designated approver.
  return "ADMIN";
}

function seedWorkflowRequests(): WorkflowRequest[] {
  return [
    {
      id: "EX-2048",
      type: "Missing punch",
      date: "09 Oct 2026",
      detail: "Clock-out time missing",
      proposed: "06:00 PM",
      reason: "Forgot to clock out before leaving",
      status: "Pending",
      approver: "Manager / Supervisor",
      requesterName: "Alex Carter",
      requesterEmployeeId: "EMP-1024",
      requesterRoleLabel: "Employee",
      requesterTenant: "CORPORATE",
      requesterOwnerKey: "CORPORATE_EMP-1024",
      currentStage: "MANAGER",
      submittedAt: "09 Oct 2026, 06:18 PM",
      actions: []
    },
    {
      id: "LV-2051",
      type: "Leave request",
      date: "16 Oct 2026",
      detail: "Annual / earned leave",
      proposed: "16 Oct 2026",
      reason: "Personal commitment",
      status: "Pending",
      approver: "Manager / Supervisor",
      requesterName: "Maya Singh",
      requesterEmployeeId: "EMP-1031",
      requesterRoleLabel: "Employee",
      requesterTenant: "CORPORATE",
      requesterOwnerKey: "CORPORATE_EMP-1031",
      currentStage: "MANAGER",
      submittedAt: "12 Oct 2026, 09:35 AM",
      actions: []
    },
    {
      id: "EX-2011",
      type: "Attendance exception",
      date: "08 Oct 2026",
      detail: "Repeated no-punch exception",
      proposed: "Review attendance evidence",
      reason: "Manager could not resolve repeated missing punch records",
      status: "Escalated",
      approver: "HR Coordinator",
      requesterName: "Ravi Kumar",
      requesterEmployeeId: "EMP-1042",
      requesterRoleLabel: "Employee",
      requesterTenant: "CORPORATE",
      requesterOwnerKey: "CORPORATE_EMP-1042",
      currentStage: "HR",
      submittedAt: "08 Oct 2026, 04:42 PM",
      actions: [
        {
          action: "ESCALATE",
          byName: "Jordan Lee",
          byRole: "Manager / Supervisor",
          note: "Repeated issue requires HR review.",
          at: "09 Oct 2026, 10:15 AM"
        }
      ]
    }
  ];
}

function readWorkflowStore(): WorkflowRequest[] {
  const raw = localStorage.getItem(WORKFLOW_KEY);

  if (!raw) {
    const seeded = seedWorkflowRequests();
    localStorage.setItem(WORKFLOW_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    return JSON.parse(raw) as WorkflowRequest[];
  } catch {
    const seeded = seedWorkflowRequests();
    localStorage.setItem(WORKFLOW_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function saveWorkflowStore(requests: WorkflowRequest[]) {
  localStorage.setItem(WORKFLOW_KEY, JSON.stringify(requests));
}

function updatePersonalRequestFromWorkflow(request: WorkflowRequest) {
  const storageKey = personalRequestKey(request.requesterOwnerKey);
  const raw = localStorage.getItem(storageKey);
  const localVersion: LocalRequest = {
    id: request.id,
    type: request.type,
    date: request.date,
    detail: request.detail,
    proposed: request.proposed,
    reason: request.reason,
    status: request.status,
    approver: request.approver
  };

  if (!raw) {
    localStorage.setItem(storageKey, JSON.stringify([localVersion]));
    return;
  }

  try {
    const personalRequests = JSON.parse(raw) as LocalRequest[];
    const exists = personalRequests.some((item) => item.id === request.id);
    const updated = exists
      ? personalRequests.map((item) =>
          item.id === request.id ? localVersion : item
        )
      : [localVersion, ...personalRequests];

    localStorage.setItem(storageKey, JSON.stringify(updated));
  } catch {
    localStorage.setItem(storageKey, JSON.stringify([localVersion]));
  }
}

export function getClockState(): ClockState {
  const value = localStorage.getItem(key("attendance_clock_state")) as ClockState | null;
  return value || "NOT_STARTED";
}

export function setClockState(state: ClockState) {
  localStorage.setItem(key("attendance_clock_state"), state);
}

export function getPunches(): LocalPunch[] {
  const raw = localStorage.getItem(key("attendance_punches"));
  if (!raw) return [];

  try {
    return JSON.parse(raw) as LocalPunch[];
  } catch {
    return [];
  }
}

export function addPunch(type: LocalPunch["type"]) {
  const punches = getPunches();
  const punch: LocalPunch = {
    id: `PCH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    type,
    time: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  localStorage.setItem(
    key("attendance_punches"),
    JSON.stringify([...punches, punch])
  );

  return punch;
}

function starterRequests(): LocalRequest[] {
  const session = readSession();
  const approver = session?.approverLabel || "Assigned approver";

  return [
    {
      id: "EX-2048",
      type: "Missing punch",
      date: "09 Oct 2026",
      detail: "Clock-out time missing",
      proposed: "06:00 PM",
      reason: "Forgot to clock out before leaving",
      status: "Pending",
      approver
    },
    {
      id: "LV-2028",
      type: "Leave request",
      date: "06 Oct 2026",
      detail: "Half-day leave",
      proposed: "12 Oct 2026",
      reason: "Personal appointment",
      status: "Approved",
      approver
    }
  ];
}

export function getRequests(): LocalRequest[] {
  const requestKey = key("attendance_requests");
  const raw = localStorage.getItem(requestKey);

  if (!raw) {
    const initial = starterRequests();
    localStorage.setItem(requestKey, JSON.stringify(initial));
    return initial;
  }

  try {
    return JSON.parse(raw) as LocalRequest[];
  } catch {
    return starterRequests();
  }
}

export function addRequest(request: LocalRequest) {
  const requests = getRequests();
  const session = readSession();
  const currentOwnerKey = ownerKey();

  localStorage.setItem(
    key("attendance_requests"),
    JSON.stringify([request, ...requests])
  );

  if (!session) return;

  const workflowRequest: WorkflowRequest = {
    ...request,
    requesterName: session.name,
    requesterEmployeeId: session.employeeId,
    requesterRoleLabel: session.roleLabel,
    requesterTenant: session.tenant,
    requesterOwnerKey: currentOwnerKey,
    currentStage: initialStageForCurrentUser(),
    submittedAt: new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    actions: []
  };

  const workflow = readWorkflowStore().filter((item) => item.id !== request.id);
  saveWorkflowStore([workflowRequest, ...workflow]);
}

export function getWorkflowRequests(
  area: "manager" | "hr" | "admin"
): WorkflowRequest[] {
  const session = readSession();
  const stage: Record<typeof area, WorkflowStage> = {
    manager: "MANAGER",
    hr: "HR",
    admin: "ADMIN"
  };

  return readWorkflowStore().filter((request) => {
    const unresolved = request.status !== "Approved" && request.status !== "Rejected";
    const sameStage = request.currentStage === stage[area];
    const corporateRequest = request.requesterTenant === "CORPORATE";

    // No role may approve its own personal attendance request.
    const notOwnRequest = request.requesterEmployeeId !== session?.employeeId;

    return unresolved && sameStage && corporateRequest && notOwnRequest;
  });
}

export function getWorkflowAudit(): WorkflowRequest[] {
  return readWorkflowStore().filter((request) => request.actions.length > 0);
}

export function actOnWorkflowRequest(
  requestId: string,
  action: WorkflowActionType,
  note: string
): WorkflowRequest | null {
  const session = readSession();
  if (!session) return null;

  const requests = readWorkflowStore();
  const current = requests.find((item) => item.id === requestId);
  if (!current) return null;

  const allowedStage: Record<string, WorkflowStage> = {
    MANAGER: "MANAGER",
    HR_COORDINATOR: "HR",
    COMPANY_ADMIN: "ADMIN"
  };

  if (allowedStage[session.role] !== current.currentStage) {
    return null;
  }

  if (current.requesterEmployeeId === session.employeeId) {
    return null;
  }

  const actionRecord: WorkflowAction = {
    action,
    byName: session.name,
    byRole: session.roleLabel,
    note: note.trim(),
    at: new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  let nextStage: WorkflowStage = "COMPLETE";
  let nextStatus = action === "APPROVE" ? "Approved" : "Rejected";
  let nextApprover = session.roleLabel;

  if (action === "ESCALATE") {
    nextStatus = "Escalated";

    if (current.currentStage === "MANAGER") {
      nextStage = "HR";
      nextApprover = "HR Coordinator";
    } else if (current.currentStage === "HR") {
      nextStage = "ADMIN";
      nextApprover = "Company Admin";
    } else {
      return null;
    }
  }

  const updatedRequest: WorkflowRequest = {
    ...current,
    status: nextStatus,
    approver: nextApprover,
    currentStage: nextStage,
    actions: [...current.actions, actionRecord]
  };

  const updatedStore = requests.map((item) =>
    item.id === requestId ? updatedRequest : item
  );

  saveWorkflowStore(updatedStore);
  updatePersonalRequestFromWorkflow(updatedRequest);

  return updatedRequest;
}

// -----------------------------------------------------------------------------
// UNIVERSITY & COLLEGE WORKFLOW
// Added separately so the existing Corporate Manager → HR → Company Admin
// behavior above is not changed.
// -----------------------------------------------------------------------------

export type UniversityWorkflowArea = "faculty" | "coordinator" | "admin";

function universitySeedRequests(): WorkflowRequest[] {
  return [
    {
      id: "EDU-3101",
      type: "Attendance correction",
      date: "09 Oct 2026",
      detail: "Student was marked absent for CS301 but attended the session.",
      proposed: "Change session status to Present",
      reason: "Student submitted classroom participation evidence.",
      status: "Pending",
      approver: "Faculty",
      requesterName: "Riya Patel",
      requesterEmployeeId: "STU-2401",
      requesterRoleLabel: "Student",
      requesterTenant: "UNIVERSITY_COLLEGE",
      requesterOwnerKey: "UNIVERSITY_COLLEGE_STU-2401",
      currentStage: "MANAGER",
      submittedAt: "10 Oct 2026, 09:20 AM",
      actions: []
    },
    {
      id: "EDU-3102",
      type: "Absence request",
      date: "15 Oct 2026",
      detail: "Authorized academic absence request for one class day.",
      proposed: "Excused absence",
      reason: "University-level sports representation.",
      status: "Pending",
      approver: "Faculty",
      requesterName: "Aarav Menon",
      requesterEmployeeId: "STU-2407",
      requesterRoleLabel: "Student",
      requesterTenant: "UNIVERSITY_COLLEGE",
      requesterOwnerKey: "UNIVERSITY_COLLEGE_STU-2407",
      currentStage: "MANAGER",
      submittedAt: "12 Oct 2026, 02:05 PM",
      actions: []
    },
    {
      id: "EDU-3110",
      type: "Missing punch",
      date: "11 Oct 2026",
      detail: "Faculty personal clock-out is missing.",
      proposed: "05:06 PM",
      reason: "Campus device did not register the final punch.",
      status: "Pending",
      approver: "Department Coordinator",
      requesterName: "Dr. Kavya Shah",
      requesterEmployeeId: "FAC-0318",
      requesterRoleLabel: "Faculty",
      requesterTenant: "UNIVERSITY_COLLEGE",
      requesterOwnerKey: "UNIVERSITY_COLLEGE_FAC-0318",
      currentStage: "HR",
      submittedAt: "12 Oct 2026, 08:40 AM",
      actions: []
    },
    {
      id: "EDU-3114",
      type: "Student attendance correction",
      date: "08 Oct 2026",
      detail: "Class attendance evidence conflicts with the published register.",
      proposed: "Review session evidence and correct status",
      reason: "Faculty could not resolve the evidence mismatch at first level.",
      status: "Escalated",
      approver: "Department Coordinator",
      requesterName: "Nisha Roy",
      requesterEmployeeId: "STU-2412",
      requesterRoleLabel: "Student",
      requesterTenant: "UNIVERSITY_COLLEGE",
      requesterOwnerKey: "UNIVERSITY_COLLEGE_STU-2412",
      currentStage: "HR",
      submittedAt: "09 Oct 2026, 11:15 AM",
      actions: [
        {
          action: "ESCALATE",
          byName: "Dr. Kavya Shah",
          byRole: "Faculty",
          note: "Evidence requires Department Coordinator review.",
          at: "10 Oct 2026, 10:05 AM"
        }
      ]
    },
    {
      id: "EDU-3120",
      type: "Final attendance escalation",
      date: "04 Oct 2026",
      detail: "Student session status remains disputed after Faculty and Department review.",
      proposed: "Final University attendance decision",
      reason: "Department review could not reconcile timetable and attendance evidence.",
      status: "Escalated",
      approver: "University Admin",
      requesterName: "Vikram Das",
      requesterEmployeeId: "STU-2418",
      requesterRoleLabel: "Student",
      requesterTenant: "UNIVERSITY_COLLEGE",
      requesterOwnerKey: "UNIVERSITY_COLLEGE_STU-2418",
      currentStage: "ADMIN",
      submittedAt: "06 Oct 2026, 03:30 PM",
      actions: [
        {
          action: "ESCALATE",
          byName: "Dr. Kavya Shah",
          byRole: "Faculty",
          note: "Escalated after first-level review.",
          at: "07 Oct 2026, 09:25 AM"
        },
        {
          action: "ESCALATE",
          byName: "Arjun Rao",
          byRole: "Department Coordinator",
          note: "Timetable evidence still conflicts; University decision required.",
          at: "08 Oct 2026, 02:10 PM"
        }
      ]
    }
  ];
}

function readUniversityWorkflowStore(): WorkflowRequest[] {
  const requests = readWorkflowStore();
  const hasUniversityRequests = requests.some(
    (request) => request.requesterTenant === "UNIVERSITY_COLLEGE"
  );

  if (hasUniversityRequests) return requests;

  const combined = [...universitySeedRequests(), ...requests];
  saveWorkflowStore(combined);
  return combined;
}

export function getUniversityWorkflowRequests(
  area: UniversityWorkflowArea
): WorkflowRequest[] {
  const session = readSession();
  const stage: Record<UniversityWorkflowArea, WorkflowStage> = {
    faculty: "MANAGER",
    coordinator: "HR",
    admin: "ADMIN"
  };

  return readUniversityWorkflowStore().filter((request) => {
    const unresolved =
      request.status !== "Approved" && request.status !== "Rejected";
    const sameStage = request.currentStage === stage[area];
    const universityRequest = request.requesterTenant === "UNIVERSITY_COLLEGE";
    const notOwnRequest = request.requesterEmployeeId !== session?.employeeId;

    return unresolved && sameStage && universityRequest && notOwnRequest;
  });
}

export function getUniversityWorkflowAudit(): WorkflowRequest[] {
  return readUniversityWorkflowStore().filter(
    (request) =>
      request.requesterTenant === "UNIVERSITY_COLLEGE" &&
      request.actions.length > 0
  );
}

export function actOnUniversityWorkflowRequest(
  requestId: string,
  action: WorkflowActionType,
  note: string
): WorkflowRequest | null {
  const session = readSession();
  if (!session || session.tenant !== "UNIVERSITY_COLLEGE") return null;

  const requests = readUniversityWorkflowStore();
  const current = requests.find((item) => item.id === requestId);

  if (!current || current.requesterTenant !== "UNIVERSITY_COLLEGE") {
    return null;
  }

  const allowedStage: Record<string, WorkflowStage> = {
    FACULTY: "MANAGER",
    DEPARTMENT_COORDINATOR: "HR",
    UNIVERSITY_ADMIN: "ADMIN"
  };

  if (allowedStage[session.role] !== current.currentStage) {
    return null;
  }

  if (current.requesterEmployeeId === session.employeeId) {
    return null;
  }

  const actionRecord: WorkflowAction = {
    action,
    byName: session.name,
    byRole: session.roleLabel,
    note: note.trim(),
    at: new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  let nextStage: WorkflowStage = "COMPLETE";
  let nextStatus = action === "APPROVE" ? "Approved" : "Rejected";
  let nextApprover = session.roleLabel;

  if (action === "ESCALATE") {
    nextStatus = "Escalated";

    if (current.currentStage === "MANAGER") {
      nextStage = "HR";
      nextApprover = "Department Coordinator";
    } else if (current.currentStage === "HR") {
      nextStage = "ADMIN";
      nextApprover = "University Admin";
    } else {
      return null;
    }
  }

  const updatedRequest: WorkflowRequest = {
    ...current,
    status: nextStatus,
    approver: nextApprover,
    currentStage: nextStage,
    actions: [...current.actions, actionRecord]
  };

  const updatedStore = requests.map((item) =>
    item.id === requestId ? updatedRequest : item
  );

  saveWorkflowStore(updatedStore);
  updatePersonalRequestFromWorkflow(updatedRequest);

  return updatedRequest;
}
