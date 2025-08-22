import { AppLayout } from "@/components/layout/app-layout"
import { DashboardKPIs } from "@/components/dashboard/dashboard-kpis"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { PipelineOverview } from "@/components/dashboard/pipeline-overview"
import { SourceAttribution } from "@/components/dashboard/source-attribution"

export default function Dashboard() {
  return (
    <AppLayout resource="dashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        <DashboardKPIs />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PipelineOverview />
          <SourceAttribution />
        </div>

        <RecentActivity />
      </div>
    </AppLayout>
  )
}
