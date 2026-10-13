import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="HR OPERATIONS"
      title="Live punches"
      subtitle="Inspect event source and device metadata."
    >
      <RoleDatasetView area="hr" view="live-punches" />
    </AppShell>
  );
}
