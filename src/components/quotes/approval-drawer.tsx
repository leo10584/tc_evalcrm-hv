"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Clock, AlertCircle, User } from "lucide-react"

interface ApprovalDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  quoteAmount: number
}

const approvers = [
  { id: "1", name: "Sarah Wilson", role: "Sales Manager", email: "sarah@tatvacare.com", avatar: "/avatars/sarah.jpg" },
  { id: "2", name: "Mike Johnson", role: "Pricing Director", email: "mike@tatvacare.com", avatar: "/avatars/mike.jpg" },
  { id: "3", name: "David Brown", role: "VP Sales", email: "david@tatvacare.com", avatar: "/avatars/david.jpg" },
]

const approvalHistory = [
  {
    id: "1",
    approver: "Sarah Wilson",
    status: "approved",
    comment: "Pricing looks good for this opportunity",
    timestamp: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    approver: "Mike Johnson",
    status: "pending",
    comment: "",
    timestamp: "2024-01-15T11:00:00Z",
  },
]

export function ApprovalDrawer({ open, onOpenChange, quoteAmount }: ApprovalDrawerProps) {
  const [selectedApprover, setSelectedApprover] = useState("")
  const [approvalComment, setApprovalComment] = useState("")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>Quote Approval</SheetTitle>
          <SheetDescription>
            This quote requires approval due to its value of {formatCurrency(quoteAmount)}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Approval Request */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Request Approval</h3>

            <div className="space-y-2">
              <Label htmlFor="approver">Select Approver</Label>
              <Select value={selectedApprover} onValueChange={setSelectedApprover}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an approver" />
                </SelectTrigger>
                <SelectContent>
                  {approvers.map((approver) => (
                    <SelectItem key={approver.id} value={approver.id}>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={approver.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{approver.name}</div>
                          <div className="text-sm text-muted-foreground">{approver.role}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Comment (Optional)</Label>
              <Textarea
                id="comment"
                value={approvalComment}
                onChange={(e) => setApprovalComment(e.target.value)}
                placeholder="Add a comment for the approver..."
                rows={3}
              />
            </div>

            <Button className="w-full" disabled={!selectedApprover}>
              Send for Approval
            </Button>
          </div>

          {/* Approval History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Approval History</h3>

            <div className="space-y-3">
              {approvalHistory.map((approval) => (
                <div key={approval.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{approval.approver}</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(approval.status)}
                        <Badge variant="secondary" className={getStatusColor(approval.status)}>
                          {approval.status}
                        </Badge>
                      </div>
                    </div>

                    {approval.comment && <p className="text-sm text-muted-foreground">{approval.comment}</p>}

                    <p className="text-xs text-muted-foreground">
                      {new Date(approval.timestamp).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Rules */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Approval Rules</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Quotes up to ₹5,00,000:</span>
                <span>Sales Manager approval required</span>
              </div>
              <div className="flex justify-between">
                <span>Quotes up to ₹25,00,000:</span>
                <span>Pricing Director approval required</span>
              </div>
              <div className="flex justify-between">
                <span>Quotes above ₹25,00,000:</span>
                <span>VP Sales approval required</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
