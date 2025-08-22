"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Calculator } from "lucide-react"
import { TaxEditor } from "./tax-editor"
import { ApprovalDrawer } from "./approval-drawer"
import { useCreateQuote } from "@/hooks/use-api"

const lineItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Unit price must be positive"),
  taxable: z.boolean().default(true),
})

const quoteSchema = z.object({
  opportunityId: z.string().min(1, "Opportunity is required"),
  templateId: z.string().optional(),
  lineItems: z.array(lineItemSchema).min(1, "At least one line item is required"),
  gstDetails: z.object({
    gstNumber: z.string().optional(),
    placeOfSupply: z.string().min(1, "Place of supply is required"),
    cgst: z.number().min(0),
    sgst: z.number().min(0),
    igst: z.number().min(0),
    totalGst: z.number().min(0),
  }),
  approvalRequired: z.boolean().default(false),
})

type QuoteFormData = z.infer<typeof quoteSchema>

const mockOpportunities = [
  { id: "1", name: "Apollo Hospitals - EHR System", accountName: "Apollo Hospitals" },
  { id: "2", name: "Fortis Healthcare - Telemedicine", accountName: "Fortis Healthcare" },
  { id: "3", name: "Max Healthcare - Analytics Platform", accountName: "Max Healthcare" },
]

const quoteTemplates = [
  { id: "standard", name: "Standard Healthcare Solution" },
  { id: "enterprise", name: "Enterprise Implementation" },
  { id: "integration", name: "System Integration" },
  { id: "custom", name: "Custom Development" },
]

export function QuoteBuilder() {
  const router = useRouter()
  const [showApprovalDrawer, setShowApprovalDrawer] = useState(false)
  const createQuoteMutation = useCreateQuote()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      lineItems: [{ description: "", quantity: 1, unitPrice: 0, taxable: true }],
      gstDetails: {
        cgst: 9,
        sgst: 9,
        igst: 0,
        totalGst: 18,
        placeOfSupply: "Delhi",
      },
      approvalRequired: false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  })

  const lineItems = watch("lineItems")
  const gstDetails = watch("gstDetails")

  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => {
      const total = (item.quantity || 0) * (item.unitPrice || 0)
      return sum + total
    }, 0)
  }

  const calculateTaxableAmount = () => {
    return lineItems.reduce((sum, item) => {
      if (item.taxable) {
        const total = (item.quantity || 0) * (item.unitPrice || 0)
        return sum + total
      }
      return sum
    }, 0)
  }

  const calculateTotalGST = () => {
    const taxableAmount = calculateTaxableAmount()
    return (taxableAmount * (gstDetails.totalGst || 0)) / 100
  }

  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateTotalGST()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const onSubmit = async (data: QuoteFormData) => {
    try {
      // Calculate totals before submission
      const subtotal = calculateSubtotal()
      const totalGstAmount = calculateTotalGST()
      const totalAmount = calculateGrandTotal()

      const quoteData = {
        ...data,
        subtotal,
        totalAmount,
        gstDetails: {
          ...data.gstDetails,
          totalGst: totalGstAmount,
        },
      }

      const result = await createQuoteMutation.mutateAsync(quoteData)
      if (result.data) {
        router.push(`/quotes/${result.data.id}`)
      }
    } catch (error) {
      console.error("Failed to create quote:", error)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Quote Header */}
        <Card>
          <CardHeader>
            <CardTitle>Quote Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="opportunityId">Opportunity *</Label>
                <Select onValueChange={(value) => setValue("opportunityId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select opportunity" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockOpportunities.map((opp) => (
                      <SelectItem key={opp.id} value={opp.id}>
                        {opp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.opportunityId && <p className="text-sm text-destructive">{errors.opportunityId.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateId">Quote Template</Label>
                <Select onValueChange={(value) => setValue("templateId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {quoteTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Line Items</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ description: "", quantity: 1, unitPrice: 0, taxable: true })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-5">
                    <Label htmlFor={`lineItems.${index}.description`}>Description</Label>
                    <Textarea
                      {...register(`lineItems.${index}.description`)}
                      placeholder="Item description..."
                      rows={2}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor={`lineItems.${index}.quantity`}>Quantity</Label>
                    <Input
                      type="number"
                      {...register(`lineItems.${index}.quantity`, { valueAsNumber: true })}
                      min="1"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor={`lineItems.${index}.unitPrice`}>Unit Price (₹)</Label>
                    <Input
                      type="number"
                      {...register(`lineItems.${index}.unitPrice`, { valueAsNumber: true })}
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Total</Label>
                    <div className="h-10 flex items-center text-sm font-medium">
                      {formatCurrency((lineItems[index]?.quantity || 0) * (lineItems[index]?.unitPrice || 0))}
                    </div>
                  </div>

                  <div className="col-span-1 flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox {...register(`lineItems.${index}.taxable`)} id={`taxable-${index}`} />
                      <Label htmlFor={`taxable-${index}`} className="text-xs">
                        Taxable
                      </Label>
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* GST Details */}
        <TaxEditor
          gstDetails={gstDetails}
          onGstDetailsChange={(details) => setValue("gstDetails", details)}
          taxableAmount={calculateTaxableAmount()}
        />

        {/* Quote Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>Quote Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{formatCurrency(calculateSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxable Amount:</span>
                <span>{formatCurrency(calculateTaxableAmount())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total GST ({gstDetails.totalGst}%):</span>
                <span>{formatCurrency(calculateTotalGST())}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total:</span>
                  <span>{formatCurrency(calculateGrandTotal())}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Approval Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                {...register("approvalRequired")}
                id="approvalRequired"
                onCheckedChange={(checked) => {
                  setValue("approvalRequired", !!checked)
                  if (checked) {
                    setShowApprovalDrawer(true)
                  }
                }}
              />
              <Label htmlFor="approvalRequired">This quote requires approval</Label>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={createQuoteMutation.isPending}>
            {createQuoteMutation.isPending ? "Creating..." : "Create Quote"}
          </Button>
        </div>
      </form>

      <ApprovalDrawer
        open={showApprovalDrawer}
        onOpenChange={setShowApprovalDrawer}
        quoteAmount={calculateGrandTotal()}
      />
    </div>
  )
}
