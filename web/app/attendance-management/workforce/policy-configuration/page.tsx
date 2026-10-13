import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="HR OPERATIONS"
      title="Policy configuration"
      subtitle="Effective-dated attendance rules and versions."
    >
      <RoleDatasetView area="hr" view="policy-configuration" />
    </AppShell>
  );
}
