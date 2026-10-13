import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="MANAGER WORKSPACE"
      title="Pending approvals"
      subtitle="Review requests routed to your role."
    >
      <RoleDatasetView area="manager" view="pending-approvals" />
    </AppShell>
  );
}
