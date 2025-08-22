import type { paths } from "./types"

type ApiResponse<T> = {
  data: T
  error?: string
}

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.tatvacare.com"
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      return {
        data: null as T,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // RFP endpoints
  async createRFP(data: paths["/rfps"]["post"]["requestBody"]["content"]["application/json"]) {
    return this.request<paths["/rfps"]["post"]["responses"]["201"]["content"]["application/json"]>("/rfps", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Opportunity endpoints
  async createOpportunity(data: paths["/opportunities"]["post"]["requestBody"]["content"]["application/json"]) {
    return this.request<paths["/opportunities"]["post"]["responses"]["201"]["content"]["application/json"]>(
      "/opportunities",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    )
  }

  async updateOpportunityStage(
    id: string,
    data: paths["/opportunities/{id}/stage"]["patch"]["requestBody"]["content"]["application/json"],
  ) {
    return this.request<paths["/opportunities/{id}/stage"]["patch"]["responses"]["200"]["content"]["application/json"]>(
      `/opportunities/${id}/stage`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    )
  }

  // Quote endpoints
  async createQuote(data: paths["/quotes"]["post"]["requestBody"]["content"]["application/json"]) {
    return this.request<paths["/quotes"]["post"]["responses"]["201"]["content"]["application/json"]>("/quotes", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async sendQuote(id: string, data: paths["/quotes/{id}/send"]["post"]["requestBody"]["content"]["application/json"]) {
    return this.request<void>(`/quotes/${id}/send`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async sendQuoteForESign(
    id: string,
    data: paths["/quotes/{id}/esign"]["post"]["requestBody"]["content"]["application/json"],
  ) {
    return this.request<paths["/quotes/{id}/esign"]["post"]["responses"]["200"]["content"]["application/json"]>(
      `/quotes/${id}/esign`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    )
  }

  // Email endpoints
  async getEmailThread(entityType: "opportunity" | "quote", entityId: string) {
    return this.request<
      paths["/email/threads/{entityType}/{entityId}"]["get"]["responses"]["200"]["content"]["application/json"]
    >(`/email/threads/${entityType}/${entityId}`)
  }

  // Audit endpoints
  async getAuditLog(params?: {
    entityType?: string
    entityId?: string
    limit?: number
    offset?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params?.entityType) searchParams.set("entityType", params.entityType)
    if (params?.entityId) searchParams.set("entityId", params.entityId)
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.offset) searchParams.set("offset", params.offset.toString())

    const query = searchParams.toString()
    return this.request<paths["/audit"]["get"]["responses"]["200"]["content"]["application/json"]>(
      `/audit${query ? `?${query}` : ""}`,
    )
  }

  // Webhook endpoint
  async handleESignWebhook(data: paths["/esign/webhook"]["post"]["requestBody"]["content"]["application/json"]) {
    return this.request<void>("/esign/webhook", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()
