import * as React from "react"
import { Receipt, Save } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FED_TAX_RATE, STATE_TAX_RATE } from "@/data/seed"
import type { FilingStatus } from "@/data/types"
import { formatCurrency } from "@/lib/format"
import { useCurrentEmployee, useRoster } from "@/store/roster-provider"

export function EmployeeTaxPage() {
  const { actions } = useRoster()
  const employee = useCurrentEmployee()
  const [filing, setFiling] = React.useState<FilingStatus>(
    employee?.filingStatus ?? "Single"
  )
  const [code, setCode] = React.useState(String(employee?.allowances ?? 0))
  const [saved, setSaved] = React.useState(false)
  const [syncedId, setSyncedId] = React.useState(employee?.id ?? "")

  if (employee && employee.id !== syncedId) {
    setSyncedId(employee.id)
    setFiling(employee.filingStatus)
    setCode(String(employee.allowances))
  }

  if (!employee) return null

  const gross = employee.annualSalary / 26

  function save(event: React.FormEvent) {
    event.preventDefault()
    actions.updateEmployee(employee!.id, {
      filingStatus: filing,
      allowances: Number(code),
    })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <PageHeader
        title="My tax & deductions"
        description="Your W-4-style setup and per-period deductions."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Receipt className="size-4 text-primary" />
              Withholding (W-4 style)
            </CardTitle>
            <CardDescription>Updates are saved for this session.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={save} className="space-y-3">
              <div className="space-y-1.5">
                <Label>Filing status</Label>
                <Select
                  value={filing}
                  onValueChange={(v) => setFiling(v as FilingStatus)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["Single", "Married", "Head of Household"] as FilingStatus[]).map(
                      (f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Withholding code / allowances</Label>
                <Input
                  type="number"
                  min={0}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <Button type="submit">
                <Save />
                {saved ? "Saved" : "Save changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Per-period deductions</CardTitle>
            <CardDescription>Based on applied rates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Line label="Gross (per period)" value={formatCurrency(gross)} />
            <Line
              label="Federal tax (12%)"
              value={`-${formatCurrency(gross * FED_TAX_RATE)}`}
            />
            <Line
              label="State tax (4%)"
              value={`-${formatCurrency(gross * STATE_TAX_RATE)}`}
            />
            <Line
              label="Benefits"
              value={
                employee.enrollmentStatus === "Enrolled"
                  ? "-$180.00"
                  : "$0.00"
              }
            />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-1.5 text-xs last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
