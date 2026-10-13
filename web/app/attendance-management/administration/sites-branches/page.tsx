import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="COMPANY ADMIN"
      title="Sites & branches"
      subtitle="Site details, time zones and local settings."
    >
      <RoleDatasetView area="admin" view="sites-branches" />
    </AppShell>
  );
}
