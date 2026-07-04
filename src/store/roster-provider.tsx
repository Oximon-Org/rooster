/* eslint-disable react-refresh/only-export-components */
import * as React from "react"

import type {
  AppState,
  ChecklistItem,
  Employee,
  JobPosting,
  LeaveRequest,
  LeaveStatus,
  PerformanceRecord,
  Role,
  TrainingStatus,
} from "@/data/types"
import {
  ADMIN_CREDENTIALS,
  buildPayrollLine,
  createInitialState,
  EMPLOYEE_CREDENTIALS,
  EMPLOYEE_PERSONA_ID,
  OFFBOARDING_TEMPLATE,
} from "@/data/seed"

export type RouteName =
  | "directory"
  | "profile"
  | "attendance"
  | "timeoff"
  | "payroll"
  | "tax"
  | "benefits"
  | "recruiting"
  | "onboarding"
  | "performance"
  | "learning"
  | "reports"
  | "compliance"
  | "pay"
  | "goals"
  | "documents"

export interface Route {
  name: RouteName
  employeeId?: string
}

interface AuthState {
  role: Role
  userId: string
}

interface RosterContextValue {
  auth: AuthState | null
  login: (role: Role) => void
  loginWithCredentials: (email: string, password: string) => boolean
  logout: () => void
  route: Route
  navigate: (route: Route) => void
  state: AppState
  actions: Actions
}

interface Actions {
  addEmployee: (employee: Omit<Employee, "trainings">) => void
  updateEmployee: (id: string, patch: Partial<Employee>) => void
  removeEmployee: (id: string) => void
  setLeaveStatus: (id: string, status: LeaveStatus) => void
  addLeaveRequest: (
    request: Omit<LeaveRequest, "id" | "status" | "employeeId"> & {
      employeeId: string
    }
  ) => void
  runPayroll: () => void
  setBenefitsPlan: (employeeId: string, plan: string) => void
  addJobPosting: (posting: Omit<JobPosting, "id" | "candidates">) => void
  advanceCandidate: (jobId: string, candidateId: string) => void
  toggleOnboardingItem: (employeeId: string, itemId: string) => void
  startOffboarding: (employeeId: string) => void
  toggleOffboardingItem: (employeeId: string, itemId: string) => void
  updatePerformance: (
    employeeId: string,
    patch: Partial<PerformanceRecord>
  ) => void
  assignCourse: (courseId: string, employeeIds: string[]) => void
  setTrainingStatus: (
    employeeId: string,
    courseId: string,
    status: TrainingStatus
  ) => void
  signDocument: (documentId: string, employeeId: string) => void
}

const RosterContext = React.createContext<RosterContextValue | undefined>(
  undefined
)

const CANDIDATE_STAGES = ["Applied", "Interviewing", "Offer", "Hired"] as const

function nextId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

export function RosterProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = React.useState<AuthState | null>(null)
  const [route, setRoute] = React.useState<Route>({ name: "directory" })
  const [state, setState] = React.useState<AppState>(() => createInitialState())

  const login = React.useCallback((role: Role) => {
    setState(createInitialState())
    setAuth({
      role,
      userId: role === "admin" ? "admin" : EMPLOYEE_PERSONA_ID,
    })
    setRoute({ name: role === "admin" ? "directory" : "profile" })
  }, [])

  const loginWithCredentials = React.useCallback(
    (email: string, password: string) => {
      const normalized = email.trim().toLowerCase()
      if (
        normalized === ADMIN_CREDENTIALS.email &&
        password === ADMIN_CREDENTIALS.password
      ) {
        login("admin")
        return true
      }
      if (
        normalized === EMPLOYEE_CREDENTIALS.email &&
        password === EMPLOYEE_CREDENTIALS.password
      ) {
        login("employee")
        return true
      }
      return false
    },
    [login]
  )

  const logout = React.useCallback(() => {
    setAuth(null)
    setState(createInitialState())
  }, [])

  const navigate = React.useCallback((next: Route) => {
    setRoute(next)
  }, [])

  const actions = React.useMemo<Actions>(
    () => ({
      addEmployee: (employee) =>
        setState((prev) => ({
          ...prev,
          employees: [...prev.employees, { ...employee, trainings: [] }],
        })),
      updateEmployee: (id, patch) =>
        setState((prev) => ({
          ...prev,
          employees: prev.employees.map((e) =>
            e.id === id ? { ...e, ...patch } : e
          ),
        })),
      removeEmployee: (id) =>
        setState((prev) => ({
          ...prev,
          employees: prev.employees.filter((e) => e.id !== id),
        })),
      setLeaveStatus: (id, status) =>
        setState((prev) => ({
          ...prev,
          leaveRequests: prev.leaveRequests.map((r) =>
            r.id === id ? { ...r, status } : r
          ),
        })),
      addLeaveRequest: (request) =>
        setState((prev) => ({
          ...prev,
          leaveRequests: [
            {
              ...request,
              id: nextId("LV"),
              status: "Pending" as LeaveStatus,
            },
            ...prev.leaveRequests,
          ],
        })),
      runPayroll: () =>
        setState((prev) => {
          const index = prev.payrollRuns.length + 1
          const lines = prev.employees
            .filter((e) => e.status === "Active")
            .map(buildPayrollLine)
          const now = new Date()
          const run = {
            id: `PR-2026-${12 + index}`,
            period: "Jun 22 – Jul 5, 2026",
            payDate: now.toISOString().slice(0, 10),
            lines,
          }
          return { ...prev, payrollRuns: [run, ...prev.payrollRuns] }
        }),
      setBenefitsPlan: (employeeId, plan) =>
        setState((prev) => ({
          ...prev,
          employees: prev.employees.map((e) =>
            e.id === employeeId
              ? {
                  ...e,
                  benefitsPlan: plan,
                  enrollmentStatus:
                    plan === "Not enrolled" ? "Not enrolled" : "Enrolled",
                }
              : e
          ),
        })),
      addJobPosting: (posting) =>
        setState((prev) => ({
          ...prev,
          jobPostings: [
            ...prev.jobPostings,
            { ...posting, id: nextId("JP"), candidates: [] },
          ],
        })),
      advanceCandidate: (jobId, candidateId) =>
        setState((prev) => ({
          ...prev,
          jobPostings: prev.jobPostings.map((job) =>
            job.id !== jobId
              ? job
              : {
                  ...job,
                  candidates: job.candidates.map((c) => {
                    if (c.id !== candidateId) return c
                    const idx = CANDIDATE_STAGES.indexOf(c.stage)
                    const next =
                      CANDIDATE_STAGES[
                        Math.min(idx + 1, CANDIDATE_STAGES.length - 1)
                      ]
                    return { ...c, stage: next }
                  }),
                }
          ),
        })),
      toggleOnboardingItem: (employeeId, itemId) =>
        setState((prev) => {
          const list = prev.onboardingChecklists[employeeId]
          if (!list) return prev
          const updated = list.map((item) =>
            item.id === itemId ? { ...item, done: !item.done } : item
          )
          const allDone = updated.every((i) => i.done)
          return {
            ...prev,
            onboardingChecklists: {
              ...prev.onboardingChecklists,
              [employeeId]: updated,
            },
            employees: prev.employees.map((e) =>
              e.id === employeeId
                ? {
                    ...e,
                    onboardingStatus: allDone ? "Completed" : "In progress",
                    status: allDone && e.status === "Onboarding" ? "Active" : e.status,
                  }
                : e
            ),
          }
        }),
      startOffboarding: (employeeId) =>
        setState((prev) => {
          if (prev.offboardingCases.some((c) => c.employeeId === employeeId)) {
            return prev
          }
          const checklist: ChecklistItem[] = OFFBOARDING_TEMPLATE.map(
            (item) => ({ ...item, done: false })
          )
          return {
            ...prev,
            offboardingCases: [
              ...prev.offboardingCases,
              {
                employeeId,
                startedOn: new Date().toISOString().slice(0, 10),
                checklist,
              },
            ],
            employees: prev.employees.map((e) =>
              e.id === employeeId ? { ...e, status: "Offboarding" } : e
            ),
          }
        }),
      toggleOffboardingItem: (employeeId, itemId) =>
        setState((prev) => ({
          ...prev,
          offboardingCases: prev.offboardingCases.map((c) =>
            c.employeeId === employeeId
              ? {
                  ...c,
                  checklist: c.checklist.map((item) =>
                    item.id === itemId ? { ...item, done: !item.done } : item
                  ),
                }
              : c
          ),
        })),
      updatePerformance: (employeeId, patch) =>
        setState((prev) => ({
          ...prev,
          performance: prev.performance.map((p) =>
            p.employeeId === employeeId ? { ...p, ...patch } : p
          ),
        })),
      assignCourse: (courseId, employeeIds) =>
        setState((prev) => ({
          ...prev,
          employees: prev.employees.map((e) => {
            if (!employeeIds.includes(e.id)) return e
            if (e.trainings.some((t) => t.courseId === courseId)) return e
            return {
              ...e,
              trainings: [...e.trainings, { courseId, status: "Pending" }],
            }
          }),
        })),
      setTrainingStatus: (employeeId, courseId, status) =>
        setState((prev) => ({
          ...prev,
          employees: prev.employees.map((e) =>
            e.id === employeeId
              ? {
                  ...e,
                  trainings: e.trainings.map((t) =>
                    t.courseId === courseId ? { ...t, status } : t
                  ),
                }
              : e
          ),
        })),
      signDocument: (documentId, employeeId) =>
        setState((prev) => ({
          ...prev,
          documents: prev.documents.map((doc) =>
            doc.id !== documentId
              ? doc
              : {
                  ...doc,
                  signatures: doc.signatures.some(
                    (s) => s.employeeId === employeeId
                  )
                    ? doc.signatures.map((s) =>
                        s.employeeId === employeeId
                          ? { ...s, signed: true }
                          : s
                      )
                    : [...doc.signatures, { employeeId, signed: true }],
                }
          ),
        })),
    }),
    []
  )

  const value = React.useMemo<RosterContextValue>(
    () => ({
      auth,
      login,
      loginWithCredentials,
      logout,
      route,
      navigate,
      state,
      actions,
    }),
    [auth, login, loginWithCredentials, logout, route, navigate, state, actions]
  )

  return (
    <RosterContext.Provider value={value}>{children}</RosterContext.Provider>
  )
}

export function useRoster() {
  const context = React.useContext(RosterContext)
  if (!context) {
    throw new Error("useRoster must be used within a RosterProvider")
  }
  return context
}

export function useCurrentEmployee(): Employee | undefined {
  const { auth, state } = useRoster()
  if (!auth) return undefined
  const id = auth.role === "admin" ? EMPLOYEE_PERSONA_ID : auth.userId
  return state.employees.find((e) => e.id === id)
}
