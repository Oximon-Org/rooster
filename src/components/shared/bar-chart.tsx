import { cn } from "@/lib/utils"

export interface BarDatum {
  label: string
  value: number
  caption?: string
}

export function BarChart({
  data,
  orientation = "vertical",
  valueFormatter,
  className,
}: {
  data: BarDatum[]
  orientation?: "vertical" | "horizontal"
  valueFormatter?: (value: number) => string
  className?: string
}) {
  const max = Math.max(...data.map((d) => d.value), 1)
  const format = valueFormatter ?? ((v: number) => String(v))

  if (orientation === "horizontal") {
    return (
      <div className={cn("space-y-3", className)}>
        {data.map((d) => (
          <div key={d.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">{d.label}</span>
              <span className="text-muted-foreground">{format(d.value)}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("flex items-end gap-3", className)}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-40 w-full items-end justify-center">
            <div
              className="w-full max-w-10 bg-primary transition-all"
              style={{ height: `${Math.max((d.value / max) * 100, 4)}%` }}
              title={format(d.value)}
            />
          </div>
          <div className="text-center">
            <p className="text-xs font-medium">{d.label}</p>
            {d.caption ? (
              <p className="text-[10px] text-muted-foreground">{d.caption}</p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
