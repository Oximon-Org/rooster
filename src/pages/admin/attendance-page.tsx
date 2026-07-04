import * as React from "react"
import { CalendarClock, Clock, TimerOff, UserCheck } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { attendanceTone } from "@/components/shared/tones"
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
import { employeeName } from "@/data/derived"
import { formatDate } from "@/lib/format"
import { useRoster } from "@/store/roster-provider"

export function AdminAttendancePage() {
  const { state } = useRoster()
  const [employeeId, setEmployeeId] = React.useState("all")

  const activeEmployees = state.employees.filter((e) => e.status !== "Terminated")
  const rows =
    employeeId === "all"
      ? state.attendance
      : state.attendance.filter((a) => a.employeeId === employeeId)

  const onTime = rows.filter((r) => r.status === "On time").length
  const late = rows.filter((r) => r.status === "Late").length
  const absent = rows.filter((r) => r.status === "Absent").length
  const totalHours = rows.reduce((sum, r) => sum + r.hours, 0)

  return (
    <>
      <PageHeader
        title="Time & attendance"
        description="Team clock-in log and timesheets across the current pay period."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="On-time entries" value={onTime} icon={UserCheck} accent />
        <StatCard label="Late" value={late} icon={Clock} />
        <StatCard label="Absences" value={absent} icon={TimerOff} />
        <StatCard
          label="Logged hours"
          value={`${totalHours.toFixed(1)}h`}
          icon={CalendarClock}
        />
      </div>

      <Card>
        <CardContent className="space-y-3">
          <div className="max-w-xs">
            <Select value={employeeId} onValueChange={(v) => setEmployeeId(v as string)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All employees</SelectItem>
                {activeEmployees.map((e) => (
                  <SelectItem key={e.id} value={e.id}>
                    {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Clock in</TableHead>
                <TableHead>Clock out</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">
                    {employeeName(state, r.employeeId)}
                  </TableCell>
                  <TableCell>{formatDate(r.date)}</TableCell>
                  <TableCell>{r.clockIn}</TableCell>
                  <TableCell>{r.clockOut}</TableCell>
                  <TableCell className="text-right">
                    {r.hours.toFixed(1)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge label={r.status} tone={attendanceTone(r.status)} />
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
