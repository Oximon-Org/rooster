import {
  Briefcase,
  CalendarDays,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Receipt,
  UserRound,
  Wallet,
} from "lucide-react"

import { StatusBadge } from "@/components/shared/status-badge"
import {
  employeeStatusTone,
  enrollmentTone,
} from "@/components/shared/tones"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Employee } from "@/data/types"
import {
  formatCurrency,
  formatDate,
  initials,
  tenureYears,
} from "@/lib/format"

export function ProfileDetail({ employee }: { employee: Employee }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardContent className="flex flex-col items-center gap-3 text-center">
          <Avatar className="size-16">
            <AvatarFallback className="bg-primary/12 text-lg text-primary">
              {initials(employee.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-heading text-base font-semibold">
              {employee.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {employee.title} · {employee.department}
            </p>
          </div>
          <StatusBadge
            label={employee.status}
            tone={employeeStatusTone(employee.status)}
          />
          <Separator />
          <div className="w-full space-y-2 text-left text-xs">
            <Line icon={UserRound} label="Employee ID" value={employee.id} />
            <Line icon={Mail} label="Email" value={employee.email} />
            <Line icon={Phone} label="Phone" value={employee.phone} />
            <Line icon={MapPin} label="Location" value={employee.location} />
            <Line
              icon={Briefcase}
              label="Manager"
              value={employee.manager || "—"}
            />
            <Line
              icon={CalendarDays}
              label="Start date"
              value={`${formatDate(employee.startDate)} (${tenureYears(
                employee.startDate
              )})`}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Wallet className="size-4 text-primary" />
              Compensation
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Metric
              label="Annual salary"
              value={formatCurrency(employee.annualSalary)}
            />
            <Metric label="Pay frequency" value={employee.payFrequency} />
            <Metric
              label="Per period"
              value={formatCurrency(employee.annualSalary / 26)}
            />
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Receipt className="size-4 text-primary" />
                Tax setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Metric label="Filing status" value={employee.filingStatus} />
              <Metric
                label="Withholding code"
                value={String(employee.allowances)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <HeartPulse className="size-4 text-primary" />
                Benefits & PTO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Plan</span>
                <span className="text-xs font-medium">
                  {employee.benefitsPlan}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Enrollment
                </span>
                <StatusBadge
                  label={employee.enrollmentStatus}
                  tone={enrollmentTone(employee.enrollmentStatus)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  PTO balance
                </span>
                <span className="text-xs font-medium">
                  {employee.ptoBalance} days
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Line({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="size-3.5 shrink-0 text-muted-foreground" />
      <span className="w-24 shrink-0 text-muted-foreground">{label}</span>
      <span className="min-w-0 flex-1 truncate font-medium">{value}</span>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-heading text-base font-semibold">{value}</p>
    </div>
  )
}
