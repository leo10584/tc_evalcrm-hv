import { type NextRequest, NextResponse } from "next/server"
import { apiClient } from "@/api/client"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate webhook payload
    if (!body.envelopeId || !body.status) {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 })
    }

    // Log the webhook for debugging
    console.log("[v0] E-Sign webhook received:", {
      envelopeId: body.envelopeId,
      status: body.status,
      timestamp: new Date().toISOString(),
    })

    // Process the webhook based on status
    switch (body.status) {
      case "sent":
        console.log("[v0] Document sent for signature")
        break
      case "delivered":
        console.log("[v0] Document delivered to signer")
        break
      case "signed":
        console.log("[v0] Document signed by signer")
        break
      case "completed":
        console.log("[v0] All signatures completed")
        // Update quote status in database
        // In real app, you would update the quote status here
        break
      case "declined":
        console.log("[v0] Document signing declined")
        break
      case "voided":
        console.log("[v0] Document voided")
        break
      default:
        console.log("[v0] Unknown status:", body.status)
    }

    // Forward to backend API if needed
    try {
      await apiClient.handleESignWebhook(body)
    } catch (error) {
      console.error("[v0] Failed to forward webhook to backend:", error)
      // Don't fail the webhook response if backend is down
    }

    // Always return success to the webhook provider
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Handle GET requests for webhook verification (if required by provider)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const challenge = searchParams.get("challenge")

  if (challenge) {
    return NextResponse.json({ challenge })
  }

  return NextResponse.json({ status: "Webhook endpoint active" })
}
