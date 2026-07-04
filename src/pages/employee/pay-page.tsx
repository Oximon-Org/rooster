import { Download, Wallet } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency, formatDate } from "@/lib/format"
import { useCurrentEmployee, useRoster } from "@/store/roster-provider"

export function EmployeePayPage() {
  const { state } = useRoster()
  const employee = useCurrentEmployee()
  if (!employee) return null

  const stubs = state.payrollRuns
    .map((run) => ({
      run,
      line: run.lines.find((l) => l.employeeId === employee.id),
    }))
    .filter((s) => s.line)

  const latestNet = stubs[0]?.line?.net ?? 0

  return (
    <>
      <PageHeader
        title="My pay"
        description="Your pay stubs by period."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Latest net pay"
          value={formatCurrency(latestNet)}
          icon={Wallet}
          accent
        />
        <StatCard label="Pay stubs" value={stubs.length} icon={Wallet} />
        <StatCard
          label="Pay frequency"
          value={employee.payFrequency}
          icon={Wallet}
        />
      </div>

      {stubs.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="No pay stubs yet"
          description="Once payroll runs, your stubs will show here."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {stubs.map(({ run, line }) => {
            if (!line) return null
            return (
              <Card key={run.id}>
                <CardHeader className="flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-sm">{run.period}</CardTitle>
                    <CardDescription>
                      Paid {formatDate(run.payDate)}
                    </CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download />
                    PDF
                  </Button>
                </CardHeader>
                <CardContent className="space-y-1.5">
                  <Row label="Gross" value={formatCurrency(line.gross)} />
                  <Row
                    label="Federal tax (12%)"
                    value={`-${formatCurrency(line.fedTax)}`}
                    muted
                  />
                  <Row
                    label="State tax (4%)"
                    value={`-${formatCurrency(line.stateTax)}`}
                    muted
                  />
                  <Row
                    label="Benefits"
                    value={`-${formatCurrency(line.benefitsDeduction)}`}
                    muted
                  />
                  <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                    <span className="text-xs font-medium">Net pay</span>
                    <span className="font-heading text-base font-semibold text-primary">
                      {formatCurrency(line.net)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </>
  )
}

function Row({
  label,
  value,
  muted,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className={muted ? "text-muted-foreground" : "font-medium"}>
        {value}
      </span>
    </div>
  )
}
