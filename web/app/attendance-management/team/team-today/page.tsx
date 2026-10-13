import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="MANAGER WORKSPACE"
      title="Team attendance today"
      subtitle="Expected versus present team attendance."
    >
      <RoleDatasetView area="manager" view="team-today" />
    </AppShell>
  );
}
