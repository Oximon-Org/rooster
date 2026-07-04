import {
  BarChart3,
  Briefcase,
  CalendarClock,
  CalendarDays,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HeartPulse,
  LayoutList,
  Receipt,
  ShieldCheck,
  Target,
  UserCircle,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import type { RouteName } from "@/store/roster-provider"

export interface NavItem {
  name: RouteName
  label: string
  icon: LucideIcon
  section: string
}

export const ADMIN_NAV: NavItem[] = [
  { name: "directory", label: "Directory", icon: Users, section: "People" },
  {
    name: "attendance",
    label: "Time & Attendance",
    icon: CalendarClock,
    section: "People",
  },
  {
    name: "timeoff",
    label: "Leave & Time-off",
    icon: CalendarDays,
    section: "People",
  },
  { name: "payroll", label: "Payroll", icon: Wallet, section: "Money" },
  {
    name: "tax",
    label: "Tax & Deductions",
    icon: Receipt,
    section: "Money",
  },
  {
    name: "benefits",
    label: "Benefits",
    icon: HeartPulse,
    section: "Money",
  },
  {
    name: "recruiting",
    label: "Recruiting",
    icon: Briefcase,
    section: "Talent",
  },
  {
    name: "onboarding",
    label: "On / Offboarding",
    icon: ClipboardCheck,
    section: "Talent",
  },
  {
    name: "performance",
    label: "Performance",
    icon: Target,
    section: "Talent",
  },
  {
    name: "learning",
    label: "Learning",
    icon: GraduationCap,
    section: "Talent",
  },
  {
    name: "reports",
    label: "Reports",
    icon: BarChart3,
    section: "Insights",
  },
  {
    name: "compliance",
    label: "Compliance",
    icon: ShieldCheck,
    section: "Insights",
  },
]

export const EMPLOYEE_NAV: NavItem[] = [
  { name: "profile", label: "My Profile", icon: UserCircle, section: "Me" },
  {
    name: "attendance",
    label: "My Attendance",
    icon: CalendarClock,
    section: "Me",
  },
  { name: "timeoff", label: "My Time Off", icon: CalendarDays, section: "Me" },
  { name: "pay", label: "My Pay", icon: Wallet, section: "Money" },
  { name: "tax", label: "My Tax", icon: Receipt, section: "Money" },
  { name: "benefits", label: "My Benefits", icon: HeartPulse, section: "Money" },
  {
    name: "onboarding",
    label: "My Onboarding",
    icon: ClipboardCheck,
    section: "Growth",
  },
  { name: "goals", label: "My Goals & Review", icon: Target, section: "Growth" },
  {
    name: "learning",
    label: "My Learning",
    icon: GraduationCap,
    section: "Growth",
  },
  {
    name: "documents",
    label: "My Documents",
    icon: FileText,
    section: "Growth",
  },
  {
    name: "directory",
    label: "Directory",
    icon: LayoutList,
    section: "Company",
  },
]
