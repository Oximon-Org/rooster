import { HeartPulse, ShieldCheck, UserRoundX } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { enrollmentTone } from "@/components/shared/tones"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BENEFIT_PLANS } from "@/data/seed"
import { useRoster } from "@/store/roster-provider"

export function AdminBenefitsPage() {
  const { state, actions } = useRoster()
  const employees = state.employees.filter((e) => e.status !== "Terminated")
  const enrolled = employees.filter(
    (e) => e.enrollmentStatus === "Enrolled"
  ).length
  const pending = employees.filter(
    (e) => e.enrollmentStatus === "Pending"
  ).length
  const notEnrolled = employees.filter(
    (e) => e.enrollmentStatus === "Not enrolled"
  ).length

  return (
    <>
      <PageHeader
        title="Benefits administration"
        description="Enrollment overview and plan management across the company."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Enrolled" value={enrolled} icon={ShieldCheck} accent />
        <StatCard label="Pending" value={pending} icon={HeartPulse} />
        <StatCard label="Not enrolled" value={notEnrolled} icon={UserRoundX} />
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-56">Plan (change to update)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {e.department}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      label={e.enrollmentStatus}
                      tone={enrollmentTone(e.enrollmentStatus)}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={e.benefitsPlan}
                      onValueChange={(v) =>
                        actions.setBenefitsPlan(e.id, v as string)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BENEFIT_PLANS.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
