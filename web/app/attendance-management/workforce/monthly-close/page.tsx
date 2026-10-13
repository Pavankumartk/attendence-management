import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="HR OPERATIONS"
      title="Monthly close checklist"
      subtitle="Reconcile exceptions and lock a pay period."
    >
      <RoleDatasetView area="hr" view="monthly-close" />
    </AppShell>
  );
}
