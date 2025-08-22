"use client"

import { useState } from "react"

export function useESignWebhookTest() {
  const [isLoading, setIsLoading] = useState(false)

  const simulateWebhook = async (envelopeId: string, status: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/esign/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          envelopeId,
          status,
          timestamp: new Date().toISOString(),
          signers: [
            {
              email: "dr.rajesh@apollohospitals.com",
              name: "Dr. Rajesh Kumar",
              status: status,
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to simulate webhook")
      }

      console.log("[v0] Webhook simulation successful")
      return { success: true }
    } catch (error) {
      console.error("[v0] Webhook simulation failed:", error)
      return { success: false, error }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    simulateWebhook,
    isLoading,
  }
}
