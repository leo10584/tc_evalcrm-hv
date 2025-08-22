"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface QuoteDetailsProps {
  quoteId: string
}

// Mock data - in real app, this would come from API
const mockQuoteDetails = {
  lineItems: [
    {
      id: "1",
      description: "Healthcare Management System - Core Platform",
      quantity: 1,
      unitPrice: 1500000,
      total: 1500000,
      taxable: true,
    },
    {
      id: "2",
      description: "Integration Services - 3rd Party Systems",
      quantity: 40,
      unitPrice: 15000,
      total: 600000,
      taxable: true,
    },
    {
      id: "3",
      description: "Training and Support - 6 months",
      quantity: 1,
      unitPrice: 300000,
      total: 300000,
      taxable: true,
    },
  ],
  gstDetails: {
    cgst: 9,
    sgst: 9,
    igst: 0,
    totalGst: 18,
    gstNumber: "07AABCU9603R1ZX",
    placeOfSupply: "Delhi",
  },
  subtotal: 2400000,
  totalGstAmount: 432000,
  totalAmount: 2832000,
}

export function QuoteDetails({ quoteId }: QuoteDetailsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quote Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Line Items */}
        <div className="space-y-4">
          <h3 className="font-semibold">Line Items</h3>
          <div className="space-y-3">
            {mockQuoteDetails.lineItems.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-center py-3 border-b last:border-b-0">
                <div className="col-span-6">
                  <p className="font-medium">{item.description}</p>
                  {item.taxable && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      Taxable
                    </Badge>
                  )}
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm text-muted-foreground">{formatCurrency(item.unitPrice)}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-medium">{formatCurrency(item.total)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* GST Breakdown */}
        <div className="space-y-4">
          <h3 className="font-semibold">GST Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Place of Supply:</span>
              <span className="ml-2 font-medium">{mockQuoteDetails.gstDetails.placeOfSupply}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Customer GST:</span>
              <span className="ml-2 font-medium font-mono">{mockQuoteDetails.gstDetails.gstNumber}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">CGST ({mockQuoteDetails.gstDetails.cgst}%)</div>
              <div className="font-medium">
                {formatCurrency((mockQuoteDetails.subtotal * mockQuoteDetails.gstDetails.cgst) / 100)}
              </div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">SGST ({mockQuoteDetails.gstDetails.sgst}%)</div>
              <div className="font-medium">
                {formatCurrency((mockQuoteDetails.subtotal * mockQuoteDetails.gstDetails.sgst) / 100)}
              </div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">IGST ({mockQuoteDetails.gstDetails.igst}%)</div>
              <div className="font-medium">
                {formatCurrency((mockQuoteDetails.subtotal * mockQuoteDetails.gstDetails.igst) / 100)}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{formatCurrency(mockQuoteDetails.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total GST ({mockQuoteDetails.gstDetails.totalGst}%):</span>
            <span>{formatCurrency(mockQuoteDetails.totalGstAmount)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Grand Total:</span>
            <span>{formatCurrency(mockQuoteDetails.totalAmount)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
