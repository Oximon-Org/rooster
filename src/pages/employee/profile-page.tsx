import { HeartPulse, Wallet } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { ProfileDetail } from "@/components/shared/profile-detail"
import { Button } from "@/components/ui/button"
import { useCurrentEmployee, useRoster } from "@/store/roster-provider"

export function EmployeeProfilePage() {
  const { navigate } = useRoster()
  const employee = useCurrentEmployee()
  if (!employee) return null

  return (
    <>
      <PageHeader
        title="My profile"
        description="Your record, compensation and benefits at a glance."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate({ name: "pay" })}>
              <Wallet />
              Pay stubs
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ name: "benefits" })}
            >
              <HeartPulse />
              Benefits
            </Button>
          </div>
        }
      />
      <ProfileDetail employee={employee} />
    </>
  )
}
