import * as React from "react"
import { Briefcase, ChevronRight, Plus, Users } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { candidateTone, jobStatusTone } from "@/components/shared/tones"
import { EmptyState } from "@/components/shared/empty-state"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { JobStatus } from "@/data/types"
import { cn } from "@/lib/utils"
import { useRoster } from "@/store/roster-provider"

export function AdminRecruitingPage() {
  const { state, actions } = useRoster()
  const [selectedId, setSelectedId] = React.useState(
    state.jobPostings[0]?.id ?? ""
  )
  const [addOpen, setAddOpen] = React.useState(false)
  const [role, setRole] = React.useState("")
  const [department, setDepartment] = React.useState("Engineering")
  const [status, setStatus] = React.useState<JobStatus>("Open")

  const selected =
    state.jobPostings.find((j) => j.id === selectedId) ?? state.jobPostings[0]
  const openRoles = state.jobPostings.filter((j) => j.status === "Open").length
  const totalCandidates = state.jobPostings.reduce(
    (sum, j) => sum + j.candidates.length,
    0
  )

  function handleAdd(event: React.FormEvent) {
    event.preventDefault()
    actions.addJobPosting({ role, department, status })
    setRole("")
    setDepartment("Engineering")
    setStatus("Open")
    setAddOpen(false)
  }

  return (
    <>
      <PageHeader
        title="Recruiting / ATS"
        description="Manage job postings and move candidates through the pipeline."
        actions={
          <Button onClick={() => setAddOpen(true)}>
            <Plus />
            New posting
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Total postings"
          value={state.jobPostings.length}
          icon={Briefcase}
        />
        <StatCard label="Open roles" value={openRoles} icon={Briefcase} accent />
        <StatCard label="Candidates" value={totalCandidates} icon={Users} />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="space-y-2 lg:col-span-2">
          {state.jobPostings.map((job) => (
            <button
              key={job.id}
              onClick={() => setSelectedId(job.id)}
              className={cn(
                "flex w-full items-center justify-between border px-3 py-2.5 text-left transition-colors",
                selected?.id === job.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              )}
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{job.role}</p>
                <p className="text-[10px] text-muted-foreground">
                  {job.department} · {job.candidates.length} candidates
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge
                  label={job.status}
                  tone={jobStatusTone(job.status)}
                />
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>{selected?.role ?? "No posting"}</CardTitle>
            <CardDescription>
              {selected
                ? `${selected.department} · ${selected.candidates.length} in pipeline`
                : "Select a posting"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selected && selected.candidates.length > 0 ? (
              <div className="space-y-2">
                {selected.candidates.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between border border-border px-3 py-2"
                  >
                    <span className="text-xs font-medium">{c.name}</span>
                    <div className="flex items-center gap-2">
                      <StatusBadge
                        label={c.stage}
                        tone={candidateTone(c.stage)}
                      />
                      {c.stage !== "Hired" ? (
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() =>
                            actions.advanceCandidate(selected.id, c.id)
                          }
                        >
                          Advance
                        </Button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="No candidates yet"
                description="This posting has an empty pipeline."
              />
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New job posting</DialogTitle>
            <DialogDescription>
              Add a role to the pipeline.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="space-y-1.5">
              <Label>Role</Label>
              <Input
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Backend Engineer"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Department</Label>
              <Select
                value={department}
                onValueChange={(v) => setDepartment(v as string)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Engineering", "Sales", "Marketing", "People", "Finance", "Support"].map(
                    (d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as JobStatus)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["Open", "Draft", "Closed"] as JobStatus[]).map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create posting</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
