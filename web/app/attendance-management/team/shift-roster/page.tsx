import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="MANAGER WORKSPACE"
      title="Shift roster"
      subtitle="Review published team shifts."
    >
      <RoleDatasetView area="manager" view="shift-roster" />
    </AppShell>
  );
}
