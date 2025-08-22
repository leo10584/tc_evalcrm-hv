"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const revenueData = [
  { month: "Jan", actual: 1567890, forecast: 1500000, target: 1800000 },
  { month: "Feb", actual: 2234567, forecast: 2100000, target: 2200000 },
  { month: "Mar", actual: 1890123, forecast: 2000000, target: 2100000 },
  { month: "Apr", actual: 2789456, forecast: 2500000, target: 2400000 },
  { month: "May", actual: 3456789, forecast: 3200000, target: 3000000 },
  { month: "Jun", actual: 3123456, forecast: 3400000, target: 3200000 },
  { month: "Jul", actual: null, forecast: 3600000, target: 3400000 },
  { month: "Aug", actual: null, forecast: 3800000, target: 3600000 },
]

export function RevenueAnalysis() {
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
        <CardTitle>Revenue Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [formatCurrency(value as number), ""]} />
              <Legend />
              <Area
                type="monotone"
                dataKey="target"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.3}
                name="Target"
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stackId="2"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.5}
                name="Forecast"
              />
              <Area
                type="monotone"
                dataKey="actual"
                stackId="3"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.8}
                name="Actual"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
