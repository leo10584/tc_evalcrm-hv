import { AppLayout } from "@/components/layout/app-layout"
import { QuoteBuilder } from "@/components/quotes/quote-builder"

export default function NewQuote() {
  return (
    <AppLayout resource="quotes">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Create New Quote</h1>
          <p className="text-muted-foreground mt-2">
            Build a comprehensive quote with line items, GST calculations, and approval workflow.
          </p>
        </div>
        <QuoteBuilder />
      </div>
    </AppLayout>
  )
}
