import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FED_TAX_RATE, STATE_TAX_RATE } from "@/data/seed"
import { formatCurrency } from "@/lib/format"
import { useRoster } from "@/store/roster-provider"

export function AdminTaxPage() {
  const { state } = useRoster()
  const employees = state.employees.filter((e) => e.status !== "Terminated")

  return (
    <>
      <PageHeader
        title="Tax & deductions"
        description="Withholding setup per employee, based on filing status and applied rates."
      />

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Filing status</TableHead>
                <TableHead className="text-right">Withholding code</TableHead>
                <TableHead className="text-right">Per-period gross</TableHead>
                <TableHead className="text-right">Est. fed (12%)</TableHead>
                <TableHead className="text-right">Est. state (4%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((e) => {
                const gross = e.annualSalary / 26
                return (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>{e.filingStatus}</TableCell>
                    <TableCell className="text-right">{e.allowances}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(gross)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatCurrency(gross * FED_TAX_RATE)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatCurrency(gross * STATE_TAX_RATE)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
