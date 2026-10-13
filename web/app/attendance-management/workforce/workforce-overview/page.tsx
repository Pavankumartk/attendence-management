import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="HR OPERATIONS"
      title="Workforce overview"
      subtitle="Live headcount and attendance health."
    >
      <RoleDatasetView area="hr" view="workforce-overview" />
    </AppShell>
  );
}
