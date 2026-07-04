import * as React from "react"
import { ShieldCheck, SquareStack, UserCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ADMIN_CREDENTIALS,
  EMPLOYEE_CREDENTIALS,
} from "@/data/seed"
import { useDocumentTitle } from "@/lib/use-document-title"
import { useRoster } from "@/store/roster-provider"

export function LoginPage() {
  const { login, loginWithCredentials } = useRoster()
  useDocumentTitle("Sign in")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!loginWithCredentials(email, password)) {
      setError("Invalid credentials. Use one of the demo logins below.")
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center bg-primary-foreground/15">
            <SquareStack className="size-4" />
          </div>
          <span className="font-heading text-lg font-semibold">Roster</span>
        </div>
        <div className="space-y-4">
          <h1 className="font-heading text-3xl font-semibold leading-tight">
            One place for the entire employee lifecycle.
          </h1>
          <p className="max-w-md text-sm text-primary-foreground/80">
            Directory, payroll, benefits, recruiting, performance, learning and
            compliance — a full clickable MVP to explore how every module
            connects.
          </p>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>14 connected modules across two roles</li>
            <li>Run mock payroll, approve leave, sign policies</li>
            <li>Nothing persists — a safe sandbox to click through</li>
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/60">
          An MVP preview of the Roster platform.
        </p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-5">
          <div className="space-y-1 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center bg-primary text-primary-foreground">
                <SquareStack className="size-4" />
              </div>
              <span className="font-heading text-lg font-semibold">Roster</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sign in</CardTitle>
              <CardDescription>
                Use a demo login or the one-click role toggle.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@roster.io"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error ? (
                  <p className="text-xs text-destructive">{error}</p>
                ) : null}
                <Button type="submit" className="w-full" size="lg">
                  Sign in
                </Button>
              </form>

              <div className="relative py-1 text-center">
                <span className="bg-card px-2 text-[10px] tracking-wider text-muted-foreground uppercase">
                  or log in as
                </span>
              </div>

              <div className="grid gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  className="justify-start"
                  onClick={() => login("admin")}
                >
                  <ShieldCheck />
                  HR Manager / Boss
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="justify-start"
                  onClick={() => login("employee")}
                >
                  <UserCircle />
                  Employee (Aisha Bello)
                </Button>
              </div>

              <div className="space-y-1 border-t border-border pt-3 text-[11px] text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Admin:</span>{" "}
                  {ADMIN_CREDENTIALS.email} / {ADMIN_CREDENTIALS.password}
                </p>
                <p>
                  <span className="font-medium text-foreground">Employee:</span>{" "}
                  {EMPLOYEE_CREDENTIALS.email} / {EMPLOYEE_CREDENTIALS.password}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
