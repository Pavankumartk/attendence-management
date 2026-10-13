export type TenantKey =
  | "UNIVERSITY_COLLEGE"
  | "SKILL_ACADEMY"
  | "BOOTCAMP"
  | "CORPORATE"
  | "GOVERNMENT"
  | "NGO";

export type RoleLevel = "ADMIN" | "COORDINATOR" | "SUPERVISOR" | "MEMBER";

export type AttendanceRoleCode =
  | "UNIVERSITY_ADMIN"
  | "DEPARTMENT_COORDINATOR"
  | "FACULTY"
  | "STUDENT"
  | "INSTITUTE_ADMIN_SKILL"
  | "COORDINATOR_SKILL"
  | "TRAINER_SKILL"
  | "LEARNER_SKILL"
  | "INSTITUTE_ADMIN_BOOTCAMP"
  | "COORDINATOR_BOOTCAMP"
  | "TRAINER_BOOTCAMP"
  | "LEARNER_BOOTCAMP"
  | "COMPANY_ADMIN"
  | "HR_COORDINATOR"
  | "MANAGER"
  | "EMPLOYEE"
  | "INSTITUTE_ADMIN_GOVERNMENT"
  | "COORDINATOR_GOVERNMENT"
  | "TRAINER_GOVERNMENT"
  | "LEARNER_GOVERNMENT"
  | "INSTITUTE_ADMIN_NGO"
  | "COORDINATOR_NGO"
  | "TRAINER_NGO"
  | "LEARNER_NGO";

// Kept for the existing Corporate demo datasets.
export type CorporateRole =
  | "COMPANY_ADMIN"
  | "HR_COORDINATOR"
  | "MANAGER"
  | "EMPLOYEE";

export type RoleAuthority = {
  responsibility: string;
  scope: string;
  can: string[];
  cannot: string[];
  escalation: string;
  areaTitle: string;
  actions: Array<{
    title: string;
    description: string;
  }>;
};

export type CorporateSession = {
  tenant: TenantKey;
  tenantLabel: string;
  role: AttendanceRoleCode;
  roleLabel: string;
  level: RoleLevel;
  name: string;
  employeeId: string;
  organization: string;
  site: string;
  unit: string;
  reportsTo: string;
  shift: string;
  approverLabel: string;
  peopleLabel: string;
  groupLabel: string;
  authority: RoleAuthority;
};
