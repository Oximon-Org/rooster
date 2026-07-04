import * as React from "react"
import { Clock, LogIn, LogOut } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { attendanceTone } from "@/components/shared/tones"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/format"
import { useCurrentEmployee, useRoster } from "@/store/roster-provider"

export function EmployeeAttendancePage() {
  const { state } = useRoster()
  const employee = useCurrentEmployee()
  const [clockedIn, setClockedIn] = React.useState(false)
  const [clockInTime, setClockInTime] = React.useState<string | null>(null)

  if (!employee) return null

  const rows = state.attendance.filter((a) => a.employeeId === employee.id)
  const totalHours = rows.reduce((s, r) => s + r.hours, 0)

  function toggleClock() {
    if (clockedIn) {
      setClockedIn(false)
    } else {
      setClockedIn(true)
      setClockInTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      )
    }
  }

  return (
    <>
      <PageHeader
        title="My attendance"
        description="Clock in and out and review your recent timesheet."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="sm:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Today</CardTitle>
            <CardDescription>
              {clockedIn
                ? `Clocked in at ${clockInTime}`
                : "You are clocked out"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              variant={clockedIn ? "destructive" : "default"}
              onClick={toggleClock}
            >
              {clockedIn ? <LogOut /> : <LogIn />}
              {clockedIn ? "Clock out" : "Clock in"}
            </Button>
          </CardContent>
        </Card>
        <StatCard
          label="Logged entries"
          value={rows.length}
          icon={Clock}
        />
        <StatCard
          label="Logged hours"
          value={`${totalHours.toFixed(1)}h`}
          icon={Clock}
          accent
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My timesheet</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
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
                  <TableCell>{formatDate(r.date)}</TableCell>
                  <TableCell>{r.clockIn}</TableCell>
                  <TableCell>{r.clockOut}</TableCell>
                  <TableCell className="text-right">
                    {r.hours.toFixed(1)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      label={r.status}
                      tone={attendanceTone(r.status)}
                    />
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
