import type {
  AppState,
  AttendanceEntry,
  ChecklistItem,
  ComplianceDocument,
  Course,
  Employee,
  JobPosting,
  LeaveRequest,
  PayrollRun,
  PerformanceRecord,
} from "@/data/types"

export const EMPLOYEE_PERSONA_ID = "RS-0056"

export const ADMIN_CREDENTIALS = {
  email: "admin@roster.io",
  password: "admin123",
}
export const EMPLOYEE_CREDENTIALS = {
  email: "employee@roster.io",
  password: "employee123",
}

export const BENEFIT_PLANS = [
  "Roster Health — PPO",
  "Roster Health — HMO",
  "Roster Health — HDHP",
  "Not enrolled",
] as const

export const FED_TAX_RATE = 0.12
export const STATE_TAX_RATE = 0.04

export const courses: Course[] = [
  { id: "CO-01", name: "Code of Conduct", audience: "All employees" },
  { id: "CO-02", name: "Security Basics", audience: "Engineering" },
  { id: "CO-03", name: "Giving Effective Feedback", audience: "Managers" },
]

const employees: Employee[] = [
  {
    id: "RS-0142",
    name: "Priya Nair",
    department: "Engineering",
    title: "Staff Engineer",
    status: "Active",
    startDate: "2021-03-15",
    email: "priya.nair@roster.io",
    phone: "+1 (415) 555-0142",
    location: "San Francisco, CA",
    manager: "Elena Fischer",
    annualSalary: 148000,
    payFrequency: "Bi-weekly",
    filingStatus: "Single",
    allowances: 2,
    benefitsPlan: "Roster Health — PPO",
    enrollmentStatus: "Enrolled",
    ptoBalance: 14,
    onboardingStatus: "Completed",
    remote: false,
    trainings: [
      { courseId: "CO-01", status: "Completed" },
      { courseId: "CO-02", status: "Pending" },
    ],
  },
  {
    id: "RS-0088",
    name: "Marcus Webb",
    department: "Sales",
    title: "Account Executive",
    status: "Active",
    startDate: "2022-07-01",
    email: "marcus.webb@roster.io",
    phone: "+1 (312) 555-0088",
    location: "Chicago, IL",
    manager: "Elena Fischer",
    annualSalary: 90000,
    payFrequency: "Bi-weekly",
    filingStatus: "Married",
    allowances: 3,
    benefitsPlan: "Roster Health — HMO",
    enrollmentStatus: "Enrolled",
    ptoBalance: 9,
    onboardingStatus: "Completed",
    remote: false,
    trainings: [{ courseId: "CO-01", status: "Completed" }],
  },
  {
    id: "RS-0056",
    name: "Aisha Bello",
    department: "People",
    title: "HR Business Partner",
    status: "Active",
    startDate: "2020-11-09",
    email: "aisha.bello@roster.io",
    phone: "+1 (646) 555-0056",
    location: "New York, NY",
    manager: "Elena Fischer",
    annualSalary: 75000,
    payFrequency: "Bi-weekly",
    filingStatus: "Single",
    allowances: 1,
    benefitsPlan: "Roster Health — PPO",
    enrollmentStatus: "Enrolled",
    ptoBalance: 18,
    onboardingStatus: "Completed",
    remote: true,
    trainings: [
      { courseId: "CO-01", status: "Completed" },
      { courseId: "CO-03", status: "Pending" },
    ],
  },
  {
    id: "RS-0203",
    name: "Daniel Kwon",
    department: "Engineering",
    title: "Senior Engineer",
    status: "Active",
    startDate: "2022-01-24",
    email: "daniel.kwon@roster.io",
    phone: "+1 (206) 555-0203",
    location: "Seattle, WA",
    manager: "Priya Nair",
    annualSalary: 132000,
    payFrequency: "Bi-weekly",
    filingStatus: "Head of Household",
    allowances: 2,
    benefitsPlan: "Roster Health — HDHP",
    enrollmentStatus: "Enrolled",
    ptoBalance: 11,
    onboardingStatus: "Completed",
    remote: true,
    trainings: [
      { courseId: "CO-01", status: "Completed" },
      { courseId: "CO-02", status: "Pending" },
    ],
  },
  {
    id: "RS-0311",
    name: "Sofia Reyes",
    department: "Marketing",
    title: "Content Lead",
    status: "Active",
    startDate: "2023-05-02",
    email: "sofia.reyes@roster.io",
    phone: "+1 (512) 555-0311",
    location: "Austin, TX",
    manager: "Elena Fischer",
    annualSalary: 98000,
    payFrequency: "Bi-weekly",
    filingStatus: "Single",
    allowances: 1,
    benefitsPlan: "Roster Health — PPO",
    enrollmentStatus: "Pending",
    ptoBalance: 7,
    onboardingStatus: "Completed",
    remote: false,
    trainings: [{ courseId: "CO-01", status: "Pending" }],
  },
  {
    id: "RS-0377",
    name: "James Okafor",
    department: "Finance",
    title: "Financial Analyst",
    status: "Active",
    startDate: "2021-09-13",
    email: "james.okafor@roster.io",
    phone: "+1 (404) 555-0377",
    location: "Atlanta, GA",
    manager: "Elena Fischer",
    annualSalary: 105000,
    payFrequency: "Bi-weekly",
    filingStatus: "Married",
    allowances: 4,
    benefitsPlan: "Roster Health — HMO",
    enrollmentStatus: "Enrolled",
    ptoBalance: 13,
    onboardingStatus: "Completed",
    remote: false,
    trainings: [{ courseId: "CO-01", status: "Completed" }],
  },
  {
    id: "RS-0402",
    name: "Lena Hoffmann",
    department: "Engineering",
    title: "Frontend Engineer",
    status: "Onboarding",
    startDate: "2026-06-22",
    email: "lena.hoffmann@roster.io",
    phone: "+1 (415) 555-0402",
    location: "Remote",
    manager: "Priya Nair",
    annualSalary: 120000,
    payFrequency: "Bi-weekly",
    filingStatus: "Single",
    allowances: 1,
    benefitsPlan: "Not enrolled",
    enrollmentStatus: "Not enrolled",
    ptoBalance: 0,
    onboardingStatus: "In progress",
    remote: true,
    trainings: [{ courseId: "CO-01", status: "Pending" }],
  },
  {
    id: "RS-0415",
    name: "Tom Becker",
    department: "Support",
    title: "Support Specialist",
    status: "Onboarding",
    startDate: "2026-06-29",
    email: "tom.becker@roster.io",
    phone: "+1 (503) 555-0415",
    location: "Portland, OR",
    manager: "Aisha Bello",
    annualSalary: 68000,
    payFrequency: "Bi-weekly",
    filingStatus: "Single",
    allowances: 0,
    benefitsPlan: "Not enrolled",
    enrollmentStatus: "Not enrolled",
    ptoBalance: 0,
    onboardingStatus: "Not started",
    remote: false,
    trainings: [{ courseId: "CO-01", status: "Pending" }],
  },
]

export const ONBOARDING_TEMPLATE: Omit<ChecklistItem, "done">[] = [
  { id: "ob-1", label: "Sign offer letter" },
  { id: "ob-2", label: "Complete I-9 / work authorization" },
  { id: "ob-3", label: "Set up company email" },
  { id: "ob-4", label: "Assign laptop and equipment" },
  { id: "ob-5", label: 'Complete "Code of Conduct" training' },
  { id: "ob-6", label: "30-day check-in scheduled" },
]

export const OFFBOARDING_TEMPLATE: Omit<ChecklistItem, "done">[] = [
  { id: "of-1", label: "Final pay confirmed" },
  { id: "of-2", label: "Equipment returned" },
  { id: "of-3", label: "Access revoked (email, systems)" },
  { id: "of-4", label: "Exit interview completed" },
  { id: "of-5", label: "COBRA / benefits-end notice sent" },
]

const leaveRequests: LeaveRequest[] = [
  {
    id: "LV-1001",
    employeeId: "RS-0088",
    type: "Vacation",
    startDate: "2026-07-14",
    endDate: "2026-07-18",
    days: 5,
    reason: "Family trip",
    status: "Pending",
  },
  {
    id: "LV-1002",
    employeeId: "RS-0311",
    type: "Sick",
    startDate: "2026-07-07",
    endDate: "2026-07-08",
    days: 2,
    reason: "Flu recovery",
    status: "Pending",
  },
  {
    id: "LV-1003",
    employeeId: "RS-0056",
    type: "Personal",
    startDate: "2026-07-21",
    endDate: "2026-07-21",
    days: 1,
    reason: "Appointment",
    status: "Pending",
  },
  {
    id: "LV-1004",
    employeeId: "RS-0142",
    type: "Vacation",
    startDate: "2026-05-12",
    endDate: "2026-05-16",
    days: 5,
    reason: "Vacation",
    status: "Approved",
  },
  {
    id: "LV-1005",
    employeeId: "RS-0203",
    type: "Sick",
    startDate: "2026-04-03",
    endDate: "2026-04-03",
    days: 1,
    reason: "Migraine",
    status: "Approved",
  },
  {
    id: "LV-1006",
    employeeId: "RS-0377",
    type: "Personal",
    startDate: "2026-03-19",
    endDate: "2026-03-20",
    days: 2,
    reason: "Moving",
    status: "Denied",
  },
]

function buildAttendance(): AttendanceEntry[] {
  const days = [
    "2026-06-29",
    "2026-06-30",
    "2026-07-01",
    "2026-07-02",
    "2026-07-03",
  ]
  const active = employees.filter((e) => e.status === "Active")
  const rows: AttendanceEntry[] = []
  active.forEach((emp, empIndex) => {
    days.forEach((day, dayIndex) => {
      const late = (empIndex + dayIndex) % 7 === 0
      const absent = (empIndex + dayIndex) % 11 === 0
      rows.push({
        id: `AT-${emp.id}-${day}`,
        employeeId: emp.id,
        date: day,
        clockIn: absent ? "—" : late ? "09:24" : "08:58",
        clockOut: absent ? "—" : "17:31",
        hours: absent ? 0 : late ? 7.6 : 8.1,
        status: absent ? "Absent" : late ? "Late" : "On time",
      })
    })
  })
  return rows
}

function buildPayrollLine(emp: Employee) {
  const gross = emp.annualSalary / 26
  const fedTax = gross * FED_TAX_RATE
  const stateTax = gross * STATE_TAX_RATE
  const benefitsDeduction =
    emp.enrollmentStatus === "Enrolled"
      ? emp.benefitsPlan.includes("PPO")
        ? 180
        : emp.benefitsPlan.includes("HMO")
          ? 120
          : 90
      : 0
  const net = gross - fedTax - stateTax - benefitsDeduction
  return {
    employeeId: emp.id,
    gross: round(gross),
    fedTax: round(fedTax),
    stateTax: round(stateTax),
    benefitsDeduction: round(benefitsDeduction),
    net: round(net),
  }
}

function round(value: number): number {
  return Math.round(value * 100) / 100
}

const payrollRuns: PayrollRun[] = [
  {
    id: "PR-2026-12",
    period: "Jun 8 – Jun 21, 2026",
    payDate: "2026-06-26",
    lines: employees.filter((e) => e.status === "Active").map(buildPayrollLine),
  },
  {
    id: "PR-2026-11",
    period: "May 25 – Jun 7, 2026",
    payDate: "2026-06-12",
    lines: employees.filter((e) => e.status === "Active").map(buildPayrollLine),
  },
]

const jobPostings: JobPosting[] = [
  {
    id: "JP-01",
    role: "Senior Frontend Engineer",
    department: "Engineering",
    status: "Open",
    candidates: [
      { id: "CA-01", name: "Nadia Khan", stage: "Interviewing" },
      { id: "CA-02", name: "Ravi Menon", stage: "Interviewing" },
      { id: "CA-03", name: "Grace Liu", stage: "Applied" },
      { id: "CA-04", name: "Owen Wright", stage: "Applied" },
      { id: "CA-05", name: "Isla Novak", stage: "Offer" },
      { id: "CA-06", name: "Diego Torres", stage: "Applied" },
    ],
  },
  {
    id: "JP-02",
    role: "Sales Development Rep",
    department: "Sales",
    status: "Open",
    candidates: [
      { id: "CA-07", name: "Mia Chen", stage: "Interviewing" },
      { id: "CA-08", name: "Leo Park", stage: "Applied" },
      { id: "CA-09", name: "Hana Sato", stage: "Applied" },
      { id: "CA-10", name: "Noah Bright", stage: "Applied" },
      { id: "CA-11", name: "Ada Cole", stage: "Hired" },
      { id: "CA-12", name: "Ben Cruz", stage: "Applied" },
      { id: "CA-13", name: "Zoe Adeyemi", stage: "Interviewing" },
      { id: "CA-14", name: "Kai Weber", stage: "Applied" },
      { id: "CA-15", name: "Nora Idris", stage: "Applied" },
      { id: "CA-16", name: "Sam Ortiz", stage: "Offer" },
      { id: "CA-17", name: "Ivy Bello", stage: "Applied" },
    ],
  },
  {
    id: "JP-03",
    role: "People Ops Coordinator",
    department: "People",
    status: "Draft",
    candidates: [],
  },
]

function buildOnboardingChecklists(): Record<string, ChecklistItem[]> {
  const map: Record<string, ChecklistItem[]> = {}
  const lena = ONBOARDING_TEMPLATE.map((item, index) => ({
    ...item,
    done: index < 3,
  }))
  const tom = ONBOARDING_TEMPLATE.map((item) => ({ ...item, done: false }))
  map["RS-0402"] = lena
  map["RS-0415"] = tom
  return map
}

const performance: PerformanceRecord[] = [
  {
    employeeId: "RS-0142",
    goal: "Ship v2 API by Q3",
    progress: 70,
    reviewStatus: "Self-review submitted",
    managerNotes: "",
    selfReview:
      "Delivered the auth and billing endpoints ahead of schedule. Remaining work is the events pipeline.",
  },
  {
    employeeId: "RS-0203",
    goal: "Reduce build time by 30%",
    progress: 45,
    reviewStatus: "Not started",
    managerNotes: "",
    selfReview: "",
  },
  {
    employeeId: "RS-0056",
    goal: "Complete HRBP certification",
    progress: 100,
    reviewStatus: "Manager review complete",
    managerNotes:
      "Outstanding progress. Certification complete and already applying frameworks to the team.",
    selfReview: "Completed all coursework and the final assessment.",
  },
  {
    employeeId: "RS-0088",
    goal: "Close $1.2M in new ARR",
    progress: 60,
    reviewStatus: "Not started",
    managerNotes: "",
    selfReview: "",
  },
  {
    employeeId: "RS-0311",
    goal: "Grow blog traffic by 40%",
    progress: 55,
    reviewStatus: "Self-review submitted",
    managerNotes: "",
    selfReview: "New content series is performing well; up 28% so far.",
  },
  {
    employeeId: "RS-0377",
    goal: "Automate monthly close",
    progress: 80,
    reviewStatus: "Not started",
    managerNotes: "",
    selfReview: "",
  },
]

const documents: ComplianceDocument[] = [
  {
    id: "DOC-01",
    name: "Employee Handbook v3",
    appliesTo: "All employees",
    signatures: employees.map((e, i) => ({
      employeeId: e.id,
      signed: i < 6,
    })),
  },
  {
    id: "DOC-02",
    name: "Remote Work Policy",
    appliesTo: "Remote employees",
    signatures: employees
      .filter((e) => e.remote)
      .map((e, i) => ({ employeeId: e.id, signed: i < 3 })),
  },
  {
    id: "DOC-03",
    name: "NDA",
    appliesTo: "All employees",
    signatures: employees.map((e) => ({ employeeId: e.id, signed: true })),
  },
]

export function createInitialState(): AppState {
  return {
    employees: employees.map((e) => ({
      ...e,
      trainings: e.trainings.map((t) => ({ ...t })),
    })),
    leaveRequests: leaveRequests.map((r) => ({ ...r })),
    attendance: buildAttendance(),
    payrollRuns: payrollRuns.map((run) => ({
      ...run,
      lines: run.lines.map((l) => ({ ...l })),
    })),
    jobPostings: jobPostings.map((j) => ({
      ...j,
      candidates: j.candidates.map((c) => ({ ...c })),
    })),
    onboardingChecklists: buildOnboardingChecklists(),
    offboardingCases: [],
    performance: performance.map((p) => ({ ...p })),
    courses: courses.map((c) => ({ ...c })),
    documents: documents.map((d) => ({
      ...d,
      signatures: d.signatures.map((s) => ({ ...s })),
    })),
  }
}

export { buildPayrollLine, round }
