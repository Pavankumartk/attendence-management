import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="COMPANY ADMIN"
      title="Roles & permissions"
      subtitle="Role-based and attribute-based access."
    >
      <RoleDatasetView area="admin" view="roles-permissions" />
    </AppShell>
  );
}
