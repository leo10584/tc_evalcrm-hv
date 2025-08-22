"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, User, Calendar, FileText, Receipt, Mail, PenTool, Settings, Shield } from "lucide-react"

interface AuditTrailProps {
  entityType: string
  entityId: string
}

// Mock audit data - in real app, this would come from API
const mockAuditEvents = [
  {
    id: "audit_001",
    entityType: "opportunity",
    entityId: "OPP-2024-001",
    action: "opportunity_created",
    userId: "user_001",
    userEmail: "john.doe@tatvacare.com",
    timestamp: "2024-01-10T10:30:00Z",
    details: {
      name: "Apollo Hospitals - EHR System",
      value: 2567890,
      stage: "lead",
      source: "rfp_submission",
    },
    intentId: "intent_001",
  },
  {
    id: "audit_002",
    entityType: "opportunity",
    entityId: "OPP-2024-001",
    action: "stage_updated",
    userId: "user_001",
    userEmail: "john.doe@tatvacare.com",
    timestamp: "2024-01-12T14:20:00Z",
    details: {
      previousStage: "lead",
      newStage: "qualified",
      reason: "Discovery call completed successfully",
    },
    intentId: "intent_002",
  },
  {
    id: "audit_003",
    entityType: "opportunity",
    entityId: "OPP-2024-001",
    action: "email_sent",
    userId: "user_001",
    userEmail: "john.doe@tatvacare.com",
    timestamp: "2024-01-15T16:45:00Z",
    details: {
      to: "dr.rajesh@apollohospitals.com",
      subject: "Healthcare Management System - Demo Scheduled",
      messageId: "msg_001",
    },
    intentId: "intent_003",
  },
  {
    id: "audit_004",
    entityType: "quote",
    entityId: "QT-2024-001",
    action: "quote_created",
    userId: "user_001",
    userEmail: "john.doe@tatvacare.com",
    timestamp: "2024-01-18T11:30:00Z",
    details: {
      opportunityId: "OPP-2024-001",
      totalAmount: 2832000,
      currency: "INR",
      lineItemsCount: 3,
    },
    intentId: "intent_004",
  },
  {
    id: "audit_005",
    entityType: "quote",
    entityId: "QT-2024-001",
    action: "quote_sent",
    userId: "user_001",
    userEmail: "john.doe@tatvacare.com",
    timestamp: "2024-01-19T09:15:00Z",
    details: {
      recipientEmail: "dr.rajesh@apollohospitals.com",
      method: "email",
      pdfGenerated: true,
    },
    intentId: "intent_005",
  },
  {
    id: "audit_006",
    entityType: "quote",
    entityId: "QT-2024-001",
    action: "esign_initiated",
    userId: "user_001",
    userEmail: "john.doe@tatvacare.com",
    timestamp: "2024-01-22T14:30:00Z",
    details: {
      envelopeId: "ENV-2024-001",
      signerEmail: "dr.rajesh@apollohospitals.com",
      signerName: "Dr. Rajesh Kumar",
      provider: "DocuSign",
    },
    intentId: "intent_006",
  },
  {
    id: "audit_007",
    entityType: "quote",
    entityId: "QT-2024-001",
    action: "esign_completed",
    userId: "system",
    userEmail: "system@tatvacare.com",
    timestamp: "2024-01-25T16:20:00Z",
    details: {
      envelopeId: "ENV-2024-001",
      signedBy: "Dr. Rajesh Kumar",
      signedAt: "2024-01-25T16:18:00Z",
      ipAddress: "203.192.xxx.xxx",
    },
    intentId: "intent_007",
  },
]

export function AuditTrail({ entityType, entityId }: AuditTrailProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredEvents, setFilteredEvents] = useState(mockAuditEvents)

  // In real app, use the API hook
  // const { data: auditData } = useAuditLog({ entityType, entityId })

  const getActionIcon = (action: string) => {
    switch (action) {
      case "opportunity_created":
      case "opportunity_updated":
        return FileText
      case "quote_created":
      case "quote_sent":
      case "quote_updated":
        return Receipt
      case "email_sent":
      case "email_received":
        return Mail
      case "esign_initiated":
      case "esign_completed":
      case "esign_declined":
        return PenTool
      case "stage_updated":
      case "status_changed":
        return Settings
      case "permission_changed":
      case "access_granted":
        return Shield
      default:
        return Calendar
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "opportunity_created":
      case "quote_created":
        return "bg-green-100 text-green-800"
      case "email_sent":
      case "quote_sent":
        return "bg-blue-100 text-blue-800"
      case "esign_completed":
        return "bg-purple-100 text-purple-800"
      case "esign_declined":
        return "bg-red-100 text-red-800"
      case "stage_updated":
      case "status_changed":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatActionName = (action: string) => {
    return action
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (!term) {
      setFilteredEvents(mockAuditEvents)
    } else {
      const filtered = mockAuditEvents.filter(
        (event) =>
          event.action.toLowerCase().includes(term.toLowerCase()) ||
          event.userEmail.toLowerCase().includes(term.toLowerCase()) ||
          JSON.stringify(event.details).toLowerCase().includes(term.toLowerCase()),
      )
      setFilteredEvents(filtered)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Audit Events</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredEvents.map((event, index) => {
            const IconComponent = getActionIcon(event.action)

            return (
              <div key={event.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50">
                {/* Timeline indicator */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  {index < filteredEvents.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                </div>

                {/* Event content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className={getActionColor(event.action)}>
                        {formatActionName(event.action)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">ID: {event.intentId}</span>
                    </div>
                    <time className="text-sm text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString("en-IN")}
                    </time>
                  </div>

                  {/* Event details */}
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Entity:</span> {event.entityType}/{event.entityId}
                    </div>

                    {/* Action-specific details */}
                    <div className="bg-muted/50 rounded-md p-3">
                      <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">
                        {JSON.stringify(event.details, null, 2)}
                      </pre>
                    </div>

                    {/* User info */}
                    <div className="flex items-center space-x-2 pt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {event.userEmail} ({event.userId})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {filteredEvents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No audit events found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
