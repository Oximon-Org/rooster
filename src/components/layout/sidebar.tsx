import { LogOut, SquareStack } from "lucide-react"

import { ADMIN_NAV, EMPLOYEE_NAV, type NavItem } from "@/components/layout/nav-config"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { initials } from "@/lib/format"
import { cn } from "@/lib/utils"
import { useCurrentEmployee, useRoster } from "@/store/roster-provider"

function groupBySection(items: NavItem[]) {
  const map = new Map<string, NavItem[]>()
  for (const item of items) {
    const list = map.get(item.section) ?? []
    list.push(item)
    map.set(item.section, list)
  }
  return Array.from(map.entries())
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { auth, route, navigate, logout } = useRoster()
  const persona = useCurrentEmployee()
  if (!auth) return null

  const items = auth.role === "admin" ? ADMIN_NAV : EMPLOYEE_NAV
  const sections = groupBySection(items)
  const displayName = auth.role === "admin" ? "Elena Fischer" : persona?.name ?? "Employee"
  const displayRole = auth.role === "admin" ? "HR Manager / Boss" : persona?.title ?? "Employee"

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex size-7 items-center justify-center bg-primary text-primary-foreground">
          <SquareStack className="size-4" />
        </div>
        <div className="leading-none">
          <p className="font-heading text-sm font-semibold">Roster</p>
          <p className="text-[10px] text-muted-foreground">People platform</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {sections.map(([section, sectionItems]) => (
          <div key={section} className="mb-4">
            <p className="px-2 pb-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              {section}
            </p>
            <div className="space-y-0.5">
              {sectionItems.map((item) => {
                const active = route.name === item.name
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate({ name: item.name })
                      onNavigate?.()
                    }}
                    className={cn(
                      "flex w-full items-center gap-2.5 px-2 py-1.5 text-left text-xs font-medium transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-8">
            <AvatarFallback className="bg-primary/12 text-xs text-primary">
              {initials(displayName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-xs font-medium">{displayName}</p>
            <p className="truncate text-[10px] text-muted-foreground">
              {displayRole}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={logout}
            aria-label="Log out"
          >
            <LogOut />
          </Button>
        </div>
      </div>
    </div>
  )
}
