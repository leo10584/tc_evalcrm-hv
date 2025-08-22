"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const stages = [
  { name: "Lead", count: 15, value: "₹45,67,890", color: "bg-blue-500" },
  { name: "Qualified", count: 12, value: "₹67,89,123", color: "bg-yellow-500" },
  { name: "Proposal", count: 8, value: "₹89,12,345", color: "bg-orange-500" },
  { name: "Negotiation", count: 5, value: "₹34,56,789", color: "bg-purple-500" },
  { name: "Closed Won", count: 7, value: "₹78,90,123", color: "bg-green-500" },
]

export function PipelineOverview() {
  const totalValue = stages.reduce((sum, stage) => {
    const value = Number.parseInt(stage.value.replace(/[₹,]/g, ""))
    return sum + value
  }, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stages.map((stage) => {
          const value = Number.parseInt(stage.value.replace(/[₹,]/g, ""))
          const percentage = (value / totalValue) * 100

          return (
            <div key={stage.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                  <span className="font-medium">{stage.name}</span>
                  <span className="text-muted-foreground">({stage.count})</span>
                </div>
                <span className="font-medium">{stage.value}</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
