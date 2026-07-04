import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { checklistProgress } from "@/data/derived"
import type { ChecklistItem } from "@/data/types"
import { percent } from "@/lib/format"
import { cn } from "@/lib/utils"

export function Checklist({
  items,
  onToggle,
  showProgress = true,
}: {
  items: ChecklistItem[]
  onToggle: (itemId: string) => void
  showProgress?: boolean
}) {
  const progress = checklistProgress(items)
  const done = items.filter((i) => i.done).length

  return (
    <div className="space-y-3">
      {showProgress ? (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {done} of {items.length} complete
            </span>
            <span className="font-medium">{percent(progress)}</span>
          </div>
          <Progress value={progress} />
        </div>
      ) : null}
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-center gap-2.5 border border-border px-3 py-2 transition-colors hover:bg-muted/50">
              <Checkbox
                checked={item.done}
                onCheckedChange={() => onToggle(item.id)}
              />
              <span
                className={cn(
                  "text-xs",
                  item.done && "text-muted-foreground line-through"
                )}
              >
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
