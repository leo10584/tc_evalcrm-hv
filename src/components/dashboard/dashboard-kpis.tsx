"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, FileText, Receipt, Target, IndianRupee } from "lucide-react"

const kpis = [
  {
    title: "Total Pipeline Value",
    value: "₹2,45,67,890",
    change: "+12.5%",
    trend: "up",
    icon: IndianRupee,
  },
  {
    title: "Active Opportunities",
    value: "47",
    change: "+8",
    trend: "up",
    icon: Target,
  },
  {
    title: "Quotes Sent",
    value: "23",
    change: "+5",
    trend: "up",
    icon: Receipt,
  },
  {
    title: "Win Rate",
    value: "68%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
  },
  {
    title: "Active RFPs",
    value: "12",
    change: "+3",
    trend: "up",
    icon: FileText,
  },
  {
    title: "New Accounts",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Users,
  },
]

export function DashboardKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {kpi.trend === "up" ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>{kpi.change}</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
