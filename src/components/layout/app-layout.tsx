"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { AuthGuard } from "@/components/auth/auth-guard"

interface AppLayoutProps {
  children: React.ReactNode
  resource?: string
}

export function AppLayout({ children, resource }: AppLayoutProps) {
  return (
    <AuthGuard resource={resource}>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col md:ml-64">
          <Header />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
