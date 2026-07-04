import { Check, HeartPulse } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { enrollmentTone } from "@/components/shared/tones"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BENEFIT_PLANS } from "@/data/seed"
import { cn } from "@/lib/utils"
import { useCurrentEmployee, useRoster } from "@/store/roster-provider"

const PLAN_DETAILS: Record<string, { premium: string; blurb: string }> = {
  "Roster Health — PPO": {
    premium: "$180 / period",
    blurb: "Widest network, no referrals, higher premium.",
  },
  "Roster Health — HMO": {
    premium: "$120 / period",
    blurb: "Lower cost, in-network care with a primary doctor.",
  },
  "Roster Health — HDHP": {
    premium: "$90 / period",
    blurb: "High deductible paired with an HSA.",
  },
  "Not enrolled": {
    premium: "$0",
    blurb: "Waive coverage. You can enroll during open enrollment.",
  },
}

export function EmployeeBenefitsPage() {
  const { actions } = useRoster()
  const employee = useCurrentEmployee()
  if (!employee) return null

  return (
    <>
      <PageHeader
        title="My benefits"
        description="Your current plan and open-enrollment options."
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm">
              <HeartPulse className="size-4 text-primary" />
              Current plan
            </CardTitle>
            <CardDescription>{employee.benefitsPlan}</CardDescription>
          </div>
          <StatusBadge
            label={employee.enrollmentStatus}
            tone={enrollmentTone(employee.enrollmentStatus)}
          />
        </CardHeader>
      </Card>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium">Open enrollment</span>
        <StatusBadge label="Window open" tone="success" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFIT_PLANS.map((plan) => {
          const selected = employee.benefitsPlan === plan
          const details = PLAN_DETAILS[plan]
          return (
            <Card
              key={plan}
              className={cn(
                selected && "ring-2 ring-primary"
              )}
            >
              <CardHeader>
                <CardTitle className="text-sm">{plan}</CardTitle>
                <CardDescription>{details?.premium}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  {details?.blurb}
                </p>
                <Button
                  variant={selected ? "secondary" : "outline"}
                  disabled={selected}
                  onClick={() => actions.setBenefitsPlan(employee.id, plan)}
                >
                  {selected ? (
                    <>
                      <Check />
                      Enrolled
                    </>
                  ) : (
                    "Select plan"
                  )}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
