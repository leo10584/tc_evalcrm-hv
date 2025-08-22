"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Receipt, Mail, PenTool } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "rfp",
    title: "New RFP created for Apollo Hospitals",
    description: "Healthcare management system implementation",
    time: "2 hours ago",
    icon: FileText,
    status: "new",
  },
  {
    id: 2,
    type: "quote",
    title: "Quote sent to Fortis Healthcare",
    description: "₹15,67,890 - EHR integration project",
    time: "4 hours ago",
    icon: Receipt,
    status: "sent",
  },
  {
    id: 3,
    type: "email",
    title: "Follow-up email sent",
    description: "Max Healthcare - Telemedicine platform",
    time: "6 hours ago",
    icon: Mail,
    status: "sent",
  },
  {
    id: 4,
    type: "signature",
    title: "Contract signed",
    description: "Manipal Hospitals - ₹23,45,678",
    time: "1 day ago",
    icon: PenTool,
    status: "completed",
  },
]

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  sent: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                  <Badge variant="secondary" className={statusColors[activity.status as keyof typeof statusColors]}>
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
