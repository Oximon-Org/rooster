import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BENEFIT_PLANS } from "@/data/seed"
import type {
  Employee,
  EmployeeStatus,
  FilingStatus,
  PayFrequency,
} from "@/data/types"

const DEPARTMENTS = [
  "Engineering",
  "Sales",
  "Marketing",
  "People",
  "Finance",
  "Support",
]
const STATUSES: EmployeeStatus[] = [
  "Active",
  "Onboarding",
  "Offboarding",
  "Terminated",
]
const FILING: FilingStatus[] = ["Single", "Married", "Head of Household"]
const FREQUENCIES: PayFrequency[] = ["Bi-weekly", "Monthly"]

export type EmployeeFormValues = Omit<Employee, "trainings">

function emptyEmployee(): EmployeeFormValues {
  return {
    id: `RS-${Math.floor(1000 + Math.random() * 8999)}`,
    name: "",
    department: "Engineering",
    title: "",
    status: "Onboarding",
    startDate: new Date().toISOString().slice(0, 10),
    email: "",
    phone: "",
    location: "",
    manager: "",
    annualSalary: 80000,
    payFrequency: "Bi-weekly",
    filingStatus: "Single",
    allowances: 1,
    benefitsPlan: "Not enrolled",
    enrollmentStatus: "Not enrolled",
    ptoBalance: 0,
    onboardingStatus: "Not started",
    remote: false,
  }
}

export function EmployeeFormDialog({
  open,
  onOpenChange,
  initial,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initial?: Employee
  onSubmit: (values: EmployeeFormValues) => void
}) {
  const [values, setValues] = React.useState<EmployeeFormValues>(emptyEmployee)
  const [wasOpen, setWasOpen] = React.useState(false)

  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) {
      setValues(initial ? { ...initial } : emptyEmployee())
    }
  }

  function set<K extends keyof EmployeeFormValues>(
    key: K,
    value: EmployeeFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    onSubmit({
      ...values,
      enrollmentStatus:
        values.benefitsPlan === "Not enrolled" ? "Not enrolled" : "Enrolled",
      remote: values.location.toLowerCase().includes("remote"),
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initial ? "Edit employee" : "Add employee"}
          </DialogTitle>
          <DialogDescription>
            Changes are saved for this session and reset on logout.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="grid max-h-[60vh] gap-3 overflow-y-auto pr-1 sm:grid-cols-2"
        >
          <Field label="Full name" className="sm:col-span-2">
            <Input
              required
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>
          <Field label="Title">
            <Input
              required
              value={values.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </Field>
          <Field label="Department">
            <Select
              value={values.department}
              onValueChange={(v) => set("department", v as string)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Email">
            <Input
              type="email"
              required
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
          <Field label="Phone">
            <Input
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>
          <Field label="Location">
            <Input
              value={values.location}
              onChange={(e) => set("location", e.target.value)}
            />
          </Field>
          <Field label="Manager">
            <Input
              value={values.manager}
              onChange={(e) => set("manager", e.target.value)}
            />
          </Field>
          <Field label="Start date">
            <Input
              type="date"
              value={values.startDate}
              onChange={(e) => set("startDate", e.target.value)}
            />
          </Field>
          <Field label="Status">
            <Select
              value={values.status}
              onValueChange={(v) => set("status", v as EmployeeStatus)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Annual salary">
            <Input
              type="number"
              min={0}
              value={values.annualSalary}
              onChange={(e) => set("annualSalary", Number(e.target.value))}
            />
          </Field>
          <Field label="Pay frequency">
            <Select
              value={values.payFrequency}
              onValueChange={(v) => set("payFrequency", v as PayFrequency)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FREQUENCIES.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Filing status">
            <Select
              value={values.filingStatus}
              onValueChange={(v) => set("filingStatus", v as FilingStatus)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FILING.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Withholding code">
            <Input
              type="number"
              min={0}
              value={values.allowances}
              onChange={(e) => set("allowances", Number(e.target.value))}
            />
          </Field>
          <Field label="Benefits plan" className="sm:col-span-2">
            <Select
              value={values.benefitsPlan}
              onValueChange={(v) => set("benefitsPlan", v as string)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BENEFIT_PLANS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <DialogFooter className="sm:col-span-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {initial ? "Save changes" : "Add employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function Field({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block text-xs">{label}</Label>
      {children}
    </div>
  )
}
