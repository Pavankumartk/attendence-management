import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="COMPANY ADMIN"
      title="Audit log"
      subtitle="Actor, action, timestamp and reason for changes."
    >
      <RoleDatasetView area="admin" view="audit-log" />
    </AppShell>
  );
}
