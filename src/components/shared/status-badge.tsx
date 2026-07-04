import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type Tone = "neutral" | "success" | "warning" | "danger" | "info"

const toneClasses: Record<Tone, string> = {
  neutral: "border-border bg-muted text-muted-foreground",
  success:
    "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  warning:
    "border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-300",
  danger:
    "border-transparent bg-red-500/15 text-red-700 dark:text-red-300",
  info: "border-transparent bg-primary/12 text-primary",
}

export function StatusBadge({
  label,
  tone = "neutral",
  className,
}: {
  label: string
  tone?: Tone
  className?: string
}) {
  return (
    <Badge variant="outline" className={cn(toneClasses[tone], className)}>
      {label}
    </Badge>
  )
}
