import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="HR OPERATIONS"
      title="Employee 360°"
      subtitle="Attendance, leave, assignments and exceptions."
    >
      <RoleDatasetView area="hr" view="employee-360" />
    </AppShell>
  );
}
