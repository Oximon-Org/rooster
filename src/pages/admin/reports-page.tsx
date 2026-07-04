import { Banknote, TrendingUp, UserMinus, Users } from "lucide-react"

import { BarChart } from "@/components/shared/bar-chart"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { departmentCost, departmentCounts } from "@/data/derived"
import { formatCompactCurrency, formatCurrency } from "@/lib/format"
import { useRoster } from "@/store/roster-provider"

const HEADCOUNT_TREND = [
  { label: "Feb", value: 5 },
  { label: "Mar", value: 6 },
  { label: "Apr", value: 6 },
  { label: "May", value: 7 },
  { label: "Jun", value: 8 },
]

export function AdminReportsPage() {
  const { state } = useRoster()
  const employees = state.employees
  const totalCost = employees.reduce((s, e) => s + e.annualSalary, 0)
  const costByDept = departmentCost(employees)
  const countByDept = departmentCounts(employees)

  const trend = [
    ...HEADCOUNT_TREND,
    { label: "Jul", value: employees.length },
  ]

  return (
    <>
      <PageHeader
        title="Reporting & analytics"
        description="Headcount, turnover and compensation across the company."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Headcount" value={employees.length} icon={Users} />
        <StatCard label="Turnover" value="4.2%" icon={UserMinus} />
        <StatCard
          label="Annual comp"
          value={formatCompactCurrency(totalCost)}
          icon={Banknote}
          accent
        />
        <StatCard
          label="Avg salary"
          value={formatCompactCurrency(
            totalCost / Math.max(employees.length, 1)
          )}
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Headcount over time</CardTitle>
            <CardDescription>Employees by month</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={trend} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Headcount by department</CardTitle>
            <CardDescription>Distribution across teams</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              orientation="horizontal"
              data={countByDept.map((d) => ({
                label: d.department,
                value: d.count,
              }))}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department cost breakdown</CardTitle>
          <CardDescription>
            Sum of annual salaries per department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            orientation="horizontal"
            valueFormatter={formatCurrency}
            data={costByDept.map((d) => ({
              label: d.department,
              value: d.cost,
            }))}
          />
        </CardContent>
      </Card>
    </>
  )
}
