import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="HR OPERATIONS"
      title="Payroll bridge"
      subtitle="Validate payable days and payroll readiness."
    >
      <RoleDatasetView area="hr" view="payroll-bridge" />
    </AppShell>
  );
}
