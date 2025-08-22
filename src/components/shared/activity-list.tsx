"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Receipt, Mail, Calendar } from "lucide-react"

interface ActivityListProps {
  entityType: "opportunity" | "quote"
  entityId: string
}

const quickActions = [
  { icon: Mail, label: "Send Email", action: "email" },
  { icon: Calendar, label: "Schedule Meeting", action: "meeting" },
  { icon: FileText, label: "Add Note", action: "note" },
  { icon: Receipt, label: "Create Quote", action: "quote" },
]

const recentActivities = [
  {
    id: "1",
    type: "email",
    title: "Follow-up email sent",
    description: "Sent pricing clarification email",
    timestamp: "2 hours ago",
    priority: "normal",
  },
  {
    id: "2",
    type: "note",
    title: "Meeting notes added",
    description: "Technical requirements discussion",
    timestamp: "1 day ago",
    priority: "high",
  },
  {
    id: "3",
    type: "task",
    title: "Proposal review pending",
    description: "Waiting for technical team review",
    timestamp: "2 days ago",
    priority: "high",
  },
  {
    id: "4",
    type: "email",
    title: "Quote sent",
    description: "Initial quote sent to client",
    timestamp: "3 days ago",
    priority: "normal",
  },
]

export function ActivityList({ entityType, entityId }: ActivityListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "email":
        return Mail
      case "note":
        return FileText
      case "task":
        return Calendar
      case "quote":
        return Receipt
      default:
        return FileText
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quickActions.map((action) => (
            <Button key={action.action} variant="outline" size="sm" className="w-full justify-start bg-transparent">
              <action.icon className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Recent Activities</CardTitle>
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const IconComponent = getActivityIcon(activity.type)
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                      {activity.priority !== "normal" && (
                        <Badge variant="secondary" className={getPriorityColor(activity.priority)}>
                          {activity.priority}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
