import { ClipboardCheck, DoorOpen, UserMinus } from "lucide-react"

import { Checklist } from "@/components/shared/checklist"
import { EmptyState } from "@/components/shared/empty-state"
import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { checklistProgress, employeeName } from "@/data/derived"
import { formatDate, percent } from "@/lib/format"
import { useRoster } from "@/store/roster-provider"
import * as React from "react"

export function AdminOnboardingPage() {
  const { state, actions } = useRoster()
  const [offboardTarget, setOffboardTarget] = React.useState("")

  const onboardingIds = Object.keys(state.onboardingChecklists)
  const eligibleForOffboarding = state.employees.filter(
    (e) =>
      e.status === "Active" &&
      !state.offboardingCases.some((c) => c.employeeId === e.id)
  )

  return (
    <>
      <PageHeader
        title="Onboarding & offboarding"
        description="Track new-hire checklists and run the offboarding lifecycle end-to-end."
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          label="In onboarding"
          value={onboardingIds.length}
          icon={ClipboardCheck}
          accent
        />
        <StatCard
          label="In offboarding"
          value={state.offboardingCases.length}
          icon={DoorOpen}
        />
        <StatCard
          label="Active employees"
          value={state.employees.filter((e) => e.status === "Active").length}
          icon={UserMinus}
        />
      </div>

      <Tabs defaultValue="onboarding">
        <TabsList>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="offboarding">Offboarding</TabsTrigger>
        </TabsList>

        <TabsContent value="onboarding" className="space-y-4 pt-2">
          {onboardingIds.length === 0 ? (
            <EmptyState
              icon={ClipboardCheck}
              title="No one is onboarding"
              description="New hires with an active checklist will appear here."
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {onboardingIds.map((id) => {
                const items = state.onboardingChecklists[id]
                return (
                  <Card key={id}>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        {employeeName(state, id)}
                      </CardTitle>
                      <CardDescription>
                        {percent(checklistProgress(items))} complete
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Checklist
                        items={items}
                        onToggle={(itemId) =>
                          actions.toggleOnboardingItem(id, itemId)
                        }
                      />
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="offboarding" className="space-y-4 pt-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Start offboarding</CardTitle>
              <CardDescription>
                Generates an offboarding checklist to track the exit process.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-end gap-2">
              <div className="w-full max-w-xs">
                <Select
                  value={offboardTarget}
                  onValueChange={(v) => setOffboardTarget(v as string)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {eligibleForOffboarding.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                disabled={!offboardTarget}
                onClick={() => {
                  actions.startOffboarding(offboardTarget)
                  setOffboardTarget("")
                }}
              >
                <DoorOpen />
                Start offboarding
              </Button>
            </CardContent>
          </Card>

          {state.offboardingCases.length === 0 ? (
            <EmptyState
              icon={DoorOpen}
              title="No active offboarding"
              description="Start an offboarding case above to generate its checklist."
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {state.offboardingCases.map((c) => (
                <Card key={c.employeeId}>
                  <CardHeader>
                    <CardTitle className="text-sm">
                      {employeeName(state, c.employeeId)}
                    </CardTitle>
                    <CardDescription>
                      Started {formatDate(c.startedOn)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Checklist
                      items={c.checklist}
                      onToggle={(itemId) =>
                        actions.toggleOffboardingItem(c.employeeId, itemId)
                      }
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  )
}
