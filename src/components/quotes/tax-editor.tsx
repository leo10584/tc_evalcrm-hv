"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface GSTDetails {
  cgst: number
  sgst: number
  igst: number
  totalGst: number
  gstNumber?: string
  placeOfSupply: string
}

interface TaxEditorProps {
  gstDetails: GSTDetails
  onGstDetailsChange: (details: GSTDetails) => void
  taxableAmount: number
}

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

const gstRates = [
  { rate: 0, label: "0% (Exempt)" },
  { rate: 5, label: "5%" },
  { rate: 12, label: "12%" },
  { rate: 18, label: "18%" },
  { rate: 28, label: "28%" },
]

export function TaxEditor({ gstDetails, onGstDetailsChange, taxableAmount }: TaxEditorProps) {
  const [companyState, setCompanyState] = useState("Delhi") // Assume company is in Delhi
  const [isInterState, setIsInterState] = useState(false)

  useEffect(() => {
    const interState = companyState !== gstDetails.placeOfSupply
    setIsInterState(interState)

    // Auto-calculate GST based on inter-state or intra-state
    if (interState) {
      // Inter-state: Use IGST
      onGstDetailsChange({
        ...gstDetails,
        cgst: 0,
        sgst: 0,
        igst: gstDetails.totalGst,
      })
    } else {
      // Intra-state: Split between CGST and SGST
      const halfRate = gstDetails.totalGst / 2
      onGstDetailsChange({
        ...gstDetails,
        cgst: halfRate,
        sgst: halfRate,
        igst: 0,
      })
    }
  }, [companyState]) // Removed gstDetails.placeOfSupply from dependencies

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const calculateGstAmount = (rate: number) => {
    return (taxableAmount * rate) / 100
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5" />
          <span>GST Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Place of Supply */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyState">Company State</Label>
            <Select value={companyState} onValueChange={setCompanyState}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="placeOfSupply">Place of Supply *</Label>
            <Select
              value={gstDetails.placeOfSupply}
              onValueChange={(value) =>
                onGstDetailsChange({
                  ...gstDetails,
                  placeOfSupply: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* GST Number */}
        <div className="space-y-2">
          <Label htmlFor="gstNumber">Customer GST Number (Optional)</Label>
          <Input
            id="gstNumber"
            value={gstDetails.gstNumber || ""}
            onChange={(e) =>
              onGstDetailsChange({
                ...gstDetails,
                gstNumber: e.target.value,
              })
            }
            placeholder="e.g., 07AABCU9603R1ZX"
            className="font-mono"
          />
        </div>

        {/* Tax Type Indicator */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            {isInterState ? (
              <span>
                <Badge variant="secondary" className="mr-2">
                  Inter-State
                </Badge>
                IGST will be applied as the supply is between different states.
              </span>
            ) : (
              <span>
                <Badge variant="secondary" className="mr-2">
                  Intra-State
                </Badge>
                CGST + SGST will be applied as the supply is within the same state.
              </span>
            )}
          </AlertDescription>
        </Alert>

        {/* GST Rate Selection */}
        <div className="space-y-2">
          <Label>GST Rate</Label>
          <div className="flex flex-wrap gap-2">
            {gstRates.map((rate) => (
              <Badge
                key={rate.rate}
                variant={gstDetails.totalGst === rate.rate ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() =>
                  onGstDetailsChange({
                    ...gstDetails,
                    totalGst: rate.rate,
                  })
                }
              >
                {rate.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* GST Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>CGST ({gstDetails.cgst}%)</Label>
            <div className="p-3 bg-muted rounded-md">
              <div className="text-sm text-muted-foreground">Central GST</div>
              <div className="font-medium">{formatCurrency(calculateGstAmount(gstDetails.cgst))}</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>SGST ({gstDetails.sgst}%)</Label>
            <div className="p-3 bg-muted rounded-md">
              <div className="text-sm text-muted-foreground">State GST</div>
              <div className="font-medium">{formatCurrency(calculateGstAmount(gstDetails.sgst))}</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>IGST ({gstDetails.igst}%)</Label>
            <div className="p-3 bg-muted rounded-md">
              <div className="text-sm text-muted-foreground">Integrated GST</div>
              <div className="font-medium">{formatCurrency(calculateGstAmount(gstDetails.igst))}</div>
            </div>
          </div>
        </div>

        {/* Total GST */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total GST Amount:</span>
            <span className="text-lg font-bold">{formatCurrency(calculateGstAmount(gstDetails.totalGst))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
