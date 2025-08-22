import { AppLayout } from "@/components/layout/app-layout"
import { ReportCards } from "@/components/reports/report-cards"
import { CohortAnalysis } from "@/components/reports/cohort-analysis"
import { SourceAttributionChart } from "@/components/reports/source-attribution-chart"
import { RevenueAnalysis } from "@/components/reports/revenue-analysis"

export default function Reports() {
  return (
    <AppLayout resource="reports">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <div className="text-sm text-muted-foreground">Data as of {new Date().toLocaleDateString("en-IN")}</div>
        </div>

        <ReportCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CohortAnalysis />
          <SourceAttributionChart />
        </div>

        <RevenueAnalysis />
      </div>
    </AppLayout>
  )
}
