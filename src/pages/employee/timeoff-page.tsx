import * as React from "react"
import { CalendarDays, CalendarPlus } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { leaveStatusTone } from "@/components/shared/tones"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { LeaveType } from "@/data/types"
import { formatDate } from "@/lib/format"
import { useCurrentEmployee, useRoster } from "@/store/roster-provider"

function daysBetween(start: string, end: string): number {
  const s = new Date(start)
  const e = new Date(end)
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return 0
  return Math.max(1, Math.round((e.getTime() - s.getTime()) / 86400000) + 1)
}

export function EmployeeTimeOffPage() {
  const { state, actions } = useRoster()
  const employee = useCurrentEmployee()
  const [type, setType] = React.useState<LeaveType>("Vacation")
  const [start, setStart] = React.useState("")
  const [end, setEnd] = React.useState("")
  const [reason, setReason] = React.useState("")

  if (!employee) return null

  const requests = state.leaveRequests.filter(
    (r) => r.employeeId === employee.id
  )
  const pending = requests.filter((r) => r.status === "Pending").length

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!employee || !start || !end) return
    actions.addLeaveRequest({
      employeeId: employee.id,
      type,
      startDate: start,
      endDate: end,
      days: daysBetween(start, end),
      reason: reason || "—",
    })
    setStart("")
    setEnd("")
    setReason("")
    setType("Vacation")
  }

  return (
    <>
      <PageHeader
        title="My time off"
        description="Check your balance and submit new time-off requests."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="PTO balance"
          value={`${employee.ptoBalance} days`}
          icon={CalendarDays}
          accent
        />
        <StatCard label="Pending requests" value={pending} icon={CalendarPlus} />
        <StatCard
          label="Total requests"
          value={requests.length}
          icon={CalendarDays}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request time off</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-3 sm:grid-cols-4">
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as LeaveType)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["Vacation", "Sick", "Personal", "Parental"] as LeaveType[]).map(
                    (t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Start date</Label>
              <Input
                type="date"
                required
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>End date</Label>
              <Input
                type="date"
                required
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Reason</Label>
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Optional"
              />
            </div>
            <div className="sm:col-span-4">
              <Button type="submit">
                <CalendarPlus />
                Submit request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My requests</CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No requests yet"
              description="Submit a request above to see it here."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead className="text-right">Days</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.type}</TableCell>
                    <TableCell>
                      {formatDate(r.startDate)} – {formatDate(r.endDate)}
                    </TableCell>
                    <TableCell className="text-right">{r.days}</TableCell>
                    <TableCell className="max-w-40 truncate text-muted-foreground">
                      {r.reason}
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        label={r.status}
                        tone={leaveStatusTone(r.status)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  )
}
