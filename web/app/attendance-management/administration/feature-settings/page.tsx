import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="COMPANY ADMIN"
      title="Feature settings"
      subtitle="Attendance modules and tenant preferences."
    >
      <RoleDatasetView area="admin" view="feature-settings" />
    </AppShell>
  );
}
