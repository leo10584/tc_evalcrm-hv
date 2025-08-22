import { AppLayout } from "@/components/layout/app-layout"
import { PipelineBoard } from "@/components/pipeline/pipeline-board"
import { PipelineFilters } from "@/components/pipeline/pipeline-filters"

export default function Pipeline() {
  return (
    <AppLayout resource="pipeline">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Sales Pipeline</h1>
          <PipelineFilters />
        </div>
        <PipelineBoard />
      </div>
    </AppLayout>
  )
}
