import { CalendarCheck, CalendarClock, Check, X } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { leaveStatusTone } from "@/components/shared/tones"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
import { employeeName } from "@/data/derived"
import { formatDate } from "@/lib/format"
import { useRoster } from "@/store/roster-provider"

export function AdminTimeOffPage() {
  const { state, actions } = useRoster()
  const pending = state.leaveRequests.filter((r) => r.status === "Pending")
  const history = state.leaveRequests.filter((r) => r.status !== "Pending")
  const approved = history.filter((r) => r.status === "Approved").length

  return (
    <>
      <PageHeader
        title="Leave & time-off"
        description="Review pending requests and the team's approval history."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Pending approvals"
          value={pending.length}
          icon={CalendarClock}
          accent
        />
        <StatCard
          label="Approved (all time)"
          value={approved}
          icon={CalendarCheck}
        />
        <StatCard
          label="Total requests"
          value={state.leaveRequests.length}
          icon={CalendarClock}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending approvals</CardTitle>
        </CardHeader>
        <CardContent>
          {pending.length === 0 ? (
            <EmptyState
              icon={CalendarCheck}
              title="All caught up"
              description="No pending time-off requests to review."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead className="text-right">Days</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pending.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">
                      {employeeName(state, r.employeeId)}
                    </TableCell>
                    <TableCell>{r.type}</TableCell>
                    <TableCell>
                      {formatDate(r.startDate)} – {formatDate(r.endDate)}
                    </TableCell>
                    <TableCell className="text-right">{r.days}</TableCell>
                    <TableCell className="max-w-40 truncate text-muted-foreground">
                      {r.reason}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1.5">
                        <Button
                          size="sm"
                          onClick={() => actions.setLeaveStatus(r.id, "Approved")}
                        >
                          <Check />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => actions.setLeaveStatus(r.id, "Denied")}
                        >
                          <X />
                          Deny
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead className="text-right">Days</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">
                    {employeeName(state, r.employeeId)}
                  </TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell>
                    {formatDate(r.startDate)} – {formatDate(r.endDate)}
                  </TableCell>
                  <TableCell className="text-right">{r.days}</TableCell>
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
        </CardContent>
      </Card>
    </>
  )
}
