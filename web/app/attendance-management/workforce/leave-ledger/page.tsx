import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="HR OPERATIONS"
      title="Leave ledger"
      subtitle="Grants, accruals, usage and adjustments."
    >
      <RoleDatasetView area="hr" view="leave-ledger" />
    </AppShell>
  );
}
