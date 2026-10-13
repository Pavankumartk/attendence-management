import { notFound } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import UniversityDatasetView from "@/components/roleviews/UniversityDatasetView";
import {
  getUniversityViewData,
  isUniversityArea
} from "@/data/universityRoleData";

/*
  Next.js 16.4:
  This is a dynamic University route and uses request-time params.
  Allow this route to render as a blocking dynamic route.
*/
export const instant = false;

export default async function UniversityAttendancePage({
  params
}: {
  params: Promise<{
    area: string;
    view: string;
  }>;
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
      <UniversityDatasetView
        area={area}
        view={view}
      />
    </AppShell>
  );
}