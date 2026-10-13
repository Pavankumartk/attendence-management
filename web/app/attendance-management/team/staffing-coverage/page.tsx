import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="MANAGER WORKSPACE"
      title="Staffing coverage"
      subtitle="Review shift coverage and staffing gaps."
    >
      <RoleDatasetView area="manager" view="staffing-coverage" />
    </AppShell>
  );
}
