import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="MANAGER WORKSPACE"
      title="Team calendar"
      subtitle="Inspect team attendance by date."
    >
      <RoleDatasetView area="manager" view="team-calendar" />
    </AppShell>
  );
}
