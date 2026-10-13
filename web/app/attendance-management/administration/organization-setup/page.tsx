import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="COMPANY ADMIN"
      title="Organization setup"
      subtitle="Corporate hierarchy and assignments."
    >
      <RoleDatasetView area="admin" view="organization-setup" />
    </AppShell>
  );
}
