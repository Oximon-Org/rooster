import * as React from "react"
import { GraduationCap, Plus } from "lucide-react"

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { courseCompletion } from "@/data/derived"
import { percent } from "@/lib/format"
import { useRoster } from "@/store/roster-provider"

export function AdminLearningPage() {
  const { state, actions } = useRoster()
  const [open, setOpen] = React.useState(false)
  const [courseId, setCourseId] = React.useState(state.courses[0]?.id ?? "")
  const [target, setTarget] = React.useState("all")

  const departments = Array.from(
    new Set(state.employees.map((e) => e.department))
  )

  function resolveTargets(): string[] {
    if (target === "all") return state.employees.map((e) => e.id)
    return state.employees
      .filter((e) => e.department === target)
      .map((e) => e.id)
  }

  function handleAssign() {
    actions.assignCourse(courseId, resolveTargets())
    setOpen(false)
    setTarget("all")
  }

  const avgCompletion =
    state.courses.reduce((s, c) => s + courseCompletion(state, c).rate, 0) /
    Math.max(state.courses.length, 1)

  return (
    <>
      <PageHeader
        title="Learning & development"
        description="Assign trainings and track completion across the company."
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus />
            Assign course
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Courses"
          value={state.courses.length}
          icon={GraduationCap}
        />
        <StatCard
          label="Avg completion"
          value={percent(avgCompletion)}
          icon={GraduationCap}
          accent
        />
        <StatCard
          label="Employees"
          value={state.employees.length}
          icon={GraduationCap}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {state.courses.map((course) => {
          const { assigned, completed, rate } = courseCompletion(state, course)
          return (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle className="text-sm">{course.name}</CardTitle>
                <CardDescription>{course.audience}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {completed}/{assigned} completed
                  </span>
                  <span className="font-medium">{percent(rate)}</span>
                </div>
                <Progress value={rate} />
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign a course</DialogTitle>
            <DialogDescription>
              Assign a course to a team or the whole company.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Course</Label>
              <Select value={courseId} onValueChange={(v) => setCourseId(v as string)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {state.courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Assign to</Label>
              <Select value={target} onValueChange={(v) => setTarget(v as string)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All employees</SelectItem>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d} department
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
