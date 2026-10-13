import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="COMPANY ADMIN"
      title="Integrations & APIs"
      subtitle="Inbound and outbound attendance connectors."
    >
      <RoleDatasetView area="admin" view="integrations-apis" />
    </AppShell>
  );
}
