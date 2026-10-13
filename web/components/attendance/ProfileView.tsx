import { employeeProfile } from "@/data/employeeAttendance";
import { Panel } from "./UI";

export default function ProfileView() {
  const details = [
    ["Full name", employeeProfile.name],
    ["Employee ID", employeeProfile.employeeId],
    ["Employment status", employeeProfile.employmentStatus],
    ["Legal entity", employeeProfile.legalEntity],
    ["Site", employeeProfile.site],
    ["Department", employeeProfile.department],
    ["Manager", employeeProfile.manager],
    ["Assigned shift", employeeProfile.shift]
  ];

  return (
    <Panel title="My profile & employment">
      <div className="profile-detail-grid">
        {details.map(([label, value]) => (
          <div className="profile-detail-card" key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </div>
    </Panel>
  );
}
