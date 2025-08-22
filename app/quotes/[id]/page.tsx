import { AppLayout } from "@/components/layout/app-layout"
import { QuoteHeader } from "@/components/quotes/quote-header"
import { QuoteDetails } from "@/components/quotes/quote-details"
import { QuoteActions } from "@/components/quotes/quote-actions"
import { ESignStatusCard } from "@/components/quotes/esign-status-card"

interface QuotePageProps {
  params: {
    id: string
  }
}

export default function QuotePage({ params }: QuotePageProps) {
  return (
    <AppLayout resource="quotes">
      <div className="max-w-6xl mx-auto space-y-6">
        <QuoteHeader quoteId={params.id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <QuoteDetails quoteId={params.id} />
          </div>

          <div className="space-y-6">
            <QuoteActions quoteId={params.id} />
            <ESignStatusCard quoteId={params.id} />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
