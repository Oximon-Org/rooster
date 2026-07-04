import * as React from "react"
import { Target } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { reviewStatusTone } from "@/components/shared/tones"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { employeeName } from "@/data/derived"
import { percent } from "@/lib/format"
import { useRoster } from "@/store/roster-provider"

export function AdminPerformancePage() {
  const { state, actions } = useRoster()
  const [openId, setOpenId] = React.useState<string | null>(null)
  const [notes, setNotes] = React.useState("")

  const record = state.performance.find((p) => p.employeeId === openId)
  const completed = state.performance.filter(
    (p) => p.reviewStatus === "Manager review complete"
  ).length

  function openDetail(id: string) {
    const rec = state.performance.find((p) => p.employeeId === id)
    setNotes(rec?.managerNotes ?? "")
    setOpenId(id)
  }

  function saveReview() {
    if (!openId) return
    actions.updatePerformance(openId, {
      managerNotes: notes,
      reviewStatus: "Manager review complete",
    })
    setOpenId(null)
  }

  return (
    <>
      <PageHeader
        title="Performance management"
        description="Review cycles and goal tracking across all employees."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Active goals"
          value={state.performance.length}
          icon={Target}
          accent
        />
        <StatCard label="Reviews complete" value={completed} icon={Target} />
        <StatCard
          label="Avg progress"
          value={percent(
            state.performance.reduce((s, p) => s + p.progress, 0) /
              Math.max(state.performance.length, 1)
          )}
          icon={Target}
        />
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Goal</TableHead>
                <TableHead className="w-40">Progress</TableHead>
                <TableHead>Review status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.performance.map((p) => (
                <TableRow key={p.employeeId}>
                  <TableCell className="font-medium">
                    {employeeName(state, p.employeeId)}
                  </TableCell>
                  <TableCell className="max-w-48 truncate text-muted-foreground">
                    {p.goal}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={p.progress} className="w-24" />
                      <span className="text-xs tabular-nums">
                        {percent(p.progress)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      label={p.reviewStatus}
                      tone={reviewStatusTone(p.reviewStatus)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openDetail(p.employeeId)}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={openId !== null}
        onOpenChange={(open) => !open && setOpenId(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {openId ? employeeName(state, openId) : ""} — review
            </DialogTitle>
            <DialogDescription>{record?.goal}</DialogDescription>
          </DialogHeader>
          {record ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Progress</Label>
                <div className="flex items-center gap-2">
                  <Progress value={record.progress} />
                  <span className="text-xs tabular-nums">
                    {percent(record.progress)}
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Employee self-review</Label>
                <p className="border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  {record.selfReview || "No self-review submitted yet."}
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="manager-notes">Manager notes</Label>
                <Textarea
                  id="manager-notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write review feedback…"
                />
              </div>
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenId(null)}>
              Cancel
            </Button>
            <Button onClick={saveReview}>Complete review</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
