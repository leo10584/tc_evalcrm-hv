"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Share } from "lucide-react"
import { useRouter } from "next/navigation"

interface QuoteHeaderProps {
  quoteId: string
}

// Mock data - in real app, this would come from API
const mockQuote = {
  id: "QT-2024-001",
  opportunityName: "Apollo Hospitals - EHR System",
  accountName: "Apollo Hospitals",
  status: "draft",
  totalAmount: 2567890,
  createdAt: "2024-01-15T10:30:00Z",
  validUntil: "2024-02-15T23:59:59Z",
}

export function QuoteHeader({ quoteId }: QuoteHeaderProps) {
  const router = useRouter()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "signed":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-foreground">{mockQuote.id}</h1>
            <Badge variant="secondary" className={getStatusColor(mockQuote.status)}>
              {mockQuote.status}
            </Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
            <span>{mockQuote.opportunityName}</span>
            <span>•</span>
            <span>{formatCurrency(mockQuote.totalAmount)}</span>
            <span>•</span>
            <span>Valid until {new Date(mockQuote.validUntil).toLocaleDateString("en-IN")}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button variant="outline" size="sm">
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  )
}
