"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface OpportunityHeaderProps {
  opportunityId: string
}

// Mock data - in real app, this would come from API
const mockOpportunity = {
  id: "OPP-2024-001",
  name: "Apollo Hospitals - EHR System",
  accountName: "Apollo Hospitals",
  stage: "proposal",
  value: 2567890,
  owner: "John Doe",
  closeDate: "2024-03-15",
  createdAt: "2024-01-10T10:30:00Z",
  probability: 75,
}

export function OpportunityHeader({ opportunityId }: OpportunityHeaderProps) {
  const router = useRouter()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "lead":
        return "bg-blue-100 text-blue-800"
      case "qualified":
        return "bg-yellow-100 text-yellow-800"
      case "proposal":
        return "bg-orange-100 text-orange-800"
      case "negotiation":
        return "bg-purple-100 text-purple-800"
      case "closed_won":
        return "bg-green-100 text-green-800"
      case "closed_lost":
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
          Back to Pipeline
        </Button>

        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-foreground">{mockOpportunity.name}</h1>
            <Badge variant="secondary" className={getStageColor(mockOpportunity.stage)}>
              {mockOpportunity.stage.replace("_", " ")}
            </Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
            <span>{mockOpportunity.accountName}</span>
            <span>•</span>
            <span>{formatCurrency(mockOpportunity.value)}</span>
            <span>•</span>
            <span>{mockOpportunity.probability}% probability</span>
            <span>•</span>
            <span>Owner: {mockOpportunity.owner}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Create Quote</DropdownMenuItem>
            <DropdownMenuItem>Schedule Meeting</DropdownMenuItem>
            <DropdownMenuItem>Add Note</DropdownMenuItem>
            <DropdownMenuItem>View Audit Trail</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
