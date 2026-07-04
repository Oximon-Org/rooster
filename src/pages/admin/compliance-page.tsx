import * as React from "react"
import { FileCheck, FileText, ShieldCheck } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { documentSignatureSummary, employeeName } from "@/data/derived"
import { percent } from "@/lib/format"
import { useRoster } from "@/store/roster-provider"

export function AdminCompliancePage() {
  const { state } = useRoster()
  const [openId, setOpenId] = React.useState<string | null>(null)

  const doc = state.documents.find((d) => d.id === openId)
  const fullySigned = state.documents.filter((d) => {
    const s = documentSignatureSummary(d)
    return s.signed === s.total
  }).length

  return (
    <>
      <PageHeader
        title="Compliance & documents"
        description="Document repository and policy acknowledgment tracking."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="Documents"
          value={state.documents.length}
          icon={FileText}
        />
        <StatCard
          label="Fully signed"
          value={fullySigned}
          icon={FileCheck}
          accent
        />
        <StatCard
          label="Policies tracked"
          value={state.documents.length}
          icon={ShieldCheck}
        />
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Applies to</TableHead>
                <TableHead className="w-48">Signatures</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.documents.map((d) => {
                const { signed, total } = documentSignatureSummary(d)
                const rate = total === 0 ? 0 : (signed / total) * 100
                return (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {d.appliesTo}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={rate} className="w-24" />
                        <span className="text-xs whitespace-nowrap">
                          {signed}/{total}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setOpenId(d.id)}
                      >
                        View signers
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={openId !== null}
        onOpenChange={(open) => !open && setOpenId(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{doc?.name}</DialogTitle>
            <DialogDescription>
              {doc
                ? `${percent(
                    (documentSignatureSummary(doc).signed /
                      Math.max(documentSignatureSummary(doc).total, 1)) *
                      100
                  )} signed · applies to ${doc.appliesTo.toLowerCase()}`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-1.5">
            {doc?.signatures.map((s) => (
              <div
                key={s.employeeId}
                className="flex items-center justify-between border border-border px-3 py-2 text-xs"
              >
                <span className="font-medium">
                  {employeeName(state, s.employeeId)}
                </span>
                <StatusBadge
                  label={s.signed ? "Signed" : "Not signed"}
                  tone={s.signed ? "success" : "warning"}
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
