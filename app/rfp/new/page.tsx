import { AppLayout } from "@/components/layout/app-layout"
import { RFPWizard } from "@/components/rfp/rfp-wizard"

export default function NewRFP() {
  return (
    <AppLayout resource="rfp">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Create New RFP</h1>
          <p className="text-muted-foreground mt-2">
            Capture RFP details and automatically create an opportunity in your pipeline.
          </p>
        </div>
        <RFPWizard />
      </div>
    </AppLayout>
  )
}
