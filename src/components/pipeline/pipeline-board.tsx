"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IndianRupee, Calendar, User, Building } from "lucide-react"

const stages = [
  { id: "lead", name: "Lead", color: "bg-blue-500" },
  { id: "qualified", name: "Qualified", color: "bg-yellow-500" },
  { id: "proposal", name: "Proposal", color: "bg-orange-500" },
  { id: "negotiation", name: "Negotiation", color: "bg-purple-500" },
  { id: "closed_won", name: "Closed Won", color: "bg-green-500" },
]

const mockOpportunities = [
  {
    id: "1",
    name: "Apollo Hospitals - EHR System",
    accountName: "Apollo Hospitals",
    value: 2567890,
    stage: "lead",
    owner: "John Doe",
    closeDate: "2024-03-15",
    vertical: "Hospitals",
  },
  {
    id: "2",
    name: "Fortis Healthcare - Telemedicine",
    accountName: "Fortis Healthcare",
    value: 1567890,
    stage: "qualified",
    owner: "Jane Smith",
    closeDate: "2024-02-28",
    vertical: "Hospitals",
  },
  {
    id: "3",
    name: "Max Healthcare - Analytics Platform",
    accountName: "Max Healthcare",
    value: 3456789,
    stage: "proposal",
    owner: "Mike Johnson",
    closeDate: "2024-04-10",
    vertical: "Hospitals",
  },
  {
    id: "4",
    name: "Manipal Hospitals - Integration",
    accountName: "Manipal Hospitals",
    value: 2345678,
    stage: "negotiation",
    owner: "Sarah Wilson",
    closeDate: "2024-02-20",
    vertical: "Hospitals",
  },
  {
    id: "5",
    name: "AIIMS - Research Platform",
    accountName: "AIIMS",
    value: 4567890,
    stage: "closed_won",
    owner: "David Brown",
    closeDate: "2024-01-30",
    vertical: "Hospitals",
  },
]

export function PipelineBoard() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getOpportunitiesByStage = (stageId: string) => {
    return mockOpportunities.filter((opp) => opp.stage === stageId)
  }

  const getStageTotal = (stageId: string) => {
    return getOpportunitiesByStage(stageId).reduce((sum, opp) => sum + opp.value, 0)
  }

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {stages.map((stage) => {
        const opportunities = getOpportunitiesByStage(stage.id)
        const stageTotal = getStageTotal(stage.id)

        return (
          <div key={stage.id} className="flex-shrink-0 w-80">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                  <h3 className="font-semibold text-foreground">{stage.name}</h3>
                  <Badge variant="secondary">{opportunities.length}</Badge>
                </div>
                <div className="text-sm font-medium text-muted-foreground">{formatCurrency(stageTotal)}</div>
              </div>
            </div>

            <div className="space-y-3">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium leading-tight">{opportunity.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Building className="h-3 w-3" />
                      <span>{opportunity.accountName}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm font-medium text-foreground">
                      <IndianRupee className="h-3 w-3" />
                      <span>{formatCurrency(opportunity.value)}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{opportunity.owner}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(opportunity.closeDate).toLocaleDateString("en-IN")}</span>
                      </div>
                    </div>

                    <Badge variant="outline" className="text-xs">
                      {opportunity.vertical}
                    </Badge>
                  </CardContent>
                </Card>
              ))}

              {opportunities.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No opportunities in this stage</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
