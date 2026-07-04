import { FileText, PenLine } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
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

export function EmployeeDocumentsPage() {
  const { state, actions } = useRoster()
  const employee = useCurrentEmployee()
  if (!employee) return null

  const applicable = state.documents.filter(
    (d) => d.appliesTo === "All employees" || employee.remote
  )
  const withStatus = applicable.map((d) => ({
    doc: d,
    signed: d.signatures.find((s) => s.employeeId === employee.id)?.signed ?? false,
  }))
  const pending = withStatus.filter((d) => !d.signed).length

  return (
    <>
      <PageHeader
        title="My documents"
        description="Review and sign the policies that apply to you."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Documents"
          value={withStatus.length}
          icon={FileText}
        />
        <StatCard label="Pending signature" value={pending} icon={PenLine} accent />
        <StatCard
          label="Signed"
          value={withStatus.length - pending}
          icon={FileText}
        />
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Applies to</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withStatus.map(({ doc, signed }) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {doc.appliesTo}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      label={signed ? "Signed" : "Awaiting signature"}
                      tone={signed ? "success" : "warning"}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    {signed ? (
                      <span className="text-xs text-muted-foreground">
                        Signed
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => actions.signDocument(doc.id, employee.id)}
                      >
                        <PenLine />
                        Sign
                      </Button>
                    )}
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
