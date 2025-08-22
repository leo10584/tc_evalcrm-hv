import { AppLayout } from "@/components/layout/app-layout"
import { OpportunityHeader } from "@/components/opportunities/opportunity-header"
import { Timeline } from "@/components/shared/timeline"
import { ActivityList } from "@/components/shared/activity-list"
import { EmailThread } from "@/components/shared/email-thread"

interface OpportunityPageProps {
  params: {
    id: string
  }
}

export default function OpportunityPage({ params }: OpportunityPageProps) {
  return (
    <AppLayout resource="pipeline">
      <div className="max-w-6xl mx-auto space-y-6">
        <OpportunityHeader opportunityId={params.id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Timeline entityType="opportunity" entityId={params.id} />
            <EmailThread entityType="opportunity" entityId={params.id} />
          </div>

          <div>
            <ActivityList entityType="opportunity" entityId={params.id} />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
