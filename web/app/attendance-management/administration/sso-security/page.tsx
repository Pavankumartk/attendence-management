import AppShell from "@/components/layout/AppShell";
import RoleDatasetView from "@/components/roleviews/RoleDatasetView";

export default function Page() {
  return (
    <AppShell
      eyebrow="COMPANY ADMIN"
      title="SSO & security"
      subtitle="Identity provider, MFA and trusted access."
    >
      <RoleDatasetView area="admin" view="sso-security" />
    </AppShell>
  );
}
