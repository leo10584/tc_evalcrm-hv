"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Target, IndianRupee, Award, Clock } from "lucide-react"

const reportMetrics = [
  {
    title: "Monthly Recurring Revenue",
    value: "₹45,67,890",
    change: "+18.2%",
    trend: "up",
    icon: IndianRupee,
    period: "vs last month",
  },
  {
    title: "New Customers",
    value: "23",
    change: "+12",
    trend: "up",
    icon: Users,
    period: "this month",
  },
  {
    title: "Conversion Rate",
    value: "24.5%",
    change: "+3.2%",
    trend: "up",
    icon: Target,
    period: "vs last month",
  },
  {
    title: "Average Deal Size",
    value: "₹18,45,670",
    change: "-5.1%",
    trend: "down",
    icon: Award,
    period: "vs last month",
  },
  {
    title: "Sales Cycle",
    value: "45 days",
    change: "-8 days",
    trend: "up",
    icon: Clock,
    period: "average",
  },
  {
    title: "Pipeline Value",
    value: "₹2,45,67,890",
    change: "+25.8%",
    trend: "up",
    icon: TrendingUp,
    period: "vs last month",
  },
]

export function ReportCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reportMetrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {metric.trend === "up" ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
              <span className="ml-1">{metric.period}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
