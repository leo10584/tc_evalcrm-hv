import { AppLayout } from "@/components/layout/app-layout"
import { AuditTrail } from "@/components/audit/audit-trail"
import { AuditFilters } from "@/components/audit/audit-filters"
import { AuditExport } from "@/components/audit/audit-export"

interface AuditPageProps {
  params: {
    entityType: string
    entityId: string
  }
}

export default function AuditPage({ params }: AuditPageProps) {
  const { entityType, entityId } = params

  return (
    <AppLayout resource="audit">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Audit Trail</h1>
            <p className="text-muted-foreground mt-2">
              Complete audit log for {entityType} {entityId}
            </p>
          </div>
          <AuditExport entityType={entityType} entityId={entityId} />
        </div>

        <AuditFilters entityType={entityType} entityId={entityId} />
        <AuditTrail entityType={entityType} entityId={entityId} />
      </div>
    </AppLayout>
  )
}
