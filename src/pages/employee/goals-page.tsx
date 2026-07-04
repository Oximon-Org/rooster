import * as React from "react"
import { Send, Target } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { reviewStatusTone } from "@/components/shared/tones"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { percent } from "@/lib/format"
import { useCurrentEmployee, useRoster } from "@/store/roster-provider"

export function EmployeeGoalsPage() {
  const { state, actions } = useRoster()
  const employee = useCurrentEmployee()
  const record = state.performance.find(
    (p) => p.employeeId === employee?.id
  )
  const [draft, setDraft] = React.useState(record?.selfReview ?? "")
  const [syncedReview, setSyncedReview] = React.useState(
    record?.selfReview ?? ""
  )

  const currentReview = record?.selfReview ?? ""
  if (currentReview !== syncedReview) {
    setSyncedReview(currentReview)
    setDraft(currentReview)
  }

  if (!employee) return null

  if (!record) {
    return (
      <>
        <PageHeader title="My goals & review" />
        <EmptyState
          icon={Target}
          title="No active goal"
          description="You don't have a goal assigned for this cycle yet."
        />
      </>
    )
  }

  function submit() {
    if (!record) return
    actions.updatePerformance(record.employeeId, {
      selfReview: draft,
      reviewStatus:
        record.reviewStatus === "Manager review complete"
          ? record.reviewStatus
          : "Self-review submitted",
    })
  }

  return (
    <>
      <PageHeader
        title="My goals & review"
        description="Track your goal progress and submit your self-review."
      />

      <Card>
        <CardHeader className="flex-row items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Target className="size-4 text-primary" />
              {record.goal}
            </CardTitle>
            <CardDescription>Current review cycle</CardDescription>
          </div>
          <StatusBadge
            label={record.reviewStatus}
            tone={reviewStatusTone(record.reviewStatus)}
          />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{percent(record.progress)}</span>
          </div>
          <Progress value={record.progress} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Self-review</CardTitle>
          <CardDescription>
            Share your reflection on this cycle.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="self-review">Your notes</Label>
            <Textarea
              id="self-review"
              rows={5}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write your self-review…"
            />
          </div>
          <Button onClick={submit}>
            <Send />
            Submit self-review
          </Button>
        </CardContent>
      </Card>

      {record.reviewStatus === "Manager review complete" &&
      record.managerNotes ? (
        <Card>
          <CardHeader>
            <CardTitle>Manager feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
              {record.managerNotes}
            </p>
          </CardContent>
        </Card>
      ) : null}
    </>
  )
}
