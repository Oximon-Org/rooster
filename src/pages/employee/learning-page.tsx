import { Check, GraduationCap } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { trainingTone } from "@/components/shared/tones"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCurrentEmployee, useRoster } from "@/store/roster-provider"

export function EmployeeLearningPage() {
  const { state, actions } = useRoster()
  const employee = useCurrentEmployee()
  if (!employee) return null

  const trainings = employee.trainings.map((t) => ({
    ...t,
    course: state.courses.find((c) => c.id === t.courseId),
  }))
  const completed = trainings.filter((t) => t.status === "Completed").length

  return (
    <>
      <PageHeader
        title="My learning"
        description="Your assigned trainings and completion status."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Assigned"
          value={trainings.length}
          icon={GraduationCap}
        />
        <StatCard
          label="Completed"
          value={completed}
          icon={GraduationCap}
          accent
        />
        <StatCard
          label="Pending"
          value={trainings.length - completed}
          icon={GraduationCap}
        />
      </div>

      <Card>
        <CardContent>
          {trainings.length === 0 ? (
            <EmptyState
              icon={GraduationCap}
              title="No courses assigned"
              description="Courses assigned to you will appear here."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainings.map((t) => (
                  <TableRow key={t.courseId}>
                    <TableCell className="font-medium">
                      {t.course?.name ?? t.courseId}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {t.course?.audience ?? "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        label={t.status}
                        tone={trainingTone(t.status)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      {t.status === "Pending" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            actions.setTrainingStatus(
                              employee.id,
                              t.courseId,
                              "Completed"
                            )
                          }
                        >
                          <Check />
                          Mark complete
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Done
                        </span>
                      )}
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
