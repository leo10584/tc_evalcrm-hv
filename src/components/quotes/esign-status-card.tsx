"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, PenTool, RefreshCw } from "lucide-react"
import { useESignWebhookTest } from "@/hooks/use-esign-webhook"

interface ESignStatusCardProps {
  quoteId: string
}

// Mock data - in real app, this would come from API
const mockESignStatus = {
  envelopeId: "ENV-2024-001",
  status: "sent",
  signingUrl: "https://docusign.com/signing/...",
  sentAt: "2024-01-15T14:30:00Z",
  signers: [
    {
      name: "Dr. Rajesh Kumar",
      email: "dr.rajesh@apollohospitals.com",
      status: "sent",
      signedAt: null,
    },
  ],
  progress: 25,
}

export function ESignStatusCard({ quoteId }: ESignStatusCardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(mockESignStatus.status)
  const { simulateWebhook, isLoading } = useESignWebhookTest()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "signed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "sent":
      case "delivered":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "declined":
      case "voided":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <PenTool className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "signed":
        return "bg-green-100 text-green-800"
      case "sent":
      case "delivered":
        return "bg-blue-100 text-blue-800"
      case "declined":
      case "voided":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleTestWebhook = async () => {
    const result = await simulateWebhook(mockESignStatus.envelopeId, "completed")
    if (result.success) {
      setCurrentStatus("completed")
      console.log("[v0] E-signature status updated to completed")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center space-x-2">
          <PenTool className="h-5 w-5" />
          <span>E-Signature Status</span>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockESignStatus.envelopeId ? (
          <>
            {/* Overall Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(currentStatus)}
                <span className="font-medium">Overall Status</span>
              </div>
              <Badge variant="secondary" className={getStatusColor(currentStatus)}>
                {currentStatus}
              </Badge>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completion Progress</span>
                <span>{currentStatus === "completed" ? 100 : mockESignStatus.progress}%</span>
              </div>
              <Progress value={currentStatus === "completed" ? 100 : mockESignStatus.progress} className="h-2" />
            </div>

            {/* Envelope Details */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envelope ID:</span>
                <span className="font-mono">{mockESignStatus.envelopeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sent:</span>
                <span>{new Date(mockESignStatus.sentAt).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Signers */}
            <div className="space-y-3">
              <h4 className="font-medium">Signers</h4>
              {mockESignStatus.signers.map((signer, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{signer.name}</div>
                    <div className="text-xs text-muted-foreground">{signer.email}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(currentStatus === "completed" ? "signed" : signer.status)}
                    <Badge
                      variant="outline"
                      className={getStatusColor(currentStatus === "completed" ? "signed" : signer.status)}
                    >
                      {currentStatus === "completed" ? "signed" : signer.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Test Actions (for development) */}
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handleTestWebhook}
                disabled={isLoading || currentStatus === "completed"}
                className="w-full bg-transparent"
              >
                {isLoading ? "Processing..." : "Test: Simulate Signed Status"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <PenTool className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No e-signature request sent yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
