import * as React from "react"
import { Menu, Moon, Sun, X } from "lucide-react"

import { ADMIN_NAV, EMPLOYEE_NAV } from "@/components/layout/nav-config"
import { Sidebar } from "@/components/layout/sidebar"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useDocumentTitle } from "@/lib/use-document-title"
import { useRoster } from "@/store/roster-provider"
import { useTheme } from "@/components/theme-provider"

export function AppShell({ children }: { children: React.ReactNode }) {
  const { auth, route } = useRoster()
  const { theme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const items = auth?.role === "admin" ? ADMIN_NAV : EMPLOYEE_NAV
  const current = items.find((item) => item.name === route.name)
  const pageLabel = current?.label ?? "Overview"

  useDocumentTitle(auth ? pageLabel : undefined)

  if (!auth) return null

  return (
    <div className="flex h-svh w-full overflow-hidden bg-background">
      <aside className="hidden w-60 shrink-0 border-r border-sidebar-border md:block">
        <Sidebar />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 border-r border-sidebar-border shadow-xl">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
            <Button
              variant="ghost"
              size="icon-sm"
              className="absolute top-3 right-3"
              onClick={() => setMobileOpen(false)}
            >
              <X />
            </Button>
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </Button>
            <div className="leading-tight">
              <p className="font-heading text-sm font-semibold">{pageLabel}</p>
              <p className="text-[10px] text-muted-foreground">
                {auth.role === "admin"
                  ? "Admin workspace"
                  : "Employee self-service"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge
              label={auth.role === "admin" ? "HR Manager" : "Employee"}
              tone={auth.role === "admin" ? "info" : "neutral"}
            />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="hidden dark:block" />
              <Moon className="block dark:hidden" />
            </Button>
          </div>
        </header>

        <main
          className={cn(
            "flex-1 overflow-y-auto",
            "px-4 py-5 sm:px-6 sm:py-6"
          )}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
