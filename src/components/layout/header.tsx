"use client"

import { useSession } from "next-auth/react"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search opportunities, quotes..." className="pl-10 w-full" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>

          {session?.user && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Welcome back, {session.user.name?.split(" ")[0]}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
