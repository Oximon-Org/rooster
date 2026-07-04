import { ArrowLeft, Pencil } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { ProfileDetail } from "@/components/shared/profile-detail"
import {
  EmployeeFormDialog,
  type EmployeeFormValues,
} from "@/components/shared/employee-form-dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import { useDocumentTitle } from "@/lib/use-document-title"
import { useRoster } from "@/store/roster-provider"
import * as React from "react"
import { UserRound } from "lucide-react"

export function AdminProfilePage() {
  const { state, route, navigate, actions } = useRoster()
  const [formOpen, setFormOpen] = React.useState(false)
  const employee = state.employees.find((e) => e.id === route.employeeId)
  useDocumentTitle(employee ? employee.name : "Employee profile")

  if (!employee) {
    return (
      <>
        <PageHeader title="Employee profile" />
        <EmptyState
          icon={UserRound}
          title="No employee selected"
          description="Open the directory and choose an employee to view their full record."
        />
        <Button
          variant="outline"
          className="w-fit"
          onClick={() => navigate({ name: "directory" })}
        >
          <ArrowLeft />
          Back to directory
        </Button>
      </>
    )
  }

  function handleSubmit(values: EmployeeFormValues) {
    if (employee) {
      actions.updateEmployee(employee.id, values)
    }
  }

  return (
    <>
      <PageHeader
        title={employee.name}
        description={`${employee.title} · ${employee.department}`}
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate({ name: "directory" })}
            >
              <ArrowLeft />
              Directory
            </Button>
            <Button onClick={() => setFormOpen(true)}>
              <Pencil />
              Edit
            </Button>
          </div>
        }
      />
      <ProfileDetail employee={employee} />
      <EmployeeFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={employee}
        onSubmit={handleSubmit}
      />
    </>
  )
}
