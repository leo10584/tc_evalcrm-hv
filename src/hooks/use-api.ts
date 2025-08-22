import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/api/client"
import type { components } from "@/api/types"

// RFP hooks
export function useCreateRFP() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: components["schemas"]["CreateRFPRequest"]) => apiClient.createRFP(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rfps"] })
    },
  })
}

// Opportunity hooks
export function useCreateOpportunity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: components["schemas"]["CreateOpportunityRequest"]) => apiClient.createOpportunity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opportunities"] })
    },
  })
}

export function useUpdateOpportunityStage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, stage }: { id: string; stage: string }) => apiClient.updateOpportunityStage(id, { stage }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opportunities"] })
    },
  })
}

// Quote hooks
export function useCreateQuote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: components["schemas"]["CreateQuoteRequest"]) => apiClient.createQuote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] })
    },
  })
}

export function useSendQuote() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      recipientEmail,
      message,
    }: {
      id: string
      recipientEmail: string
      message: string
    }) => apiClient.sendQuote(id, { recipientEmail, message }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] })
    },
  })
}

export function useSendQuoteForESign() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      signerEmail,
      signerName,
    }: {
      id: string
      signerEmail: string
      signerName: string
    }) => apiClient.sendQuoteForESign(id, { signerEmail, signerName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] })
    },
  })
}

// Email hooks
export function useEmailThread(entityType: "opportunity" | "quote", entityId: string) {
  return useQuery({
    queryKey: ["email-thread", entityType, entityId],
    queryFn: () => apiClient.getEmailThread(entityType, entityId),
    enabled: !!entityId,
  })
}

// Audit hooks
export function useAuditLog(params?: {
  entityType?: string
  entityId?: string
  limit?: number
  offset?: number
}) {
  return useQuery({
    queryKey: ["audit", params],
    queryFn: () => apiClient.getAuditLog(params),
  })
}
