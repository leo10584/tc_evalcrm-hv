"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, PenTool, Download, Eye } from "lucide-react"
import { useSendQuote, useSendQuoteForESign } from "@/hooks/use-api"

interface QuoteActionsProps {
  quoteId: string
}

export function QuoteActions({ quoteId }: QuoteActionsProps) {
  const [emailRecipient, setEmailRecipient] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [signerEmail, setSignerEmail] = useState("")
  const [signerName, setSignerName] = useState("")

  const sendQuoteMutation = useSendQuote()
  const sendESignMutation = useSendQuoteForESign()

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailMessage) return

    try {
      await sendQuoteMutation.mutateAsync({
        id: quoteId,
        recipientEmail: emailRecipient,
        message: emailMessage,
      })
      setEmailRecipient("")
      setEmailMessage("")
    } catch (error) {
      console.error("Failed to send quote:", error)
    }
  }

  const handleSendForESign = async () => {
    if (!signerEmail || !signerName) return

    try {
      await sendESignMutation.mutateAsync({
        id: quoteId,
        signerEmail,
        signerName,
      })
      setSignerEmail("")
      setSignerName("")
    } catch (error) {
      console.error("Failed to send for e-signature:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full bg-transparent" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Quote
          </Button>
          <Button className="w-full bg-transparent" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </CardContent>
      </Card>

      {/* Send via Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Send from My Mailbox</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailRecipient">Recipient Email</Label>
            <Input
              id="emailRecipient"
              type="email"
              value={emailRecipient}
              onChange={(e) => setEmailRecipient(e.target.value)}
              placeholder="client@apollohospitals.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailMessage">Message</Label>
            <Textarea
              id="emailMessage"
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              placeholder="Please find attached our quote for your healthcare management system requirements..."
              rows={4}
            />
          </div>

          <Button
            onClick={handleSendEmail}
            disabled={!emailRecipient || !emailMessage || sendQuoteMutation.isPending}
            className="w-full"
          >
            {sendQuoteMutation.isPending ? "Sending..." : "Send Quote"}
          </Button>
        </CardContent>
      </Card>

      {/* Send for E-Signature */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PenTool className="h-5 w-5" />
            <span>Send for E-Signature</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signerName">Signer Name</Label>
            <Input
              id="signerName"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              placeholder="Dr. Rajesh Kumar"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signerEmail">Signer Email</Label>
            <Input
              id="signerEmail"
              type="email"
              value={signerEmail}
              onChange={(e) => setSignerEmail(e.target.value)}
              placeholder="dr.rajesh@apollohospitals.com"
            />
          </div>

          <Button
            onClick={handleSendForESign}
            disabled={!signerEmail || !signerName || sendESignMutation.isPending}
            className="w-full"
          >
            {sendESignMutation.isPending ? "Sending..." : "Send for E-Signature"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
