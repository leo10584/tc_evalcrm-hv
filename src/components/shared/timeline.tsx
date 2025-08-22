"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Receipt, Mail, Phone, Calendar, PenTool, User, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface TimelineProps {
  entityType: "opportunity" | "quote"
  entityId: string
}

// Mock timeline data
const mockTimelineEvents = [
  {
    id: "1",
    type: "opportunity_created",
    title: "Opportunity Created",
    description: "New opportunity created from RFP submission",
    timestamp: "2024-01-10T10:30:00Z",
    user: "John Doe",
    userAvatar: "/avatars/john.jpg",
    icon: FileText,
    status: "completed",
  },
  {
    id: "2",
    type: "email_sent",
    title: "Initial Contact Email",
    description: "Sent introduction email to Dr. Rajesh Kumar",
    timestamp: "2024-01-11T14:20:00Z",
    user: "John Doe",
    userAvatar: "/avatars/john.jpg",
    icon: Mail,
    status: "completed",
  },
  {
    id: "3",
    type: "meeting_scheduled",
    title: "Discovery Call Scheduled",
    description: "30-minute discovery call scheduled for Jan 15th",
    timestamp: "2024-01-12T09:15:00Z",
    user: "John Doe",
    userAvatar: "/avatars/john.jpg",
    icon: Calendar,
    status: "completed",
  },
  {
    id: "4",
    type: "call_completed",
    title: "Discovery Call Completed",
    description: "Discussed requirements and technical specifications",
    timestamp: "2024-01-15T11:00:00Z",
    user: "John Doe",
    userAvatar: "/avatars/john.jpg",
    icon: Phone,
    status: "completed",
  },
  {
    id: "5",
    type: "quote_created",
    title: "Quote Generated",
    description: "Quote QT-2024-001 created for ₹25,67,890",
    timestamp: "2024-01-18T16:45:00Z",
    user: "John Doe",
    userAvatar: "/avatars/john.jpg",
    icon: Receipt,
    status: "completed",
  },
  {
    id: "6",
    type: "quote_sent",
    title: "Quote Sent",
    description: "Quote sent to client via email",
    timestamp: "2024-01-19T10:30:00Z",
    user: "John Doe",
    userAvatar: "/avatars/john.jpg",
    icon: Mail,
    status: "completed",
  },
  {
    id: "7",
    type: "esign_sent",
    title: "Sent for E-Signature",
    description: "Contract sent to Dr. Rajesh Kumar for digital signature",
    timestamp: "2024-01-22T14:15:00Z",
    user: "John Doe",
    userAvatar: "/avatars/john.jpg",
    icon: PenTool,
    status: "pending",
  },
]

export function Timeline({ entityType, entityId }: TimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockTimelineEvents.map((event, index) => (
            <div key={event.id} className="flex items-start space-x-4">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                  <event.icon className="h-5 w-5 text-primary" />
                </div>
                {index < mockTimelineEvents.length - 1 && <div className="w-px h-12 bg-border mt-2" />}
              </div>

              {/* Event content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-foreground">{event.title}</h3>
                    <Badge variant="secondary" className={getStatusColor(event.status)}>
                      {getStatusIcon(event.status)}
                      <span className="ml-1">{event.status}</span>
                    </Badge>
                  </div>
                  <time className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleString("en-IN")}
                  </time>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{event.description}</p>

                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={event.userAvatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      <User className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{event.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
