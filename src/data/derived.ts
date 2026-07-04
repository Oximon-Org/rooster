import type {
  AppState,
  ComplianceDocument,
  Course,
  Employee,
} from "@/data/types"

export function employeeName(state: AppState, id: string): string {
  return state.employees.find((e) => e.id === id)?.name ?? id
}

export function departmentCounts(employees: Employee[]): {
  department: string
  count: number
}[] {
  const map = new Map<string, number>()
  for (const e of employees) {
    map.set(e.department, (map.get(e.department) ?? 0) + 1)
  }
  return Array.from(map.entries())
    .map(([department, count]) => ({ department, count }))
    .sort((a, b) => b.count - a.count)
}

export function departmentCost(employees: Employee[]): {
  department: string
  cost: number
}[] {
  const map = new Map<string, number>()
  for (const e of employees) {
    map.set(e.department, (map.get(e.department) ?? 0) + e.annualSalary)
  }
  return Array.from(map.entries())
    .map(([department, cost]) => ({ department, cost }))
    .sort((a, b) => b.cost - a.cost)
}

export function courseCompletion(
  state: AppState,
  course: Course
): { assigned: number; completed: number; rate: number } {
  let assigned = 0
  let completed = 0
  for (const e of state.employees) {
    const training = e.trainings.find((t) => t.courseId === course.id)
    if (!training) continue
    assigned += 1
    if (training.status === "Completed") completed += 1
  }
  return {
    assigned,
    completed,
    rate: assigned === 0 ? 0 : (completed / assigned) * 100,
  }
}

export function documentSignatureSummary(doc: ComplianceDocument): {
  signed: number
  total: number
} {
  const total = doc.signatures.length
  const signed = doc.signatures.filter((s) => s.signed).length
  return { signed, total }
}

export function checklistProgress(items: { done: boolean }[]): number {
  if (items.length === 0) return 0
  return (items.filter((i) => i.done).length / items.length) * 100
}
