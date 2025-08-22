"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Reply, Forward, MoreHorizontal, Paperclip, Send, User, ChevronDown, ChevronUp } from "lucide-react"

interface EmailThreadProps {
  entityType: "opportunity" | "quote"
  entityId: string
}

// Mock email data
const mockEmails = [
  {
    id: "1",
    from: "john.doe@tatvacare.com",
    to: ["dr.rajesh@apollohospitals.com"],
    cc: [],
    subject: "Healthcare Management System - Initial Proposal",
    body: `Dear Dr. Rajesh,

Thank you for your interest in our healthcare management system. Based on our initial discussion, I've prepared a comprehensive proposal that addresses your requirements for:

1. Electronic Health Records (EHR) integration
2. Patient management system
3. Billing and insurance processing
4. Reporting and analytics dashboard

I would be happy to schedule a demo at your convenience to walk through the system capabilities.

Best regards,
John Doe
Senior Sales Executive
Tatvacare Solutions`,
    timestamp: "2024-01-11T14:20:00Z",
    attachments: [
      { name: "Healthcare_System_Proposal.pdf", url: "#" },
      { name: "Technical_Specifications.docx", url: "#" },
    ],
    isRead: true,
    direction: "outbound",
  },
  {
    id: "2",
    from: "dr.rajesh@apollohospitals.com",
    to: ["john.doe@tatvacare.com"],
    cc: ["procurement@apollohospitals.com"],
    subject: "Re: Healthcare Management System - Initial Proposal",
    body: `Hi John,

Thank you for the detailed proposal. The system looks comprehensive and aligns well with our requirements.

I have a few questions:
1. What is the implementation timeline?
2. Do you provide training for our staff?
3. What are the ongoing maintenance costs?

Also, could you please include integration capabilities with our existing laboratory systems?

We would like to schedule a demo for our technical team next week.

Best regards,
Dr. Rajesh Kumar
Chief Medical Officer
Apollo Hospitals`,
    timestamp: "2024-01-12T10:45:00Z",
    attachments: [],
    isRead: true,
    direction: "inbound",
  },
  {
    id: "3",
    from: "john.doe@tatvacare.com",
    to: ["dr.rajesh@apollohospitals.com"],
    cc: ["procurement@apollohospitals.com", "tech.support@tatvacare.com"],
    subject: "Re: Healthcare Management System - Demo Scheduled",
    body: `Dear Dr. Rajesh,

Thank you for your questions. Here are the answers:

1. Implementation timeline: 8-12 weeks depending on customization requirements
2. Yes, we provide comprehensive training including on-site sessions and online resources
3. Maintenance costs are 18% of license fee annually, including 24/7 support

Regarding laboratory integration, our system supports HL7 FHIR standards and can integrate with most major lab systems. I've included our integration specialist in this email.

Demo scheduled for January 18th at 2:00 PM. Meeting details attached.

Best regards,
John Doe`,
    timestamp: "2024-01-15T16:30:00Z",
    attachments: [
      { name: "Demo_Meeting_Details.pdf", url: "#" },
      { name: "Integration_Capabilities.pdf", url: "#" },
    ],
    isRead: true,
    direction: "outbound",
  },
]

export function EmailThread({ entityType, entityId }: EmailThreadProps) {
  const [isComposing, setIsComposing] = useState(false)
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [expandedEmails, setExpandedEmails] = useState<Set<string>>(new Set(["3"]))
  const [newEmail, setNewEmail] = useState({
    to: "",
    subject: "",
    body: "",
  })

  // In real app, use the API hook
  // const { data: emailThread } = useEmailThread(entityType, entityId)

  const toggleEmailExpansion = (emailId: string) => {
    const newExpanded = new Set(expandedEmails)
    if (newExpanded.has(emailId)) {
      newExpanded.delete(emailId)
    } else {
      newExpanded.add(emailId)
    }
    setExpandedEmails(newExpanded)
  }

  const handleReply = (email: any) => {
    setReplyTo(email.id)
    setNewEmail({
      to: email.from,
      subject: email.subject.startsWith("Re:") ? email.subject : `Re: ${email.subject}`,
      body: `\n\n--- Original Message ---\nFrom: ${email.from}\nDate: ${new Date(email.timestamp).toLocaleString("en-IN")}\nSubject: ${email.subject}\n\n${email.body}`,
    })
    setIsComposing(true)
  }

  const handleSendEmail = () => {
    // In real app, call API to send email
    console.log("Sending email:", newEmail)
    setIsComposing(false)
    setReplyTo(null)
    setNewEmail({ to: "", subject: "", body: "" })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-5 w-5" />
          <span>Email Thread</span>
        </CardTitle>
        <Button variant="outline" size="sm" onClick={() => setIsComposing(true)}>
          <Mail className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email Thread */}
        <div className="space-y-4">
          {mockEmails.map((email) => {
            const isExpanded = expandedEmails.has(email.id)

            return (
              <div key={email.id} className="border rounded-lg">
                {/* Email Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                  onClick={() => toggleEmailExpansion(email.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{email.from}</span>
                        <Badge
                          variant="outline"
                          className={
                            email.direction === "inbound" ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"
                          }
                        >
                          {email.direction}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{email.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(email.timestamp).toLocaleDateString("en-IN")}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Email Body (when expanded) */}
                {isExpanded && (
                  <div className="border-t p-4 space-y-4">
                    {/* Email Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex">
                        <span className="w-12 text-muted-foreground">To:</span>
                        <span>{email.to.join(", ")}</span>
                      </div>
                      {email.cc.length > 0 && (
                        <div className="flex">
                          <span className="w-12 text-muted-foreground">CC:</span>
                          <span>{email.cc.join(", ")}</span>
                        </div>
                      )}
                      <div className="flex">
                        <span className="w-12 text-muted-foreground">Date:</span>
                        <span>{new Date(email.timestamp).toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    {/* Email Body */}
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">{email.body}</pre>
                    </div>

                    {/* Attachments */}
                    {email.attachments.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Attachments</h4>
                        <div className="flex flex-wrap gap-2">
                          {email.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                              <Paperclip className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{attachment.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Email Actions */}
                    <div className="flex items-center space-x-2 pt-2 border-t">
                      <Button variant="outline" size="sm" onClick={() => handleReply(email)}>
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">
                        <Forward className="h-4 w-4 mr-2" />
                        Forward
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Compose Email */}
        {isComposing && (
          <div className="border rounded-lg p-4 space-y-4 bg-muted/20">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{replyTo ? "Reply" : "Compose Email"}</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsComposing(false)}>
                ×
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <Input
                  placeholder="To"
                  value={newEmail.to}
                  onChange={(e) => setNewEmail({ ...newEmail, to: e.target.value })}
                />
              </div>
              <div>
                <Input
                  placeholder="Subject"
                  value={newEmail.subject}
                  onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Compose your email..."
                  rows={8}
                  value={newEmail.body}
                  onChange={(e) => setNewEmail({ ...newEmail, body: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4 mr-2" />
                Attach
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setIsComposing(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSendEmail}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
