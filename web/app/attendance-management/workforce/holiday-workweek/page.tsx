import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="HR OPERATIONS"
      title="Holiday & workweek"
      subtitle="Configure calendars, workweeks and shifts."
    >
      <RoleDatasetView area="hr" view="holiday-workweek" />
    </AppShell>
  );
}
