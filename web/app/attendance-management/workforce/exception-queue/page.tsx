import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="HR OPERATIONS"
      title="Exception queue"
      subtitle="Triage missing punches, disputes and anomalies."
    >
      <RoleDatasetView area="hr" view="exception-queue" />
    </AppShell>
  );
}
