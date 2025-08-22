"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const sourceData = [
  { source: "Website", leads: 45, conversions: 12, revenue: 1567890 },
  { source: "Referrals", leads: 32, conversions: 18, revenue: 2234567 },
  { source: "Cold Outreach", leads: 28, conversions: 8, revenue: 890123 },
  { source: "Events", leads: 15, conversions: 6, revenue: 678901 },
  { source: "Partners", leads: 12, conversions: 4, revenue: 456789 },
  { source: "Social Media", leads: 8, conversions: 2, revenue: 234567 },
]

export function SourceAttributionChart() {
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
        <CardTitle>Lead Source Attribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "revenue") {
                    return [formatCurrency(value as number), "Revenue"]
                  }
                  return [value, name === "leads" ? "Leads" : "Conversions"]
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="leads" fill="#3b82f6" name="Leads" />
              <Bar yAxisId="left" dataKey="conversions" fill="#10b981" name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
