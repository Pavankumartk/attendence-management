import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="HR OPERATIONS"
      title="Reports & analytics"
      subtitle="Build and review scoped attendance reports."
    >
      <RoleDatasetView area="hr" view="reports-analytics" />
    </AppShell>
  );
}
