import type {
  AttendanceRoleCode,
  CorporateSession,
  RoleAuthority,
  RoleLevel,
  TenantKey
} from "@/types/corporate";

type RoleDefinition = {
  code: AttendanceRoleCode;
  label: string;
  level: RoleLevel;
  name: string;
  employeeId: string;
  unit: string;
  reportsTo: string;
  approverLabel: string;
  authority: RoleAuthority;
};

type TenantDefinition = {
  key: TenantKey;
  label: string;
  organization: string;
  site: string;
  shift: string;
  peopleLabel: string;
  groupLabel: string;
  roles: RoleDefinition[];
};

const personalOnly = (
  responsibility: string,
  scope: string,
  escalation: string,
  peopleLabel: string
): RoleAuthority => ({
  responsibility,
  scope,
  can: [
    "Clock in, start/end break and clock out for your own workday",
    "View your own attendance calendar and daily punch detail",
    "View your own leave balance, holidays and assigned roster",
    "Raise your own attendance correction or leave request",
    "Track your own approval history and notifications"
  ],
  cannot: [
    `View or manage attendance for other ${peopleLabel.toLowerCase()}`,
    "Approve your own request",
    "Change attendance policy, permissions or organization settings"
  ],
  escalation,
  areaTitle: "MY ATTENDANCE",
  actions: []
});

const tenants: Record<TenantKey, TenantDefinition> = {
  CORPORATE: {
    key: "CORPORATE",
    label: "Corporate",
    organization: "Northstar Group",
    site: "Bengaluru HQ",
    shift: "09:00 AM – 06:00 PM",
    peopleLabel: "Employees",
    groupLabel: "Team",
    roles: [
      {
        code: "COMPANY_ADMIN",
        label: "Company Admin",
        level: "ADMIN",
        name: "Priya Sharma",
        employeeId: "ADM-1001",
        unit: "Corporate Administration",
        reportsTo: "Tenant governance",
        approverLabel: "Designated tenant approver",
        authority: {
          responsibility:
            "Administer the Corporate attendance tenant while keeping your own attendance separate.",
          scope: "Organization-wide configuration and final administrative escalation.",
          can: [
            "Configure organization structure, sites and attendance feature settings",
            "Provision employees and maintain roles and permissions",
            "Manage SSO, security and attendance integrations",
            "Review organization audit activity",
            "Handle final attendance administration escalations"
          ],
          cannot: [
            "Use another employee's punches as your personal attendance",
            "Replace the Manager's first-level team approval responsibility",
            "Approve your own personal attendance or leave request"
          ],
          escalation: "Final tenant administration level",
          areaTitle: "ADMINISTRATION",
          actions: [
            { title: "Organization setup", description: "Maintain the Corporate organization structure." },
            { title: "Sites & branches", description: "Maintain attendance locations and site settings." },
            { title: "Employee provisioning", description: "Provision and offboard employee attendance access." },
            { title: "Roles & permissions", description: "Maintain attendance access scope." },
            { title: "SSO & security", description: "Manage secure identity and access settings." },
            { title: "Integrations & APIs", description: "Manage biometric, identity and payroll connectors." },
            { title: "Feature settings", description: "Control tenant-level attendance features." },
            { title: "Audit log", description: "Review administrative attendance changes." }
          ]
        }
      },
      {
        code: "HR_COORDINATOR",
        label: "HR Coordinator",
        level: "COORDINATOR",
        name: "Neha Rao",
        employeeId: "HR-2012",
        unit: "Human Resources",
        reportsTo: "Company Admin",
        approverLabel: "Company Admin",
        authority: {
          responsibility:
            "Operate workforce attendance, handle escalated exceptions and prepare attendance for period close.",
          scope: "Workforce-wide operational attendance within the Corporate tenant.",
          can: [
            "Review workforce attendance and employee attendance history",
            "Inspect live punches and workforce exceptions",
            "Handle escalated attendance correction cases",
            "Operate policy configuration, leave ledger and holiday/workweek settings",
            "Run monthly close, payroll bridge and attendance reports",
            "Process controlled attendance imports and corrections"
          ],
          cannot: [
            "Replace Company Admin for tenant security, SSO or role administration",
            "Treat workforce records as your personal attendance",
            "Approve your own personal attendance or leave request"
          ],
          escalation: "Unresolved administration issue → Company Admin",
          areaTitle: "WORKFORCE MANAGEMENT",
          actions: [
            { title: "Workforce overview", description: "Monitor overall workforce attendance health." },
            { title: "Employee 360°", description: "Review an employee's attendance, leave and exceptions." },
            { title: "Live punches", description: "Inspect real-time attendance events." },
            { title: "Exception queue", description: "Triage escalated attendance exceptions." },
            { title: "Policy configuration", description: "Operate attendance policy versions." },
            { title: "Leave ledger", description: "Review leave grants, use and pending balances." },
            { title: "Holiday & workweek", description: "Maintain workforce calendars and workweeks." },
            { title: "Monthly close", description: "Reconcile exceptions before period lock." },
            { title: "Payroll bridge", description: "Validate payable attendance before payroll export." },
            { title: "Reports & analytics", description: "Generate workforce attendance reports." },
            { title: "Imports & corrections", description: "Validate bulk attendance adjustments." }
          ]
        }
      },
      {
        code: "MANAGER",
        label: "Manager / Supervisor",
        level: "SUPERVISOR",
        name: "Jordan Lee",
        employeeId: "MGR-1020",
        unit: "Engineering",
        reportsTo: "HR Coordinator",
        approverLabel: "HR Coordinator",
        authority: {
          responsibility:
            "Manage attendance for your assigned team and perform first-level review of team requests.",
          scope: "Assigned/direct team only.",
          can: [
            "Review today's attendance for direct reports",
            "Review the team attendance calendar",
            "Approve or reject first-level attendance and leave requests",
            "Review team shift roster and attendance exceptions",
            "Monitor staffing coverage",
            "View team attendance analytics"
          ],
          cannot: [
            "Change organization-wide attendance policy",
            "Manage tenant roles, SSO or security",
            "Perform workforce-wide monthly close or payroll administration",
            "Use team attendance as your own personal attendance"
          ],
          escalation: "Unresolved team issue → HR Coordinator",
          areaTitle: "TEAM MANAGEMENT",
          actions: [
            { title: "Team today", description: "Review expected versus present direct reports." },
            { title: "Team calendar", description: "Review team attendance by date." },
            { title: "Pending approvals", description: "Perform first-level request review." },
            { title: "Shift roster", description: "Review assigned team shifts." },
            { title: "Team exceptions", description: "Review missing punches and attendance anomalies." },
            { title: "Staffing coverage", description: "Check shift coverage and gaps." },
            { title: "Team analytics", description: "Review team attendance trends." }
          ]
        }
      },
      {
        code: "EMPLOYEE",
        label: "Employee",
        level: "MEMBER",
        name: "Alex Carter",
        employeeId: "EMP-1024",
        unit: "Engineering",
        reportsTo: "Manager / Supervisor",
        approverLabel: "Manager / Supervisor",
        authority: personalOnly(
          "Maintain your own daily attendance and attendance requests.",
          "Your own attendance record only.",
          "Attendance issue → Manager / Supervisor → HR Coordinator → Company Admin",
          "employees"
        )
      }
    ]
  },

  UNIVERSITY_COLLEGE: {
    key: "UNIVERSITY_COLLEGE",
    label: "University & College",
    organization: "Demo University",
    site: "Main Campus",
    shift: "09:00 AM – 05:00 PM",
    peopleLabel: "Students",
    groupLabel: "Batch / Class",
    roles: [
      {
        code: "UNIVERSITY_ADMIN",
        label: "University Admin",
        level: "ADMIN",
        name: "Dr. Meera Nair",
        employeeId: "UA-1001",
        unit: "University Administration",
        reportsTo: "University governance",
        approverLabel: "Designated university approver",
        authority: {
          responsibility:
            "Oversee university attendance across departments and act as final attendance escalation.",
          scope: "University-wide attendance oversight.",
          can: [
            "Review department, faculty and student attendance summaries",
            "Review unresolved attendance escalations",
            "Review university attendance reports",
            "Oversee attendance rules and authorized assignments",
            "Act as final university attendance escalation"
          ],
          cannot: [
            "Use faculty or student attendance as your personal attendance",
            "Replace Faculty as the first reviewer for a student's attendance issue",
            "Approve your own personal attendance request"
          ],
          escalation: "Final university attendance level",
          areaTitle: "UNIVERSITY ATTENDANCE OVERSIGHT",
          actions: [
            { title: "University overview", description: "Review attendance across departments." },
            { title: "Department oversight", description: "Review department-level attendance health." },
            { title: "Faculty & student monitoring", description: "Review attendance within authorized university scope." },
            { title: "Final escalations", description: "Resolve attendance cases escalated beyond the department." },
            { title: "Attendance reports", description: "Review university attendance reporting." }
          ]
        }
      },
      {
        code: "DEPARTMENT_COORDINATOR",
        label: "Department Coordinator",
        level: "COORDINATOR",
        name: "Arjun Rao",
        employeeId: "DC-0204",
        unit: "Computer Science Department",
        reportsTo: "University Admin",
        approverLabel: "University Admin",
        authority: {
          responsibility:
            "Coordinate attendance for the department and handle issues escalated by Faculty.",
          scope: "Assigned department, Faculty and Students.",
          can: [
            "Review department attendance status",
            "Review Faculty and Student attendance within the department",
            "Review issues escalated by Faculty",
            "Monitor batches/classes within department scope",
            "Escalate unresolved attendance cases to University Admin"
          ],
          cannot: [
            "Act outside the assigned department scope",
            "Replace Faculty as first reviewer for a student's attendance issue",
            "Approve your own personal attendance request"
          ],
          escalation: "Unresolved department issue → University Admin",
          areaTitle: "DEPARTMENT ATTENDANCE",
          actions: [
            { title: "Department overview", description: "Review attendance across the assigned department." },
            { title: "Faculty attendance", description: "Review Faculty attendance within department scope." },
            { title: "Student attendance", description: "Review Student attendance within department scope." },
            { title: "Escalated cases", description: "Handle cases that Faculty could not resolve." },
            { title: "Batch / class monitoring", description: "Review attendance by authorized batch or class." }
          ]
        }
      },
      {
        code: "FACULTY",
        label: "Faculty",
        level: "SUPERVISOR",
        name: "Dr. Kavya Shah",
        employeeId: "FAC-0318",
        unit: "Computer Science Department",
        reportsTo: "Department Coordinator",
        approverLabel: "Department Coordinator",
        authority: {
          responsibility:
            "Maintain your own attendance and manage attendance for assigned Students/classes.",
          scope: "Assigned classes, batches and Students only.",
          can: [
            "Review attendance for assigned Students/classes",
            "Record or review authorized class attendance",
            "Review Student attendance correction issues first",
            "Monitor attendance for assigned batches/classes",
            "Escalate unresolved Student issues to Department Coordinator"
          ],
          cannot: [
            "Review unrelated departments or classes",
            "Perform final university escalation",
            "Use Student attendance as your personal attendance"
          ],
          escalation: "Unresolved Student issue → Department Coordinator → University Admin",
          areaTitle: "STUDENT / CLASS ATTENDANCE",
          actions: [
            { title: "Assigned classes", description: "Review classes assigned to you." },
            { title: "Student attendance", description: "Review attendance for your assigned Students." },
            { title: "Attendance issues", description: "Review Student attendance problems first." },
            { title: "Correction review", description: "Review Student correction requests within scope." },
            { title: "Escalate unresolved cases", description: "Send unresolved cases to Department Coordinator." }
          ]
        }
      },
      {
        code: "STUDENT",
        label: "Student",
        level: "MEMBER",
        name: "Riya Patel",
        employeeId: "STU-2401",
        unit: "Computer Science · Batch 2026",
        reportsTo: "Faculty",
        approverLabel: "Faculty",
        authority: personalOnly(
          "Review your own attendance and raise your own attendance issues.",
          "Your own Student attendance record only.",
          "Attendance issue → Faculty → Department Coordinator → University Admin",
          "students"
        )
      }
    ]
  },

  SKILL_ACADEMY: {
    key: "SKILL_ACADEMY",
    label: "Skill Academy",
    organization: "Demo Skill Academy",
    site: "Training Centre",
    shift: "09:30 AM – 05:30 PM",
    peopleLabel: "Learners",
    groupLabel: "Batch / Program",
    roles: [
      {
        code: "INSTITUTE_ADMIN_SKILL",
        label: "Institute Admin",
        level: "ADMIN",
        name: "Anita Verma",
        employeeId: "IA-S101",
        unit: "Academy Administration",
        reportsTo: "Institute governance",
        approverLabel: "Designated institute approver",
        authority: {
          responsibility: "Oversee attendance across the Skill Academy and handle final tenant escalation.",
          scope: "Skill Academy-wide attendance oversight.",
          can: ["Review academy attendance summaries", "Review program/batch attendance", "Review escalated attendance issues", "Review attendance reports", "Maintain authorized attendance settings"],
          cannot: ["Replace Trainer/Faculty as the first learner issue reviewer", "Use learner attendance as your personal attendance", "Approve your own personal request"],
          escalation: "Final Skill Academy attendance level",
          areaTitle: "ACADEMY ATTENDANCE OVERSIGHT",
          actions: [
            { title: "Academy overview", description: "Review attendance across the academy." },
            { title: "Program / batch monitoring", description: "Review attendance by program and batch." },
            { title: "Escalated cases", description: "Review unresolved attendance issues." },
            { title: "Attendance reports", description: "Review academy attendance reporting." }
          ]
        }
      },
      {
        code: "COORDINATOR_SKILL",
        label: "Coordinator",
        level: "COORDINATOR",
        name: "Rahul Menon",
        employeeId: "CO-S122",
        unit: "Program Coordination",
        reportsTo: "Institute Admin",
        approverLabel: "Institute Admin",
        authority: {
          responsibility: "Coordinate attendance for assigned academy programs and batches.",
          scope: "Assigned programs, batches, Trainers and Learners.",
          can: ["Review program attendance", "Review Trainer and Learner attendance", "Handle issues escalated by Trainer/Faculty", "Monitor assigned batches", "Escalate unresolved issues to Institute Admin"],
          cannot: ["Act outside assigned program scope", "Replace Trainer/Faculty as first learner reviewer", "Approve your own personal request"],
          escalation: "Unresolved program issue → Institute Admin",
          areaTitle: "PROGRAM ATTENDANCE",
          actions: [
            { title: "Program overview", description: "Review assigned program attendance." },
            { title: "Trainer attendance", description: "Review Trainer/Faculty attendance." },
            { title: "Learner attendance", description: "Review Learner attendance." },
            { title: "Escalated cases", description: "Handle issues escalated by Trainer/Faculty." }
          ]
        }
      },
      {
        code: "TRAINER_SKILL",
        label: "Faculty / Trainer",
        level: "SUPERVISOR",
        name: "Sana Iqbal",
        employeeId: "TR-S318",
        unit: "Full Stack Program",
        reportsTo: "Coordinator",
        approverLabel: "Coordinator",
        authority: {
          responsibility: "Maintain your own attendance and manage attendance for assigned Learners/sessions.",
          scope: "Assigned Learners, batches and sessions only.",
          can: ["Review assigned Learner attendance", "Record/review attendance for assigned sessions", "Review learner attendance issues first", "Review correction requests within scope", "Escalate unresolved cases to Coordinator"],
          cannot: ["Review unrelated programs", "Perform final institute escalation", "Use Learner attendance as your personal attendance"],
          escalation: "Unresolved Learner issue → Coordinator → Institute Admin",
          areaTitle: "LEARNER / SESSION ATTENDANCE",
          actions: [
            { title: "Assigned sessions", description: "Review your assigned sessions." },
            { title: "Learner attendance", description: "Review attendance for assigned Learners." },
            { title: "Correction review", description: "Review Learner corrections within scope." },
            { title: "Escalations", description: "Escalate unresolved cases to Coordinator." }
          ]
        }
      },
      {
        code: "LEARNER_SKILL",
        label: "Student / Learner",
        level: "MEMBER",
        name: "Kiran Das",
        employeeId: "LR-S401",
        unit: "Full Stack Program · Batch A",
        reportsTo: "Faculty / Trainer",
        approverLabel: "Faculty / Trainer",
        authority: personalOnly(
          "Review your own academy attendance and raise your own attendance issue.",
          "Your own Learner attendance only.",
          "Attendance issue → Faculty / Trainer → Coordinator → Institute Admin",
          "learners"
        )
      }
    ]
  },

  BOOTCAMP: {
    key: "BOOTCAMP",
    label: "Bootcamp",
    organization: "Demo Bootcamp",
    site: "Bootcamp Hub",
    shift: "10:00 AM – 06:00 PM",
    peopleLabel: "Learners",
    groupLabel: "Cohort",
    roles: [
      {
        code: "INSTITUTE_ADMIN_BOOTCAMP",
        label: "Institute Admin",
        level: "ADMIN",
        name: "Maya Thomas",
        employeeId: "IA-B101",
        unit: "Bootcamp Administration",
        reportsTo: "Institute governance",
        approverLabel: "Designated institute approver",
        authority: {
          responsibility: "Oversee bootcamp attendance and final attendance escalation.",
          scope: "Bootcamp-wide attendance oversight.",
          can: ["Review bootcamp attendance summaries", "Review cohort attendance", "Review escalated attendance cases", "Review attendance reports", "Maintain authorized attendance settings"],
          cannot: ["Replace Trainer/Faculty as first Learner reviewer", "Use Learner attendance as your personal attendance", "Approve your own personal request"],
          escalation: "Final Bootcamp attendance level",
          areaTitle: "BOOTCAMP ATTENDANCE OVERSIGHT",
          actions: [
            { title: "Bootcamp overview", description: "Review attendance across the bootcamp." },
            { title: "Cohort monitoring", description: "Review attendance by cohort." },
            { title: "Escalated cases", description: "Review unresolved attendance issues." },
            { title: "Attendance reports", description: "Review bootcamp attendance reporting." }
          ]
        }
      },
      {
        code: "COORDINATOR_BOOTCAMP",
        label: "Coordinator",
        level: "COORDINATOR",
        name: "Dev Arora",
        employeeId: "CO-B122",
        unit: "Cohort Coordination",
        reportsTo: "Institute Admin",
        approverLabel: "Institute Admin",
        authority: {
          responsibility: "Coordinate attendance for assigned cohorts and handle escalated issues.",
          scope: "Assigned cohorts, Trainers and Learners.",
          can: ["Review cohort attendance", "Review Trainer and Learner attendance", "Handle issues escalated by Trainer/Faculty", "Monitor cohort attendance health", "Escalate unresolved issues to Institute Admin"],
          cannot: ["Act outside assigned cohort scope", "Replace Trainer/Faculty as first learner reviewer", "Approve your own personal request"],
          escalation: "Unresolved cohort issue → Institute Admin",
          areaTitle: "COHORT ATTENDANCE",
          actions: [
            { title: "Cohort overview", description: "Review attendance across assigned cohorts." },
            { title: "Trainer attendance", description: "Review Trainer/Faculty attendance." },
            { title: "Learner attendance", description: "Review Learner attendance." },
            { title: "Escalated cases", description: "Handle cases escalated from Trainers." }
          ]
        }
      },
      {
        code: "TRAINER_BOOTCAMP",
        label: "Faculty / Trainer",
        level: "SUPERVISOR",
        name: "Nikhil Bose",
        employeeId: "TR-B318",
        unit: "Cohort 12",
        reportsTo: "Coordinator",
        approverLabel: "Coordinator",
        authority: {
          responsibility: "Maintain your own attendance and manage attendance for assigned cohort Learners.",
          scope: "Assigned cohort/sessions only.",
          can: ["Review assigned Learner attendance", "Record/review attendance for assigned sessions", "Review attendance issues first", "Review correction requests within scope", "Escalate unresolved cases to Coordinator"],
          cannot: ["Review unrelated cohorts", "Perform final institute escalation", "Use Learner attendance as your personal attendance"],
          escalation: "Unresolved Learner issue → Coordinator → Institute Admin",
          areaTitle: "LEARNER / COHORT ATTENDANCE",
          actions: [
            { title: "Assigned cohort", description: "Review the cohort assigned to you." },
            { title: "Learner attendance", description: "Review Learner attendance." },
            { title: "Correction review", description: "Review Learner correction issues." },
            { title: "Escalations", description: "Escalate unresolved issues to Coordinator." }
          ]
        }
      },
      {
        code: "LEARNER_BOOTCAMP",
        label: "Student / Learner",
        level: "MEMBER",
        name: "Aisha Khan",
        employeeId: "LR-B401",
        unit: "Cohort 12",
        reportsTo: "Faculty / Trainer",
        approverLabel: "Faculty / Trainer",
        authority: personalOnly(
          "Review your own bootcamp attendance and raise your own attendance issue.",
          "Your own Learner attendance only.",
          "Attendance issue → Faculty / Trainer → Coordinator → Institute Admin",
          "learners"
        )
      }
    ]
  },

  GOVERNMENT: {
    key: "GOVERNMENT",
    label: "Government",
    organization: "Demo Government Program",
    site: "Department Office",
    shift: "09:00 AM – 05:30 PM",
    peopleLabel: "Participants",
    groupLabel: "Program / Unit",
    roles: [
      {
        code: "INSTITUTE_ADMIN_GOVERNMENT",
        label: "Institute Admin",
        level: "ADMIN",
        name: "Vivek Rao",
        employeeId: "IA-G101",
        unit: "Program Administration",
        reportsTo: "Program governance",
        approverLabel: "Designated program approver",
        authority: {
          responsibility: "Oversee attendance across the Government tenant and final escalations.",
          scope: "Tenant-wide authorized attendance oversight.",
          can: ["Review attendance summaries", "Review program/unit attendance", "Review escalated issues", "Review attendance reports", "Maintain authorized attendance settings"],
          cannot: ["Replace the assigned Faculty/Trainer as first participant reviewer", "Use participant attendance as your personal attendance", "Approve your own personal request"],
          escalation: "Final Government tenant attendance level",
          areaTitle: "PROGRAM ATTENDANCE OVERSIGHT",
          actions: [
            { title: "Program overview", description: "Review attendance across authorized programs." },
            { title: "Unit monitoring", description: "Review attendance by assigned unit/program." },
            { title: "Escalated cases", description: "Review unresolved attendance issues." },
            { title: "Attendance reports", description: "Review attendance reporting." }
          ]
        }
      },
      {
        code: "COORDINATOR_GOVERNMENT",
        label: "Coordinator",
        level: "COORDINATOR",
        name: "Pooja Sen",
        employeeId: "CO-G122",
        unit: "Program Coordination",
        reportsTo: "Institute Admin",
        approverLabel: "Institute Admin",
        authority: {
          responsibility: "Coordinate attendance within assigned Government programs/units.",
          scope: "Assigned programs, units, Faculty/Trainers and Participants.",
          can: ["Review assigned program attendance", "Review Faculty/Trainer and Participant attendance", "Handle escalated attendance issues", "Monitor assigned groups", "Escalate unresolved issues to Institute Admin"],
          cannot: ["Act outside assigned program scope", "Replace the first-level reviewer", "Approve your own personal request"],
          escalation: "Unresolved program issue → Institute Admin",
          areaTitle: "PROGRAM COORDINATION",
          actions: [
            { title: "Program overview", description: "Review attendance in assigned programs." },
            { title: "Faculty / Trainer attendance", description: "Review staff attendance within scope." },
            { title: "Participant attendance", description: "Review participant attendance within scope." },
            { title: "Escalated cases", description: "Handle escalated attendance issues." }
          ]
        }
      },
      {
        code: "TRAINER_GOVERNMENT",
        label: "Faculty / Trainer",
        level: "SUPERVISOR",
        name: "Rakesh Nair",
        employeeId: "TR-G318",
        unit: "Program Unit A",
        reportsTo: "Coordinator",
        approverLabel: "Coordinator",
        authority: {
          responsibility: "Maintain your own attendance and manage attendance for assigned Participants/sessions.",
          scope: "Assigned Participants and sessions only.",
          can: ["Review assigned Participant attendance", "Record/review authorized session attendance", "Review attendance issues first", "Review correction requests within scope", "Escalate unresolved cases to Coordinator"],
          cannot: ["Review unrelated programs", "Perform final tenant escalation", "Use Participant attendance as your personal attendance"],
          escalation: "Unresolved Participant issue → Coordinator → Institute Admin",
          areaTitle: "PARTICIPANT / SESSION ATTENDANCE",
          actions: [
            { title: "Assigned sessions", description: "Review authorized attendance sessions." },
            { title: "Participant attendance", description: "Review attendance for assigned Participants." },
            { title: "Correction review", description: "Review Participant attendance issues." },
            { title: "Escalations", description: "Escalate unresolved cases to Coordinator." }
          ]
        }
      },
      {
        code: "LEARNER_GOVERNMENT",
        label: "Student / Learner",
        level: "MEMBER",
        name: "Sanjay Kumar",
        employeeId: "LR-G401",
        unit: "Program Unit A",
        reportsTo: "Faculty / Trainer",
        approverLabel: "Faculty / Trainer",
        authority: personalOnly(
          "Review your own attendance and raise your own attendance issue.",
          "Your own attendance record only.",
          "Attendance issue → Faculty / Trainer → Coordinator → Institute Admin",
          "participants"
        )
      }
    ]
  },

  NGO: {
    key: "NGO",
    label: "NGO",
    organization: "Demo NGO",
    site: "Program Office",
    shift: "09:30 AM – 05:30 PM",
    peopleLabel: "Participants",
    groupLabel: "Program / Group",
    roles: [
      {
        code: "INSTITUTE_ADMIN_NGO",
        label: "Institute Admin",
        level: "ADMIN",
        name: "Farah Ali",
        employeeId: "IA-N101",
        unit: "NGO Administration",
        reportsTo: "NGO governance",
        approverLabel: "Designated NGO approver",
        authority: {
          responsibility: "Oversee attendance across the NGO tenant and final attendance escalations.",
          scope: "NGO-wide authorized attendance oversight.",
          can: ["Review NGO attendance summaries", "Review program/group attendance", "Review escalated attendance issues", "Review attendance reports", "Maintain authorized attendance settings"],
          cannot: ["Replace the assigned Faculty/Trainer as first participant reviewer", "Use participant attendance as your personal attendance", "Approve your own personal request"],
          escalation: "Final NGO attendance level",
          areaTitle: "NGO ATTENDANCE OVERSIGHT",
          actions: [
            { title: "NGO overview", description: "Review attendance across programs." },
            { title: "Program monitoring", description: "Review attendance by authorized program/group." },
            { title: "Escalated cases", description: "Review unresolved attendance issues." },
            { title: "Attendance reports", description: "Review NGO attendance reporting." }
          ]
        }
      },
      {
        code: "COORDINATOR_NGO",
        label: "Coordinator",
        level: "COORDINATOR",
        name: "Joseph Mathew",
        employeeId: "CO-N122",
        unit: "Program Coordination",
        reportsTo: "Institute Admin",
        approverLabel: "Institute Admin",
        authority: {
          responsibility: "Coordinate attendance for assigned NGO programs/groups.",
          scope: "Assigned programs, groups, Faculty/Trainers and Participants.",
          can: ["Review assigned program attendance", "Review Faculty/Trainer and Participant attendance", "Handle issues escalated by first-level reviewers", "Monitor authorized groups", "Escalate unresolved issues to Institute Admin"],
          cannot: ["Act outside assigned program scope", "Replace first-level reviewer responsibility", "Approve your own personal request"],
          escalation: "Unresolved program issue → Institute Admin",
          areaTitle: "PROGRAM ATTENDANCE",
          actions: [
            { title: "Program overview", description: "Review attendance across assigned programs." },
            { title: "Faculty / Trainer attendance", description: "Review staff attendance within scope." },
            { title: "Participant attendance", description: "Review participant attendance within scope." },
            { title: "Escalated cases", description: "Handle escalated attendance issues." }
          ]
        }
      },
      {
        code: "TRAINER_NGO",
        label: "Faculty / Trainer",
        level: "SUPERVISOR",
        name: "Leena Paul",
        employeeId: "TR-N318",
        unit: "Community Program A",
        reportsTo: "Coordinator",
        approverLabel: "Coordinator",
        authority: {
          responsibility: "Maintain your own attendance and manage attendance for assigned Participants/sessions.",
          scope: "Assigned Participants, groups and sessions only.",
          can: ["Review assigned Participant attendance", "Record/review authorized session attendance", "Review attendance issues first", "Review correction requests within scope", "Escalate unresolved cases to Coordinator"],
          cannot: ["Review unrelated programs", "Perform final NGO escalation", "Use Participant attendance as your personal attendance"],
          escalation: "Unresolved Participant issue → Coordinator → Institute Admin",
          areaTitle: "PARTICIPANT / SESSION ATTENDANCE",
          actions: [
            { title: "Assigned sessions", description: "Review sessions assigned to you." },
            { title: "Participant attendance", description: "Review attendance for assigned Participants." },
            { title: "Correction review", description: "Review attendance issues within scope." },
            { title: "Escalations", description: "Escalate unresolved cases to Coordinator." }
          ]
        }
      },
      {
        code: "LEARNER_NGO",
        label: "Student / Learner",
        level: "MEMBER",
        name: "Imran Sheikh",
        employeeId: "LR-N401",
        unit: "Community Program A",
        reportsTo: "Faculty / Trainer",
        approverLabel: "Faculty / Trainer",
        authority: personalOnly(
          "Review your own attendance and raise your own attendance issue.",
          "Your own attendance record only.",
          "Attendance issue → Faculty / Trainer → Coordinator → Institute Admin",
          "participants"
        )
      }
    ]
  }
};

export const tenantOptions = Object.values(tenants).map((tenant) => ({
  value: tenant.key,
  label: tenant.label
}));

export function getTenantConfig(tenant: TenantKey) {
  return tenants[tenant];
}

export function getRoleOptions(tenant: TenantKey) {
  return tenants[tenant].roles.map((role) => ({
    value: role.code,
    label: role.label
  }));
}

export function buildSession(
  tenantKey: TenantKey,
  roleCode: AttendanceRoleCode
): CorporateSession {
  const tenant = tenants[tenantKey];
  const role =
    tenant.roles.find((item) => item.code === roleCode) ??
    tenant.roles.find((item) => item.level === "MEMBER") ??
    tenant.roles[0];

  return {
    tenant: tenant.key,
    tenantLabel: tenant.label,
    role: role.code,
    roleLabel: role.label,
    level: role.level,
    name: role.name,
    employeeId: role.employeeId,
    organization: tenant.organization,
    site: tenant.site,
    unit: role.unit,
    reportsTo: role.reportsTo,
    shift: tenant.shift,
    approverLabel: role.approverLabel,
    peopleLabel: tenant.peopleLabel,
    groupLabel: tenant.groupLabel,
    authority: role.authority
  };
}

export function getDefaultRole(tenant: TenantKey): AttendanceRoleCode {
  const member = tenants[tenant].roles.find((role) => role.level === "MEMBER");
  return (member ?? tenants[tenant].roles[0]).code;
}

export function isTenantKey(value: string): value is TenantKey {
  return value in tenants;
}

export function findSessionByLegacyRole(role: string): CorporateSession | null {
  const map: Record<string, AttendanceRoleCode> = {
    COMPANY_ADMIN: "COMPANY_ADMIN",
    HR_COORDINATOR: "HR_COORDINATOR",
    MANAGER: "MANAGER",
    EMPLOYEE: "EMPLOYEE"
  };

  const mapped = map[role];
  return mapped ? buildSession("CORPORATE", mapped) : null;
}
