import * as React from "react"
import { Search } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatusBadge } from "@/components/shared/status-badge"
import { employeeStatusTone } from "@/components/shared/tones"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { initials } from "@/lib/format"
import { useRoster } from "@/store/roster-provider"

export function EmployeeDirectoryPage() {
  const { state } = useRoster()
  const [query, setQuery] = React.useState("")

  const filtered = state.employees.filter((e) => {
    const q = query.toLowerCase()
    return (
      e.name.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q) ||
      e.title.toLowerCase().includes(q)
    )
  })

  return (
    <>
      <PageHeader
        title="Company directory"
        description="A read-only list of your colleagues."
      />

      <Card>
        <CardContent className="space-y-3">
          <div className="relative max-w-xs">
            <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, dept, title"
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
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id}>
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
                          {e.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{e.department}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {e.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {e.location}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      label={e.status}
                      tone={employeeStatusTone(e.status)}
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
