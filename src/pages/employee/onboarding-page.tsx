import { CircleCheckBig } from "lucide-react"

import { Checklist } from "@/components/shared/checklist"
import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCurrentEmployee, useRoster } from "@/store/roster-provider"

export function EmployeeOnboardingPage() {
  const { state, actions } = useRoster()
  const employee = useCurrentEmployee()
  if (!employee) return null

  const checklist = state.onboardingChecklists[employee.id]

  if (employee.onboardingStatus === "Completed" || !checklist) {
    return (
      <>
        <PageHeader title="My onboarding" />
        <EmptyState
          icon={CircleCheckBig}
          title="Onboarding complete"
          description="You're all set — there are no outstanding onboarding tasks."
        />
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="My onboarding"
        description="Complete each step to finish setting up your account."
      />
      <Card>
        <CardHeader>
          <CardTitle>Your checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <Checklist
            items={checklist}
            onToggle={(itemId) =>
              actions.toggleOnboardingItem(employee.id, itemId)
            }
          />
        </CardContent>
      </Card>
    </>
  )
}
