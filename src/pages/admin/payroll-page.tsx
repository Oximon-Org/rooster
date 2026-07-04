import * as React from "react"
import { Banknote, Play, Receipt, Users } from "lucide-react"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { employeeName } from "@/data/derived"
import { formatCurrency, formatDate } from "@/lib/format"
import { useRoster } from "@/store/roster-provider"

export function AdminPayrollPage() {
  const { state, actions } = useRoster()
  const [runId, setRunId] = React.useState(state.payrollRuns[0]?.id ?? "")
  const [stubEmployee, setStubEmployee] = React.useState<string | null>(null)

  const activeRunId = state.payrollRuns.some((r) => r.id === runId)
    ? runId
    : state.payrollRuns[0]?.id ?? ""
  const currentRun =
    state.payrollRuns.find((r) => r.id === activeRunId) ?? state.payrollRuns[0]

  const totals = currentRun?.lines.reduce(
    (acc, l) => ({
      gross: acc.gross + l.gross,
      tax: acc.tax + l.fedTax + l.stateTax,
      net: acc.net + l.net,
    }),
    { gross: 0, tax: 0, net: 0 }
  ) ?? { gross: 0, tax: 0, net: 0 }

  function handleRun() {
    actions.runPayroll()
  }

  return (
    <>
      <PageHeader
        title="Payroll"
        description="Run payroll for the current period and review the pay register."
        actions={
          <Button onClick={handleRun}>
            <Play />
            Run payroll
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Employees paid"
          value={currentRun?.lines.length ?? 0}
          icon={Users}
        />
        <StatCard
          label="Total gross"
          value={formatCurrency(totals.gross)}
          icon={Banknote}
        />
        <StatCard
          label="Total withheld"
          value={formatCurrency(totals.tax)}
          icon={Receipt}
        />
        <StatCard
          label="Total net"
          value={formatCurrency(totals.net)}
          icon={Banknote}
          accent
        />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between gap-3">
          <div>
            <CardTitle>Pay register</CardTitle>
            <CardDescription>
              {currentRun
                ? `${currentRun.period} · paid ${formatDate(currentRun.payDate)}`
                : "No payroll runs yet"}
            </CardDescription>
          </div>
          <div className="w-52">
            <Select
              value={activeRunId}
              onValueChange={(v) => setRunId(v as string)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {state.payrollRuns.map((run) => (
                  <SelectItem key={run.id} value={run.id}>
                    {run.period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead className="text-right">Gross</TableHead>
                <TableHead className="text-right">Fed tax (12%)</TableHead>
                <TableHead className="text-right">State tax (4%)</TableHead>
                <TableHead className="text-right">Benefits</TableHead>
                <TableHead className="text-right">Net</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRun?.lines.map((line) => (
                <TableRow
                  key={line.employeeId}
                  className="cursor-pointer"
                  onClick={() => setStubEmployee(line.employeeId)}
                >
                  <TableCell className="font-medium">
                    {employeeName(state, line.employeeId)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(line.gross)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(line.fedTax)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(line.stateTax)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(line.benefitsDeduction)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(line.net)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Totals</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totals.gross)}
                </TableCell>
                <TableCell colSpan={2} className="text-right">
                  {formatCurrency(totals.tax)}
                </TableCell>
                <TableCell />
                <TableCell className="text-right">
                  {formatCurrency(totals.net)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={stubEmployee !== null}
        onOpenChange={(open) => !open && setStubEmployee(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Pay stub history —{" "}
              {stubEmployee ? employeeName(state, stubEmployee) : ""}
            </DialogTitle>
            <DialogDescription>
              Pay stubs across all recorded pay periods.
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead className="text-right">Gross</TableHead>
                <TableHead className="text-right">Net</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.payrollRuns.map((run) => {
                const line = run.lines.find(
                  (l) => l.employeeId === stubEmployee
                )
                if (!line) return null
                return (
                  <TableRow key={run.id}>
                    <TableCell>{run.period}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(line.gross)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(line.net)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  )
}
