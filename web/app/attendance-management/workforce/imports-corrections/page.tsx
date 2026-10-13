import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="HR OPERATIONS"
      title="Imports & corrections"
      subtitle="Validate imports and bulk corrections."
    >
      <RoleDatasetView area="hr" view="imports-corrections" />
    </AppShell>
  );
}
