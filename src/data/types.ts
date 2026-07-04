export type Role = "admin" | "employee"

export type EmployeeStatus = "Active" | "Onboarding" | "Offboarding" | "Terminated"

export type PayFrequency = "Bi-weekly" | "Monthly"

export type FilingStatus = "Single" | "Married" | "Head of Household"

export type OnboardingStatus = "Completed" | "In progress" | "Not started"

export type EnrollmentStatus = "Enrolled" | "Pending" | "Not enrolled"

export type TrainingStatus = "Completed" | "Pending"

export interface AssignedTraining {
  courseId: string
  status: TrainingStatus
}

export interface Employee {
  id: string
  name: string
  department: string
  title: string
  status: EmployeeStatus
  startDate: string
  email: string
  phone: string
  location: string
  manager: string
  annualSalary: number
  payFrequency: PayFrequency
  filingStatus: FilingStatus
  allowances: number
  benefitsPlan: string
  enrollmentStatus: EnrollmentStatus
  ptoBalance: number
  onboardingStatus: OnboardingStatus
  remote: boolean
  trainings: AssignedTraining[]
}

export type LeaveType = "Vacation" | "Sick" | "Personal" | "Parental"

export type LeaveStatus = "Pending" | "Approved" | "Denied"

export interface LeaveRequest {
  id: string
  employeeId: string
  type: LeaveType
  startDate: string
  endDate: string
  days: number
  reason: string
  status: LeaveStatus
}

export interface AttendanceEntry {
  id: string
  employeeId: string
  date: string
  clockIn: string
  clockOut: string
  hours: number
  status: "On time" | "Late" | "Absent"
}

export interface PayrollLine {
  employeeId: string
  gross: number
  fedTax: number
  stateTax: number
  benefitsDeduction: number
  net: number
}

export interface PayrollRun {
  id: string
  period: string
  payDate: string
  lines: PayrollLine[]
}

export type CandidateStage = "Applied" | "Interviewing" | "Offer" | "Hired"

export interface Candidate {
  id: string
  name: string
  stage: CandidateStage
}

export type JobStatus = "Open" | "Draft" | "Closed"

export interface JobPosting {
  id: string
  role: string
  department: string
  status: JobStatus
  candidates: Candidate[]
}

export interface ChecklistItem {
  id: string
  label: string
  done: boolean
}

export interface OffboardingCase {
  employeeId: string
  startedOn: string
  checklist: ChecklistItem[]
}

export type ReviewStatus =
  | "Not started"
  | "Self-review submitted"
  | "Manager review complete"

export interface PerformanceRecord {
  employeeId: string
  goal: string
  progress: number
  reviewStatus: ReviewStatus
  managerNotes: string
  selfReview: string
}

export type CourseAudience = "All employees" | "Engineering" | "Managers"

export interface Course {
  id: string
  name: string
  audience: CourseAudience
}

export interface DocumentSignature {
  employeeId: string
  signed: boolean
}

export interface ComplianceDocument {
  id: string
  name: string
  appliesTo: "All employees" | "Remote employees"
  signatures: DocumentSignature[]
}

export interface AppState {
  employees: Employee[]
  leaveRequests: LeaveRequest[]
  attendance: AttendanceEntry[]
  payrollRuns: PayrollRun[]
  jobPostings: JobPosting[]
  onboardingChecklists: Record<string, ChecklistItem[]>
  offboardingCases: OffboardingCase[]
  performance: PerformanceRecord[]
  courses: Course[]
  documents: ComplianceDocument[]
}
