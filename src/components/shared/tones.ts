import type { Tone } from "@/components/shared/status-badge"

export function employeeStatusTone(status: string): Tone {
  switch (status) {
    case "Active":
      return "success"
    case "Onboarding":
      return "info"
    case "Offboarding":
      return "warning"
    case "Terminated":
      return "danger"
    default:
      return "neutral"
  }
}

export function leaveStatusTone(status: string): Tone {
  switch (status) {
    case "Approved":
      return "success"
    case "Pending":
      return "warning"
    case "Denied":
      return "danger"
    default:
      return "neutral"
  }
}

export function enrollmentTone(status: string): Tone {
  switch (status) {
    case "Enrolled":
      return "success"
    case "Pending":
      return "warning"
    case "Not enrolled":
      return "neutral"
    default:
      return "neutral"
  }
}

export function trainingTone(status: string): Tone {
  return status === "Completed" ? "success" : "warning"
}

export function reviewStatusTone(status: string): Tone {
  switch (status) {
    case "Manager review complete":
      return "success"
    case "Self-review submitted":
      return "info"
    case "Not started":
      return "neutral"
    default:
      return "neutral"
  }
}

export function attendanceTone(status: string): Tone {
  switch (status) {
    case "On time":
      return "success"
    case "Late":
      return "warning"
    case "Absent":
      return "danger"
    default:
      return "neutral"
  }
}

export function candidateTone(stage: string): Tone {
  switch (stage) {
    case "Hired":
      return "success"
    case "Offer":
      return "info"
    case "Interviewing":
      return "warning"
    case "Applied":
      return "neutral"
    default:
      return "neutral"
  }
}

export function jobStatusTone(status: string): Tone {
  switch (status) {
    case "Open":
      return "success"
    case "Draft":
      return "warning"
    case "Closed":
      return "neutral"
    default:
      return "neutral"
  }
}
