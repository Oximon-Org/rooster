import type * as React from "react"
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  GraduationCap,
  HeartPulse,
  LayoutGrid,
  Lock,
  Receipt,
  Rocket,
  ShieldCheck,
  ShieldHalf,
  Sparkles,
  SquareStack,
  Target,
  UserCircle,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useDocumentTitle } from "@/lib/use-document-title"
import { useRoster } from "@/store/roster-provider"

interface ModuleInfo {
  icon: LucideIcon
  name: string
  summary: string
  hr: string
  employee: string
}

const MODULES: ModuleInfo[] = [
  {
    icon: Users,
    name: "Employee directory",
    summary: "The single source of truth every other module reads from.",
    hr: "Full CRUD across all employees with search, stat cards and inline actions.",
    employee: "Read-only company list.",
  },
  {
    icon: UserCircle,
    name: "Employee profile",
    summary: "One record covering identity, comp, tax, benefits and PTO.",
    hr: "Open any employee's complete record and edit it.",
    employee: "Own record, with quick links to pay and benefits.",
  },
  {
    icon: CalendarClock,
    name: "Time & attendance",
    summary: "Clock-in logs and timesheets for the current period.",
    hr: "Team-wide clock-in log filterable by employee.",
    employee: "Personal clock-in/out and own timesheet.",
  },
  {
    icon: CalendarDays,
    name: "Leave & time-off",
    summary: "Request, approve and track paid time off.",
    hr: "Approve or deny pending requests and view history.",
    employee: "Submit requests and watch the PTO balance.",
  },
  {
    icon: Wallet,
    name: "Payroll",
    summary: "Run a mock payroll and review the pay register.",
    hr: "One-click run generates a pay register with per-stub history.",
    employee: "Browse personal pay stubs with a mock PDF export.",
  },
  {
    icon: Receipt,
    name: "Tax & deductions",
    summary: "W-4-style withholding setup with placeholder math.",
    hr: "See every employee's withholding setup.",
    employee: "Edit filing status and view per-period deductions.",
  },
  {
    icon: HeartPulse,
    name: "Benefits administration",
    summary: "Plan enrollment and open-enrollment switching.",
    hr: "Change any employee's plan and track enrollment status.",
    employee: "Compare plans and enroll during a mock window.",
  },
  {
    icon: Briefcase,
    name: "Recruiting / ATS",
    summary: "Job postings and a candidate pipeline.",
    hr: "Create postings and advance candidates through stages.",
    employee: "Not visible.",
  },
  {
    icon: ClipboardCheck,
    name: "Onboarding & offboarding",
    summary: "Lifecycle checklists from first day to last.",
    hr: "Track new-hire progress and start offboarding cases.",
    employee: "A personal onboarding checklist with a progress bar.",
  },
  {
    icon: Target,
    name: "Performance management",
    summary: "Goals, progress and review cycles.",
    hr: "Review every goal and complete manager feedback.",
    employee: "Track goals and submit a self-review.",
  },
  {
    icon: GraduationCap,
    name: "Learning & development",
    summary: "Assign trainings and track completion.",
    hr: "Assign courses to teams and watch completion rates.",
    employee: "Complete assigned courses.",
  },
  {
    icon: BarChart3,
    name: "Reporting & analytics",
    summary: "Headcount, turnover and compensation charts.",
    hr: "Charts built from live directory data.",
    employee: "Not visible.",
  },
  {
    icon: ShieldCheck,
    name: "Compliance & documents",
    summary: "Policy repository and acknowledgment tracking.",
    hr: "See who has and hasn't signed each policy.",
    employee: "Sign the documents that apply to them.",
  },
  {
    icon: FileText,
    name: "Self-service everywhere",
    summary: "Routine tasks handled without emailing HR.",
    hr: "Consistent surfaces across all admin modules.",
    employee: "Pay stubs, PTO, benefits and signatures in one place.",
  },
]

const INCLUDED = [
  "Role-based views across every module",
  "Every add / edit / remove / approve action works in-session",
  "Onboarding → active → offboarding lifecycle end-to-end",
  "Cross-module connections (directory feeds payroll, benefits, comp)",
  "Light and dark themes across every screen",
]

const PLANNED = [
  "Persistent database behind every module",
  "Real authentication and server-side access control",
  "A compliant payroll and tax engine or provider integration",
  "Benefits, recruiting and learning integrations",
  "Legally binding e-signatures for policies",
]

const STATS = [
  { value: "14", label: "Connected modules" },
  { value: "2", label: "Distinct roles" },
  { value: "21", label: "Clickable screens" },
  { value: "8", label: "Seed employees" },
]

export function LandingPage({ onEnter }: { onEnter: () => void }) {
  const { login } = useRoster()
  useDocumentTitle("Employee Management MVP")

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center bg-primary text-primary-foreground">
              <SquareStack className="size-4" />
            </div>
            <span className="font-heading text-base font-semibold">Roster</span>
            <Badge variant="outline" className="ml-1 hidden sm:inline-flex">
              MVP
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onEnter}>
              Sign in
            </Button>
            <Button size="sm" onClick={onEnter}>
              Explore the demo
              <ArrowRight />
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="max-w-3xl space-y-6">
              <Badge variant="outline" className="gap-1.5">
                <Sparkles className="size-3" />
                Interactive MVP preview
              </Badge>
              <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                The entire employee lifecycle, in one clickable prototype.
              </h1>
              <p className="max-w-2xl text-sm/relaxed text-muted-foreground sm:text-base/relaxed">
                Roster is a full-scope MVP for an employee management platform —
                directory, payroll, benefits, recruiting, performance, learning
                and compliance. Fourteen connected modules across two roles,
                built to test breadth of experience and how modules link
                together before any real infrastructure, payroll partner or
                compliance work is committed.
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <Button size="lg" onClick={() => login("admin")}>
                  <ShieldCheck />
                  Enter as HR Manager
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => login("employee")}
                >
                  <UserCircle />
                  Enter as Employee
                </Button>
                <Button size="lg" variant="ghost" onClick={onEnter}>
                  Use the login screen
                  <ArrowRight />
                </Button>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="border-l-2 border-primary pl-3">
                  <p className="font-heading text-3xl font-semibold tracking-tight">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="Two perspectives"
              title="Built around role-based access"
              description="The single most important thing this MVP validates is how the same platform feels completely different depending on who is signed in."
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center bg-primary/10 text-primary">
                      <ShieldCheck className="size-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        HR Manager / Boss
                      </CardTitle>
                      <CardDescription>Full admin workspace</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    "Full CRUD across the employee directory",
                    "Run mock payroll and inspect the pay register",
                    "Approve leave, manage benefits and recruiting",
                    "Review performance and complete manager feedback",
                    "Track compliance signatures across the company",
                  ].map((item) => (
                    <Bullet key={item}>{item}</Bullet>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center bg-primary/10 text-primary">
                      <UserCircle className="size-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Employee</CardTitle>
                      <CardDescription>Self-service view</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    "View their own profile, pay stubs and PTO balance",
                    "Submit time-off requests and clock in / out",
                    "Enroll in benefits during open enrollment",
                    "Complete onboarding, goals and assigned learning",
                    "Sign policies and browse the company directory",
                  ].map((item) => (
                    <Bullet key={item}>{item}</Bullet>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="Full module list"
              title="Fourteen modules, every one clickable"
              description="Each module is a real screen populated with fake data, using placeholder logic for anything calculation-based."
              icon={LayoutGrid}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MODULES.map((m) => {
                const Icon = m.icon
                return (
                  <Card key={m.name}>
                    <CardHeader>
                      <div className="flex size-9 items-center justify-center bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <CardTitle className="mt-2 text-sm">{m.name}</CardTitle>
                      <CardDescription>{m.summary}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1.5 text-xs">
                      <p>
                        <span className="font-medium text-foreground">
                          HR:{" "}
                        </span>
                        <span className="text-muted-foreground">{m.hr}</span>
                      </p>
                      <p>
                        <span className="font-medium text-foreground">
                          Employee:{" "}
                        </span>
                        <span className="text-muted-foreground">
                          {m.employee}
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="One continuous story"
              title="The full lifecycle, end to end"
              description="Click through a new hire from their first checklist to their final day without leaving the prototype."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <LifecycleStep
                step="01"
                icon={ClipboardCheck}
                title="Onboarding"
                body="New hires appear with a checklist; completing every item flips them to Active automatically."
              />
              <LifecycleStep
                step="02"
                icon={Target}
                title="Active employee"
                body="Payroll, benefits, attendance, performance and learning all read from the same live record."
              />
              <LifecycleStep
                step="03"
                icon={ShieldHalf}
                title="Offboarding"
                body="Start an offboarding case to generate an exit checklist and move the employee out of active flows."
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <SectionHeading
              eyebrow="Scope of this MVP"
              title="What's here now, and what comes next"
              description="This MVP focuses on the full breadth of experience so trade-off conversations can happen against something real and clickable."
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                    Included in this MVP
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {INCLUDED.map((item) => (
                    <Bullet key={item}>{item}</Bullet>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Rocket className="size-4 text-primary" />
                    Planned for production
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {PLANNED.map((item) => (
                    <Bullet key={item} tone="muted">
                      {item}
                    </Bullet>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-16 sm:grid-cols-3 sm:px-6">
            <Highlight
              icon={Database}
              title="In-memory by design"
              body="Realistic seed data for eight employees powers every module — and resets cleanly on logout."
            />
            <Highlight
              icon={Lock}
              title="Demo authentication"
              body="Two hardcoded logins plus one-click role toggles for smooth walkthroughs."
            />
            <Highlight
              icon={LayoutGrid}
              title="Consistent design system"
              body="Built with shadcn components and a single themed token set, in both light and dark."
            />
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              Ready to click through it?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Jump straight in as either role — nothing you do persists, so
              explore freely.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              <Button size="lg" onClick={() => login("admin")}>
                <ShieldCheck />
                Enter as HR Manager
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => login("employee")}
              >
                <UserCircle />
                Enter as Employee
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <SquareStack className="size-3.5" />
            <span>Roster — interactive MVP prototype</span>
          </div>
            <span>An interactive MVP preview.</span>
        </div>
      </footer>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string
  title: string
  description: string
  icon?: LucideIcon
}) {
  return (
    <div className="max-w-2xl space-y-2">
      <div className="flex items-center gap-2 text-primary">
        {Icon ? <Icon className="size-4" /> : null}
        <span className="text-xs font-semibold tracking-wider uppercase">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="text-sm/relaxed text-muted-foreground">{description}</p>
    </div>
  )
}

function Bullet({
  children,
  tone = "default",
}: {
  children: React.ReactNode
  tone?: "default" | "muted"
}) {
  return (
    <div className="flex items-start gap-2 text-xs">
      <CheckCircle2
        className={
          tone === "muted"
            ? "mt-0.5 size-3.5 shrink-0 text-muted-foreground"
            : "mt-0.5 size-3.5 shrink-0 text-primary"
        }
      />
      <span className={tone === "muted" ? "text-muted-foreground" : ""}>
        {children}
      </span>
    </div>
  )
}

function LifecycleStep({
  step,
  icon: Icon,
  title,
  body,
}: {
  step: string
  icon: LucideIcon
  title: string
  body: string
}) {
  return (
    <Card>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex size-9 items-center justify-center bg-primary/10 text-primary">
            <Icon className="size-4" />
          </div>
          <span className="font-heading text-2xl font-semibold text-muted-foreground/40">
            {step}
          </span>
        </div>
        <p className="font-heading text-sm font-semibold">{title}</p>
        <p className="text-xs/relaxed text-muted-foreground">{body}</p>
      </CardContent>
    </Card>
  )
}

function Highlight({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon
  title: string
  body: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex size-9 items-center justify-center bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>
      <p className="font-heading text-sm font-semibold">{title}</p>
      <p className="text-xs/relaxed text-muted-foreground">{body}</p>
    </div>
  )
}
