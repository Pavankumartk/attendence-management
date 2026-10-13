import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="COMPANY ADMIN"
      title="Employee provisioning"
      subtitle="Import, validate, invite and offboard employees."
    >
      <RoleDatasetView area="admin" view="employee-provisioning" />
    </AppShell>
  );
}
