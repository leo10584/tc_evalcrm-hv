"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileText, Database } from "lucide-react"

interface AuditExportProps {
  entityType: string
  entityId: string
}

export function AuditExport({ entityType, entityId }: AuditExportProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format: "jsonl" | "csv" | "pdf") => {
    setIsExporting(true)

    try {
      // In real app, this would call the API
      const response = await fetch(`/api/audit/export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entityType,
          entityId,
          format,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        // Simulate file download
        const filename = `audit_${entityType}_${entityId}_${new Date().toISOString().split("T")[0]}.${format}`
        console.log(`[v0] Exporting audit trail as ${filename}`)

        // Create mock download
        const mockData = generateMockAuditExport(format)
        const blob = new Blob([mockData], {
          type: format === "jsonl" ? "application/jsonl" : format === "csv" ? "text/csv" : "application/pdf",
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("[v0] Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const generateMockAuditExport = (format: string) => {
    const mockEvent = {
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
      },
      intentId: "intent_001",
    }

    switch (format) {
      case "jsonl":
        return JSON.stringify(mockEvent) + "\n" + JSON.stringify({ ...mockEvent, id: "audit_002" })
      case "csv":
        return "id,entityType,entityId,action,userId,userEmail,timestamp,intentId\naudit_001,opportunity,OPP-2024-001,opportunity_created,user_001,john.doe@tatvacare.com,2024-01-10T10:30:00Z,intent_001"
      case "pdf":
        return "Mock PDF content for audit trail export"
      default:
        return JSON.stringify(mockEvent, null, 2)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export Audit"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("jsonl")}>
          <Database className="h-4 w-4 mr-2" />
          Export as JSONL
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("csv")}>
          <FileText className="h-4 w-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
