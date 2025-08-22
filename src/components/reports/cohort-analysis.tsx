"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const cohortData = [
  { month: "Jan", newCustomers: 12, revenue: 1567890, retention: 95 },
  { month: "Feb", newCustomers: 18, revenue: 2234567, retention: 92 },
  { month: "Mar", newCustomers: 15, revenue: 1890123, retention: 88 },
  { month: "Apr", newCustomers: 22, revenue: 2789456, retention: 85 },
  { month: "May", newCustomers: 28, revenue: 3456789, retention: 90 },
  { month: "Jun", newCustomers: 25, revenue: 3123456, retention: 87 },
]

export function CohortAnalysis() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cohort Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cohortData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "revenue") {
                    return [formatCurrency(value as number), "Revenue"]
                  }
                  if (name === "retention") {
                    return [`${value}%`, "Retention"]
                  }
                  return [value, "New Customers"]
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="newCustomers"
                stroke="#3b82f6"
                strokeWidth={2}
                name="New Customers"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="retention"
                stroke="#10b981"
                strokeWidth={2}
                name="Retention %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
