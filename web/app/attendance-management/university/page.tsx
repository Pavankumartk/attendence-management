import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import UniversityDatasetView from "@/components/roleviews/UniversityDatasetView";
import {
  getUniversityViewData,
  isUniversityArea
} from "@/data/universityRoleData";

export default async function UniversityAttendancePage({
  params
}: {
  params: Promise<{ area: string; view: string }>;
}) {
  const { area, view } = await params;

  if (!isUniversityArea(area)) {
    notFound();
  }

  const dataset = getUniversityViewData(area, view);

  if (!dataset) {
    notFound();
  }

  return (
    <AppShell
      eyebrow={dataset.eyebrow}
      title={dataset.title}
      subtitle={dataset.subtitle}
    >
      <UniversityDatasetView area={area} view={view} />
    </AppShell>
  );
}
