import * as React from "react"
import {
  Building2,
  MoreHorizontal,
  Plus,
  Search,
  UserRound,
  Users,
} from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { employeeStatusTone } from "@/components/shared/tones"
import {
  EmployeeFormDialog,
  type EmployeeFormValues,
} from "@/components/shared/employee-form-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { departmentCounts } from "@/data/derived"
import type { Employee } from "@/data/types"
import { formatCurrency, initials } from "@/lib/format"
import { useRoster } from "@/store/roster-provider"

export function AdminDirectoryPage() {
  const { state, actions, navigate } = useRoster()
  const [query, setQuery] = React.useState("")
  const [formOpen, setFormOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Employee | undefined>()

  const employees = state.employees
  const active = employees.filter((e) => e.status === "Active").length
  const onboarding = employees.filter(
    (e) => e.status === "Onboarding"
  ).length
  const departments = departmentCounts(employees).length

  const filtered = employees.filter((e) => {
    const q = query.toLowerCase()
    return (
      e.name.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q) ||
      e.title.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q)
    )
  })

  function handleSubmit(values: EmployeeFormValues) {
    if (editing) {
      actions.updateEmployee(editing.id, values)
    } else {
      actions.addEmployee(values)
    }
    setEditing(undefined)
  }

  return (
    <>
      <PageHeader
        title="Employee directory"
        description="The single source of truth for every person — add, edit, and remove records that feed payroll, benefits, performance and compliance."
        actions={
          <Button
            onClick={() => {
              setEditing(undefined)
              setFormOpen(true)
            }}
          >
            <Plus />
            Add employee
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total headcount" value={employees.length} icon={Users} />
        <StatCard label="Active" value={active} icon={UserRound} accent />
        <StatCard label="Onboarding" value={onboarding} icon={UserRound} />
        <StatCard label="Departments" value={departments} icon={Building2} />
      </div>

      <Card>
        <CardContent className="space-y-3">
          <div className="relative max-w-xs">
            <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, dept, title, ID"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Salary</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow
                  key={e.id}
                  className="cursor-pointer"
                  onClick={() =>
                    navigate({ name: "profile", employeeId: e.id })
                  }
                >
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-primary/12 text-[10px] text-primary">
                          {initials(e.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="leading-tight">
                        <p className="font-medium">{e.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {e.id} · {e.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{e.department}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {e.title}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      label={e.status}
                      tone={employeeStatusTone(e.status)}
                    />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(e.annualSalary)}
                  </TableCell>
                  <TableCell onClick={(event) => event.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            navigate({ name: "profile", employeeId: e.id })
                          }
                        >
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditing(e)
                            setFormOpen(true)
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => actions.removeEmployee(e.id)}
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EmployeeFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        initial={editing}
        onSubmit={handleSubmit}
      />
    </>
  )
}
