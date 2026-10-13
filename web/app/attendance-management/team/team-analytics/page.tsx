import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="MANAGER WORKSPACE"
      title="Team analytics"
      subtitle="Attendance, lateness and overtime trends."
    >
      <RoleDatasetView area="manager" view="team-analytics" />
    </AppShell>
  );
}
