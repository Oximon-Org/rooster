import * as React from "react"

import { AppShell } from "@/components/layout/app-shell"
import { LandingPage } from "@/pages/landing-page"
import { LoginPage } from "@/pages/login-page"
import { AdminAttendancePage } from "@/pages/admin/attendance-page"
import { AdminBenefitsPage } from "@/pages/admin/benefits-page"
import { AdminCompliancePage } from "@/pages/admin/compliance-page"
import { AdminDirectoryPage } from "@/pages/admin/directory-page"
import { AdminLearningPage } from "@/pages/admin/learning-page"
import { AdminOnboardingPage } from "@/pages/admin/onboarding-page"
import { AdminPayrollPage } from "@/pages/admin/payroll-page"
import { AdminPerformancePage } from "@/pages/admin/performance-page"
import { AdminProfilePage } from "@/pages/admin/profile-page"
import { AdminRecruitingPage } from "@/pages/admin/recruiting-page"
import { AdminReportsPage } from "@/pages/admin/reports-page"
import { AdminTaxPage } from "@/pages/admin/tax-page"
import { AdminTimeOffPage } from "@/pages/admin/timeoff-page"
import { EmployeeAttendancePage } from "@/pages/employee/attendance-page"
import { EmployeeBenefitsPage } from "@/pages/employee/benefits-page"
import { EmployeeDirectoryPage } from "@/pages/employee/directory-page"
import { EmployeeDocumentsPage } from "@/pages/employee/documents-page"
import { EmployeeGoalsPage } from "@/pages/employee/goals-page"
import { EmployeeLearningPage } from "@/pages/employee/learning-page"
import { EmployeeOnboardingPage } from "@/pages/employee/onboarding-page"
import { EmployeePayPage } from "@/pages/employee/pay-page"
import { EmployeeProfilePage } from "@/pages/employee/profile-page"
import { EmployeeTaxPage } from "@/pages/employee/tax-page"
import { EmployeeTimeOffPage } from "@/pages/employee/timeoff-page"
import { useRoster, type RouteName } from "@/store/roster-provider"

const ADMIN_PAGES: Partial<Record<RouteName, React.ComponentType>> = {
  directory: AdminDirectoryPage,
  profile: AdminProfilePage,
  attendance: AdminAttendancePage,
  timeoff: AdminTimeOffPage,
  payroll: AdminPayrollPage,
  tax: AdminTaxPage,
  benefits: AdminBenefitsPage,
  recruiting: AdminRecruitingPage,
  onboarding: AdminOnboardingPage,
  performance: AdminPerformancePage,
  learning: AdminLearningPage,
  reports: AdminReportsPage,
  compliance: AdminCompliancePage,
}

const EMPLOYEE_PAGES: Partial<Record<RouteName, React.ComponentType>> = {
  profile: EmployeeProfilePage,
  attendance: EmployeeAttendancePage,
  timeoff: EmployeeTimeOffPage,
  pay: EmployeePayPage,
  tax: EmployeeTaxPage,
  benefits: EmployeeBenefitsPage,
  onboarding: EmployeeOnboardingPage,
  goals: EmployeeGoalsPage,
  learning: EmployeeLearningPage,
  documents: EmployeeDocumentsPage,
  directory: EmployeeDirectoryPage,
}

export function App() {
  const { auth, route } = useRoster()
  const [showLogin, setShowLogin] = React.useState(false)

  if (!auth) {
    return showLogin ? (
      <LoginPage />
    ) : (
      <LandingPage onEnter={() => setShowLogin(true)} />
    )
  }

  const pages = auth.role === "admin" ? ADMIN_PAGES : EMPLOYEE_PAGES
  const fallback = auth.role === "admin" ? AdminDirectoryPage : EmployeeProfilePage
  const Page = pages[route.name] ?? fallback

  return (
    <AppShell>
      <Page />
    </AppShell>
  )
}

export default App
