"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

export function PipelineFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("")
  const [selectedOwner, setSelectedOwner] = useState("")
  const [selectedVertical, setSelectedVertical] = useState("")

  const activeFilters = [
    selectedTeam && { key: "team", value: selectedTeam, label: `Team: ${selectedTeam}` },
    selectedOwner && { key: "owner", value: selectedOwner, label: `Owner: ${selectedOwner}` },
    selectedVertical && { key: "vertical", value: selectedVertical, label: `Vertical: ${selectedVertical}` },
  ].filter(Boolean)

  const clearFilter = (key: string) => {
    switch (key) {
      case "team":
        setSelectedTeam("")
        break
      case "owner":
        setSelectedOwner("")
        break
      case "vertical":
        setSelectedVertical("")
        break
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedTeam("")
    setSelectedOwner("")
    setSelectedVertical("")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>

        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="enterprise">Enterprise</SelectItem>
            <SelectItem value="mid-market">Mid-Market</SelectItem>
            <SelectItem value="smb">SMB</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedOwner} onValueChange={setSelectedOwner}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Owner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="john-doe">John Doe</SelectItem>
            <SelectItem value="jane-smith">Jane Smith</SelectItem>
            <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedVertical} onValueChange={setSelectedVertical}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Vertical" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hospitals">Hospitals</SelectItem>
            <SelectItem value="clinics">Clinics</SelectItem>
            <SelectItem value="pharma">Pharma</SelectItem>
            <SelectItem value="diagnostics">Diagnostics</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Filters:</span>
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
  )
}
