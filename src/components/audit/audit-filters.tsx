"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"

interface AuditFiltersProps {
  entityType: string
  entityId: string
}

export function AuditFilters({ entityType, entityId }: AuditFiltersProps) {
  const [selectedAction, setSelectedAction] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  const actionTypes = [
    "opportunity_created",
    "opportunity_updated",
    "stage_updated",
    "quote_created",
    "quote_sent",
    "email_sent",
    "esign_initiated",
    "esign_completed",
  ]

  const users = [
    "john.doe@tatvacare.com",
    "jane.smith@tatvacare.com",
    "mike.johnson@tatvacare.com",
    "system@tatvacare.com",
  ]

  const activeFilters = [
    selectedAction && { key: "action", value: selectedAction, label: `Action: ${selectedAction}` },
    selectedUser && { key: "user", value: selectedUser, label: `User: ${selectedUser}` },
    dateRange.from && { key: "date", value: "date", label: `Date: ${format(dateRange.from, "MMM dd")}` },
  ].filter(Boolean)

  const clearFilter = (key: string) => {
    switch (key) {
      case "action":
        setSelectedAction("")
        break
      case "user":
        setSelectedUser("")
        break
      case "date":
        setDateRange({})
        break
    }
  }

  const clearAllFilters = () => {
    setSelectedAction("")
    setSelectedUser("")
    setDateRange({})
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Filter Controls */}
          <div className="flex items-center space-x-4">
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                {actionTypes.map((action) => (
                  <SelectItem key={action} value={action}>
                    {action.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-48 justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? format(dateRange.from, "MMM dd, yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => setDateRange({ from: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeFilters.map((filter) => (
                <Badge key={filter.key} variant="secondary" className="flex items-center space-x-1">
                  <span>{filter.label}</span>
                  <button onClick={() => clearFilter(filter.key)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
