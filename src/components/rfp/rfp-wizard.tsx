"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { useCreateRFP } from "@/hooks/use-api"

const rfpSchema = z.object({
  accountName: z.string().min(1, "Account name is required"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  contactEmail: z.string().email("Valid email is required").optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  scopeItems: z.array(z.string()).min(1, "At least one scope item is required"),
})

type RFPFormData = z.infer<typeof rfpSchema>

export function RFPWizard() {
  const router = useRouter()
  const [scopeInput, setScopeInput] = useState("")
  const createRFPMutation = useCreateRFP()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RFPFormData>({
    resolver: zodResolver(rfpSchema),
    defaultValues: {
      scopeItems: [],
    },
  })

  const scopeItems = watch("scopeItems")

  const addScopeItem = () => {
    if (scopeInput.trim()) {
      const newItems = [...scopeItems, scopeInput.trim()]
      setValue("scopeItems", newItems)
      setScopeInput("")
    }
  }

  const removeScopeItem = (index: number) => {
    const newItems = scopeItems.filter((_, i) => i !== index)
    setValue("scopeItems", newItems)
  }

  const onSubmit = async (data: RFPFormData) => {
    try {
      const result = await createRFPMutation.mutateAsync(data)
      if (result.data) {
        router.push(`/opps/${result.data.opportunityId}`)
      }
    } catch (error) {
      console.error("Failed to create RFP:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>RFP Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name *</Label>
              <Input
                id="accountName"
                {...register("accountName")}
                placeholder="e.g., Apollo Hospitals"
                className={errors.accountName ? "border-destructive" : ""}
              />
              {errors.accountName && <p className="text-sm text-destructive">{errors.accountName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                {...register("contactEmail")}
                placeholder="contact@apollohospitals.com"
                className={errors.contactEmail ? "border-destructive" : ""}
              />
              {errors.contactEmail && <p className="text-sm text-destructive">{errors.contactEmail.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              {...register("contactPhone")}
              placeholder="+91 98765 43210"
              className={errors.contactPhone ? "border-destructive" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">RFP Summary *</Label>
            <Textarea
              id="summary"
              {...register("summary")}
              placeholder="Brief description of the RFP requirements..."
              rows={4}
              className={errors.summary ? "border-destructive" : ""}
            />
            {errors.summary && <p className="text-sm text-destructive">{errors.summary.message}</p>}
          </div>

          <div className="space-y-4">
            <Label>Scope Items *</Label>
            <div className="flex space-x-2">
              <Input
                value={scopeInput}
                onChange={(e) => setScopeInput(e.target.value)}
                placeholder="Add a scope item..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addScopeItem())}
              />
              <Button type="button" onClick={addScopeItem} variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {scopeItems.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {scopeItems.map((item, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeScopeItem(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {errors.scopeItems && <p className="text-sm text-destructive">{errors.scopeItems.message}</p>}
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={createRFPMutation.isPending}>
              {createRFPMutation.isPending ? "Creating..." : "Create RFP & Opportunity"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
