import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="MANAGER WORKSPACE"
      title="Team exceptions"
      subtitle="Missing punches, lateness and incomplete days."
    >
      <RoleDatasetView area="manager" view="team-exceptions" />
    </AppShell>
  );
}
